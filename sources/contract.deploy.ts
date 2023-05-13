import * as fs from 'fs';
import * as path from 'path';
import { Address, contractAddress } from "ton";
import { BurnParameters, PayoutsMaster } from "./output/payouts_PayoutsMaster";
import { prepareTactDeployment } from "@tact-lang/deployer";

(async () => {

    // Parameters
    let testnet = true;
    let packageName = 'payouts_PayoutsMaster.pkg';
    let owner = Address.parse('kQBM7QssP28PhrctDOyd47_zpFfDiQvv5V9iXizNopb1d2LB');
    let publicKey = 0n; // Put here your public key
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
})();