import "@stdlib/deploy";
import "@stdlib/ownable";
import "@stdlib/stoppable";

message TryPayout {
    address: Address;
    value: Int as coins;
}

message PayoutOk {
    address: Address;
    value: Int as coins;
}

message PayoutFailed {
    address: Address;
    value: Int as coins;
}

struct BurnParameters {
    startAt: Int as uint32;
    endAt: Int as uint32;
}

message EventPayoutCompleted {
    address: Address;
    value: Int as coins;
}

contract PayoutBeacon with Ownable, Deployable {
    override const storageReserve: Int = ton("0.1");

    owner: Address;
    master: Address;
    completed: Bool;

    init(owner: Address, master: Address) {
        self.owner = owner;
        self.master = master;
        self.completed = false;
    }

    receive(msg: TryPayout) {

        // Check context
        let ctx: Context = context();
        require(ctx.sender == self.master, "Invalid sender");

        // Send response
        if (!self.completed) {
            self.completed = true;
            self.forward(ctx.sender, PayoutOk{ value: msg.value, address: self.owner }.toCell(), true, null);
        } else {
            self.forward(ctx.sender, PayoutFailed{ value: msg.value, address: self.owner }.toCell(), false, null);
        }
    }

    bounced(msg: bounced<PayoutOk>) {

        // Reset completed flag is our message bounced
        self.completed = false;

        // Send notification
        self.forward(self.owner, "Payout failed".asComment(), false, null);
    }

    get fun master(): Address {
        return self.master;
    }

    get fun completed(): Bool {
        return self.completed;
    }
}

contract PayoutsMaster with Deployable, Ownable, Resumable {
    override const storageReserve: Int = ton("0.1");

    owner: Address;
    publicKey: Int as uint256;
    stopped: Bool;
    burn: BurnParameters?;

    init(owner: Address, publicKey: Int, burn: BurnParameters?) {
        self.owner = owner;
        self.publicKey = publicKey;
        self.stopped = false;
        self.burn = burn;
        if (burn != null) {
            let b: BurnParameters = burn!!;
            require(b.startAt < b.endAt, "Invalid burn parameters");
        }
    }

    //
    // Payout operations
    //

    receive(withdraw: String) {

        // Normalize
        withdraw = normalizeKey(withdraw);

        // Check that the contract is not stopped
        self.requireNotStopped();

        // Get the current context
        let ctx: Context = context();
        require(ctx.value >= ton("1.0"), "Invalid value");

        // Parse the withdraw message
        let msg: Slice = withdraw.fromBase64();
        let signature: Slice = msg.loadBits(512);
        let value: Int = msg.loadCoins();

        // Verify the signature
        let sigCell: Cell = beginCell()
            .storeAddress(ctx.sender)
            .storeCoins(value)
            .endCell();
        let hash: Int = sigCell.hash();
        require(checkSignature(hash, signature, self.publicKey), "Invalid signature");

        // Adjust value if burn is set
        if (self.burn != null) {
            let burn: BurnParameters = self.burn!!;
            let now: Int = now();
            if (burn.endAt <= now) {
                self.reply("Payout already ended".asComment());
                return;
            }
            if (now >= burn.startAt) {
                value = (value * (burn.endAt - now)) / (burn.endAt - burn.startAt);
            }
        }

        // Check min value
        require(value >= ton("1.0"), "Check withdraw min value");

        // Check balance before sending forward to save some gas on depletion
        require(myBalance() > ton("1.0") + self.storageReserve + value, "Insufficient balance on master");

        // Send message to bacon
        let init: StateInit = initOf PayoutBeacon(ctx.sender, myAddress());
        let address: Address = contractAddress(init);
        self.forward(address, TryPayout{ address: ctx.sender, value: value }.toCell(), true, init);
    }

    receive(ok: PayoutOk) {
        // Check that the contract is not stopped
        self.requireNotStopped();

        // Get the current context
        let ctx: Context = context();
        let init: StateInit = initOf PayoutBeacon(ok.address, myAddress());
        let beaconAddress: Address = contractAddress(init);
        require(ctx.sender == beaconAddress, "Invalid sender");

        // Require required balance
        require(myBalance() > ton("1.0") + self.storageReserve + ok.value, "Insufficient balance on master");

        // Emit event
        emit(EventPayoutCompleted{ address: ok.address, value: ok.value }.toCell());

        // Send the payout
        send(SendParameters{
            value: ok.value, 
            mode: SendRemainingValue,
            to: ok.address, 
            body: "Payout сompleted".asComment()
        });
    }

    receive(failed: PayoutFailed) {
        send(SendParameters{
            value: 0, 
            mode: SendRemainingValue,
            to: failed.address, 
            body: "Already paid".asComment()
        });
    }

    //
    // Admin operations
    //

    receive("Deposit") {
        // NOTE: This method is allowed for anyone
        let ctx: Context = context();
        require(ctx.value >= ton("1.0"), "Invalid value");
        send(SendParameters{
            value: ton("0.1"), 
            mode: SendIgnoreErrors,
            to: ctx.sender, 
            bounce: false,
            body: "Deposit received".asComment()
        });
    }

    receive("Withdraw") {
        self.requireOwner();
        nativeReserve(self.storageReserve, 0);
        send(SendParameters{
            value: 0, 
            mode: SendRemainingBalance,
            to: self.owner, 
            bounce: false,
            body: "Withdraw completed".asComment()
        });
    }

    receive("Destroy") {
        self.requireOwner();
        send(SendParameters{
            value: 0, 
            mode: SendRemainingBalance + SendDestroyIfZero,
            to: self.owner, 
            bounce: false,
            body: "Contract destroyed".asComment()
        });
    }

    // Getters

    get fun publicKey(): Int {
        return self.publicKey;
    }

    get fun burn(): BurnParameters? {
        return self.burn;
    } 
}

fun normalizeKey(src: String): String {
    let out: Builder = beginCell();
    let slice: Slice = src.asSlice();
    while(slice.bits() > 0 || slice.refs() > 0) {
        require(slice.bits() % 8 == 0 && slice.refs() <= 1, "Invalid string");
        if (slice.bits() > 0) {
            let ch: Int = slice.loadUint(8);
            if (ch >= 33 && ch <= 126) {
                out = out.storeUint(ch, 8);
            }
        } else {
            slice = slice.loadRef().beginParse();
        }
    }
    return out.asSlice().asString();
}