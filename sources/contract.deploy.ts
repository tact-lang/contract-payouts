import * as fs from 'fs';
import * as path from 'path';
import { Address, beginCell, contractAddress, fromNano, toNano } from "ton";
import { BurnParameters, PayoutsMaster } from "./output/payouts_PayoutsMaster";
import { prepareTactDeployment } from "@tact-lang/deployer";
import { generateList } from './contract.tickets';

(async () => {

    // Create tickets
    const tickets = generateList([{
        address: 'kQAp8i3_3zwdIrK7-bx4iDkTD6ep3v1JV4NtCLaVvyq5dHUA',
        amount: toNano('10')
    }]);

    // Parameters
    let testnet = true;
    let packageName = 'payouts_PayoutsMaster.pkg';
    let owner = Address.parse('kQAp8i3_3zwdIrK7-bx4iDkTD6ep3v1JV4NtCLaVvyq5dHUA');
    let publicKey = beginCell().storeBuffer(tickets.publicKey).endCell().beginParse().loadUintBig(256); // Convert to uint256
    let burnParameters: BurnParameters | null = null;
    let init = await PayoutsMaster.init(owner, publicKey, burnParameters);

    // Load required data
    let address = contractAddress(0, init);
    let data = init.data.toBoc();
    let pkg = fs.readFileSync(path.resolve(__dirname, 'output', packageName));

    // Prepareing
    console.log('Uploading package...');
    let prepare = await prepareTactDeployment({ pkg, data, testnet });

    // Deploying
    console.log("============================================================================================");
    console.log('Contract Address')
    console.log("============================================================================================");
    console.log();
    console.log(address.toString({ testOnly: testnet }));
    console.log();
    console.log("============================================================================================");
    console.log('Please, follow deployment link')
    console.log("============================================================================================");
    console.log();
    console.log(prepare);
    console.log();
    console.log("============================================================================================");
    console.log('Tickets')
    console.log("============================================================================================");
    console.log();
    for (let t of tickets.list) {
        console.log(t.address, t.ticket, fromNano(t.amount));
    }
    console.log();
})();