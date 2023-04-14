import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    TupleBuilder,
    DictionaryValue
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type TryPayout = {
    $$type: 'TryPayout';
    address: Address;
    value: bigint;
}

export function storeTryPayout(src: TryPayout) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1620127519, 32);
        b_0.storeAddress(src.address);
        b_0.storeCoins(src.value);
    };
}

export function loadTryPayout(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1620127519) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    let _value = sc_0.loadCoins();
    return { $$type: 'TryPayout' as const, address: _address, value: _value };
}

function loadTupleTryPayout(source: TupleReader) {
    let _address = source.readAddress();
    let _value = source.readBigNumber();
    return { $$type: 'TryPayout' as const, address: _address, value: _value };
}

function storeTupleTryPayout(source: TryPayout) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeNumber(source.value);
    return builder.build();
}

function dictValueParserTryPayout(): DictionaryValue<TryPayout> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTryPayout(src)).endCell());
        },
        parse: (src) => {
            return loadTryPayout(src.loadRef().beginParse());
        }
    }
}

export type PayoutOk = {
    $$type: 'PayoutOk';
    address: Address;
    value: bigint;
}

export function storePayoutOk(src: PayoutOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3641354770, 32);
        b_0.storeAddress(src.address);
        b_0.storeCoins(src.value);
    };
}

export function loadPayoutOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3641354770) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    let _value = sc_0.loadCoins();
    return { $$type: 'PayoutOk' as const, address: _address, value: _value };
}

function loadTuplePayoutOk(source: TupleReader) {
    let _address = source.readAddress();
    let _value = source.readBigNumber();
    return { $$type: 'PayoutOk' as const, address: _address, value: _value };
}

function storeTuplePayoutOk(source: PayoutOk) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeNumber(source.value);
    return builder.build();
}

function dictValueParserPayoutOk(): DictionaryValue<PayoutOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePayoutOk(src)).endCell());
        },
        parse: (src) => {
            return loadPayoutOk(src.loadRef().beginParse());
        }
    }
}

export type PayoutFailed = {
    $$type: 'PayoutFailed';
    address: Address;
    value: bigint;
}

export function storePayoutFailed(src: PayoutFailed) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(633161870, 32);
        b_0.storeAddress(src.address);
        b_0.storeCoins(src.value);
    };
}

export function loadPayoutFailed(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 633161870) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    let _value = sc_0.loadCoins();
    return { $$type: 'PayoutFailed' as const, address: _address, value: _value };
}

function loadTuplePayoutFailed(source: TupleReader) {
    let _address = source.readAddress();
    let _value = source.readBigNumber();
    return { $$type: 'PayoutFailed' as const, address: _address, value: _value };
}

function storeTuplePayoutFailed(source: PayoutFailed) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeNumber(source.value);
    return builder.build();
}

function dictValueParserPayoutFailed(): DictionaryValue<PayoutFailed> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePayoutFailed(src)).endCell());
        },
        parse: (src) => {
            return loadPayoutFailed(src.loadRef().beginParse());
        }
    }
}

export type BurnParameters = {
    $$type: 'BurnParameters';
    startAt: bigint;
    endAt: bigint;
}

export function storeBurnParameters(src: BurnParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.startAt, 32);
        b_0.storeUint(src.endAt, 32);
    };
}

export function loadBurnParameters(slice: Slice) {
    let sc_0 = slice;
    let _startAt = sc_0.loadUintBig(32);
    let _endAt = sc_0.loadUintBig(32);
    return { $$type: 'BurnParameters' as const, startAt: _startAt, endAt: _endAt };
}

function loadTupleBurnParameters(source: TupleReader) {
    let _startAt = source.readBigNumber();
    let _endAt = source.readBigNumber();
    return { $$type: 'BurnParameters' as const, startAt: _startAt, endAt: _endAt };
}

function storeTupleBurnParameters(source: BurnParameters) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.startAt);
    builder.writeNumber(source.endAt);
    return builder.build();
}

function dictValueParserBurnParameters(): DictionaryValue<BurnParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeBurnParameters(src)).endCell());
        },
        parse: (src) => {
            return loadBurnParameters(src.loadRef().beginParse());
        }
    }
}

export type EventPayoutCompleted = {
    $$type: 'EventPayoutCompleted';
    address: Address;
    value: bigint;
}

export function storeEventPayoutCompleted(src: EventPayoutCompleted) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(989312214, 32);
        b_0.storeAddress(src.address);
        b_0.storeCoins(src.value);
    };
}

export function loadEventPayoutCompleted(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 989312214) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    let _value = sc_0.loadCoins();
    return { $$type: 'EventPayoutCompleted' as const, address: _address, value: _value };
}

function loadTupleEventPayoutCompleted(source: TupleReader) {
    let _address = source.readAddress();
    let _value = source.readBigNumber();
    return { $$type: 'EventPayoutCompleted' as const, address: _address, value: _value };
}

function storeTupleEventPayoutCompleted(source: EventPayoutCompleted) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeNumber(source.value);
    return builder.build();
}

function dictValueParserEventPayoutCompleted(): DictionaryValue<EventPayoutCompleted> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeEventPayoutCompleted(src)).endCell());
        },
        parse: (src) => {
            return loadEventPayoutCompleted(src.loadRef().beginParse());
        }
    }
}

 type PayoutsMaster_init_args = {
    $$type: 'PayoutsMaster_init_args';
    owner: Address;
    publicKey: bigint;
    burn: BurnParameters | null;
}

function initPayoutsMaster_init_args(src: PayoutsMaster_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeInt(src.publicKey, 257);
        if (src.burn !== null && src.burn !== undefined) { b_0.storeBit(true); b_0.store(storeBurnParameters(src.burn)); } else { b_0.storeBit(false); }
    };
}

async function PayoutsMaster_init(owner: Address, publicKey: bigint, burn: BurnParameters | null) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initPayoutsMaster_init_args({ $$type: 'PayoutsMaster_init_args', owner, publicKey, burn })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const PayoutsMaster_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    4429: { message: `Invalid sender` },
    12724: { message: `Invalid burn parameters` },
    16059: { message: `Invalid value` },
    19204: { message: `Insufficient balance on master` },
    40368: { message: `Contract stopped` },
    48401: { message: `Invalid signature` },
    53296: { message: `Contract not stopped` },
}

export class PayoutsMaster implements Contract {
    
    static async init(owner: Address, publicKey: bigint, burn: BurnParameters | null) {
        return await PayoutsMaster_init(owner, publicKey, burn);
    }
    
    static async fromInit(owner: Address, publicKey: bigint, burn: BurnParameters | null) {
        const init = await PayoutsMaster_init(owner, publicKey, burn);
        const address = contractAddress(0, init);
        return new PayoutsMaster(address, init);
    }
    
    static fromAddress(address: Address) {
        return new PayoutsMaster(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: PayoutsMaster_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: string | PayoutOk | PayoutFailed | 'Deposit' | 'Withdraw' | 'Destroy' | Deploy | 'Resume' | 'Stop') {
        
        let body: Cell | null = null;
        if (typeof message === 'string') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'PayoutOk') {
            body = beginCell().store(storePayoutOk(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'PayoutFailed') {
            body = beginCell().store(storePayoutFailed(message)).endCell();
        }
        if (message === 'Deposit') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Withdraw') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Destroy') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message === 'Resume') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Stop') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getStopped(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('stopped', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
}