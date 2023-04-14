# TACT Compilation Report
Contract: PayoutsMaster
BOC Size: 2432 bytes

# Types
Total Types: 13

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

## TryPayout
TLB: `try_payout#60912f1f address:address value:coins = TryPayout`
Signature: `TryPayout{address:address,value:coins}`

## PayoutOk
TLB: `payout_ok#d90aaa12 address:address value:coins = PayoutOk`
Signature: `PayoutOk{address:address,value:coins}`

## PayoutFailed
TLB: `payout_failed#25bd488e address:address value:coins = PayoutFailed`
Signature: `PayoutFailed{address:address,value:coins}`

## BurnParameters
TLB: `_ startAt:uint32 endAt:uint32 = BurnParameters`
Signature: `BurnParameters{startAt:uint32,endAt:uint32}`

## EventPayoutCompleted
TLB: `event_payout_completed#3af7b4d6 address:address value:coins = EventPayoutCompleted`
Signature: `EventPayoutCompleted{address:address,value:coins}`

# Get Methods
Total Get Methods: 2

## owner

## stopped

# Error Codes
2: Stack undeflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
4429: Invalid sender
12724: Invalid burn parameters
16059: Invalid value
19204: Insufficient balance on master
40368: Contract stopped
48401: Invalid signature
53296: Contract not stopped