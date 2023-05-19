import { getHttpV4Endpoint } from "@orbs-network/ton-access";
import { Address, TonClient4, fromNano } from "ton";
import { EventPayoutCompleted, loadEventPayoutCompleted } from "./output/payouts_PayoutsMaster";

(async () => {

    // Parameters
    const address = Address.parse('kQDfvuCEv6p_yZNsNs34rUEgADb94X8_cGp8twFaV5Vi_uZC');

    // Load client
    const endpoint = await getHttpV4Endpoint({ network: 'testnet' });
    const client = new TonClient4({ endpoint })

    // Load transactions
    let block = (await client.getLastBlock()).last.seqno;
    let account = await client.getAccount(block, address)
    if (account.account.state.type !== 'active') {
        throw new Error('Account is not active');
    }
    let tx = (await client.getAccountTransactions(address, BigInt(account.account.last!.lt), Buffer.from(account.account.last!.hash, 'base64'))).map((v) => v.tx);
    // while (tx.length > 0 && tx[tx.length - 1].prevTransactionLt !== 0n && tx[tx.length - 1].prevTransactionHash !== 0n) {
    //     let last = tx[tx.length - 1];
    //     // let prev = (await client.getAccountTransactions(address, last.prevTransactionLt, last.prevTransactionHash)).map((v) => v.tx);
    //     // tx = tx.concat(prev);
    //     break;
    // }

    // Load events
    let ev: EventPayoutCompleted[] = [];
    for (let t of tx) {
        for (let msg of t.outMessages.values()) {
            if (msg.info.type === 'external-out') {
                let event = loadEventPayoutCompleted(msg.body.beginParse());
                ev.push(event);
            }
        }
    }

    // Print events
    if (ev.length > 0) {
        console.log('Payouts:');
        for (let e of ev) {
            console.log(e.address.toString({ testOnly: true }) + ': ' + fromNano(e.value));
        }
    }
})();
