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
        b_0.storeUint(2291174705, 32);
        b_0.storeAddress(src.address);
        b_0.storeInt(src.value, 257);
    };
}

export function loadTryPayout(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2291174705) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
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
        b_0.storeUint(2768106894, 32);
        b_0.storeAddress(src.address);
        b_0.storeInt(src.value, 257);
    };
}

export function loadPayoutOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2768106894) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
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
        b_0.storeUint(2812389767, 32);
        b_0.storeAddress(src.address);
        b_0.storeInt(src.value, 257);
    };
}

export function loadPayoutFailed(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2812389767) { throw Error('Invalid prefix'); }
    let _address = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
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
        b_0.storeInt(src.startAt, 257);
        b_0.storeInt(src.endAt, 257);
    };
}

export function loadBurnParameters(slice: Slice) {
    let sc_0 = slice;
    let _startAt = sc_0.loadIntBig(257);
    let _endAt = sc_0.loadIntBig(257);
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

 type PayoutBeacon_init_args = {
    $$type: 'PayoutBeacon_init_args';
    owner: Address;
    master: Address;
}

function initPayoutBeacon_init_args(src: PayoutBeacon_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
    };
}

async function PayoutBeacon_init(owner: Address, master: Address) {
    const __code = Cell.fromBase64('te6ccgECHgEABK8AART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVEts88uCCGgQFAgEgDg8EsAGPNoAg1yEx+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDGBEU1TIccF8vRwiBJwbds8f+BwIddJwh+VMCDXCx/eIIIQiJCNMbrjAoIQlGqYtroGCwcIAJzI+EMBzH8BygBVIFog10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZYINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WygDJ7VQAIgAAAABQYXlvdXQgZmFpbGVkAWww0x8BghCIkI0xuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZbBIJAViOp9MfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+AwcAsCojH4QW8kECNfA4ERTVNBxwXy9CKzjrhRFAHIWYIQp6Gph1ADyx8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwDJcG3bPOMNfwsKAXYyf1EUAchZghCk/fWOUAPLHwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPAMkSf23bPAsCkm1tIm6zmVsgbvLQgG8iAZEy4vhBbyQTXwP4J28QAaGCEAX14QC5jpWCEAX14QBw+wIQJHADBIEAglAj2zzgECRwAwSAQlAj2zwMDAHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wANAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAgEgEBECASAUFQIRu2wts82zxsMYGhICEbhR3bPNs8bDGBoTAAIgAAIiALm7vRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnAgVcAbgGdjlM5YOq5HJbLDgnCdl05as07LczoOlm2UZuikgnBAznVp5xX50lCwHWFuJkeygCAUgWFwARsK+7UTQ0gABgAgEgGBkCEa7e7Z5tnjYYwBobAHWs3caGrS4MzmdF5eotqmZOzE4uii4PCg3GjKxMrQzITI9Krwjubslu5q7OpirGxuxGzO1G60amSQ2wQAG87UTQ1AH4Y9IAAY5G+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIAVSBsE+D4KNcLCoMJuvLgiRwAAiEBivpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBIC0QHbPB0AAnA=');
    const __system = Cell.fromBase64('te6cckECIAEABLkAAQHAAQEFoLfPAgEU/wD0pBP0vPLICwMCAWISBAIBIA0FAgEgDAYCAUgLBwIBIAkIAHWs3caGrS4MzmdF5eotqmZOzE4uii4PCg3GjKxMrQzITI9Krwjubslu5q7OpirGxuxGzO1G60amSQ2wQAIRrt7tnm2eNhjAHQoAAiEAEbCvu1E0NIAAYAC5u70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopIJwQM51aecV+dJQsB1hbiZHsoAgEgEA4CEbhR3bPNs8bDGB0PAAIiAhG7bC2zzbPGwxgdEQACIAN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRLbPPLggh0UEwCcyPhDAcx/AcoAVSBaINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsoAye1UBLABjzaAINchMfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxgRFNUyHHBfL0cIgScG3bPH/gcCHXScIflTAg1wsf3iCCEIiQjTG64wKCEJRqmLa6HBkWFQFYjqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHAZAWww0x8BghCIkI0xuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZbBIXAqIx+EFvJBAjXwOBEU1TQccF8vQis464URQByFmCEKehqYdQA8sfASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFoEBAc8AyXBt2zzjDX8ZGAF2Mn9RFAHIWYIQpP31jlADyx8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WgQEBzwDJEn9t2zwZApJtbSJus5lbIG7y0IBvIgGRMuL4QW8kE18D+CdvEAGhghAF9eEAuY6VghAF9eEAcPsCECRwAwSBAIJQI9s84BAkcAMEgEJQI9s8GhoByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAGwCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAAiAAAAAFBheW91dCBmYWlsZWQBvO1E0NQB+GPSAAGORvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAFUgbBPg+CjXCwqDCbry4IkeAYr6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgSAtEB2zwfAAJwW/1IkA==');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initPayoutBeacon_init_args({ $$type: 'PayoutBeacon_init_args', owner, master })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const PayoutBeacon_errors: { [key: number]: { message: string } } = {
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
    16059: { message: `Invalid value` },
    19204: { message: `Insufficient balance on master` },
    40368: { message: `Contract stopped` },
    48401: { message: `Invalid signature` },
    53296: { message: `Contract not stopped` },
}

export class PayoutBeacon implements Contract {
    
    static async init(owner: Address, master: Address) {
        return await PayoutBeacon_init(owner, master);
    }
    
    static async fromInit(owner: Address, master: Address) {
        const init = await PayoutBeacon_init(owner, master);
        const address = contractAddress(0, init);
        return new PayoutBeacon(address, init);
    }
    
    static fromAddress(address: Address) {
        return new PayoutBeacon(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: PayoutBeacon_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: TryPayout | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TryPayout') {
            body = beginCell().store(storeTryPayout(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getMaster(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('master', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getCompleted(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('completed', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}