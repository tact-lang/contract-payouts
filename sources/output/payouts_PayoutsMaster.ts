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
    ABIType,
    ABIGetter,
    ABIReceiver,
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
    57826: { message: `Check withdraw min value` },
}

const PayoutsMaster_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TryPayout","header":1620127519,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PayoutOk","header":3641354770,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PayoutFailed","header":633161870,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"BurnParameters","header":null,"fields":[{"name":"startAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"endAt","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"EventPayoutCompleted","header":989312214,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
]

const PayoutsMaster_getters: ABIGetter[] = [
    {"name":"publicKey","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"burn","arguments":[],"returnType":{"kind":"simple","type":"BurnParameters","optional":true}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"stopped","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
]

const PayoutsMaster_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"text"}},
    {"receiver":"internal","message":{"kind":"typed","type":"PayoutOk"}},
    {"receiver":"internal","message":{"kind":"typed","type":"PayoutFailed"}},
    {"receiver":"internal","message":{"kind":"text","text":"Deposit"}},
    {"receiver":"internal","message":{"kind":"text","text":"Withdraw"}},
    {"receiver":"internal","message":{"kind":"text","text":"Destroy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"text","text":"Resume"}},
    {"receiver":"internal","message":{"kind":"text","text":"Stop"}},
]

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
        types:  PayoutsMaster_types,
        getters: PayoutsMaster_getters,
        receivers: PayoutsMaster_receivers,
        errors: PayoutsMaster_errors,
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
    
    async getPublicKey(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('publicKey', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getBurn(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('burn', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleBurnParameters(result_p) : null;
        return result;
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