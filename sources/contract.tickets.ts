import base64url from "base64url";
import { randomBytes } from "crypto";
import { Address, beginCell } from "ton-core";
import { keyPairFromSeed, sign } from "ton-crypto";

export function createTicket(address: Address, amount: bigint, secretKey: Buffer) {
    let msgHash = beginCell().storeAddress(address).storeCoins(amount).endCell().hash();
    let signature = sign(msgHash, secretKey);
    let builder = beginCell().storeBuffer(signature).storeCoins(amount);
    while ((1023 - builder.availableBits) % 8 !== 0) {
        builder.storeBit(0);
    }
    let c = builder.endCell();
    let signatureWithPadding = c.beginParse().loadBuffer(c.bits.length / 8);
    return base64url(signatureWithPadding);
}

export function generateList(addresses: { address: string, amount: bigint }[]) {
    let keypair = keyPairFromSeed(randomBytes(32));
    let list = addresses.map(({ address, amount }) => {
        return {
            address,
            amount,
            ticket: createTicket(Address.parse(address), amount, keypair.secretKey)
        };
    });

    return {
        publicKey: keypair.publicKey,
        list
    };
}