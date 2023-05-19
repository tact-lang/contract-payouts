import { beginCell, toNano } from "ton";
import { ContractSystem, testKey } from "@tact-lang/emulator";
import { PayoutsMaster } from "./output/payouts_PayoutsMaster";
import { PayoutBeacon } from "./output/payouts_PayoutBeacon";

describe("contract-storage", () => {
    it("should keep enough for storage for master", async () => {
        let keypair = testKey("keypair-test");
        let publicKey = beginCell().storeBuffer(keypair.publicKey).endCell().beginParse().loadUintBig(256);
        let system = await ContractSystem.create();
        let owner = system.treasure("owner");
        let contract = system.open(await PayoutsMaster.fromInit(owner.address, publicKey, null));
        system.update({ now: 1000 });
        await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
        await system.run();

        // Check balances
        system.update({ now: 1000 + 5 * 365 * 24 * 60 * 60 }); // 5 years
        let track = system.track(contract.address);
        await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
        await system.run();
        expect(track.collect()).toMatchInlineSnapshot(`
            [
              {
                "$seq": 1,
                "events": [
                  {
                    "$type": "storage-charged",
                    "amount": "0.1",
                  },
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "type": "known",
                        "value": {
                          "$$type": "Deploy",
                          "queryId": 0n,
                        },
                      },
                      "bounce": true,
                      "from": "@treasure(owner)",
                      "to": "kQD5G8zE_ukY718VcHMSvIo8IaEoYkev5Q5B8mL9UonWIVxQ",
                      "type": "internal",
                      "value": "1",
                    },
                  },
                  {
                    "$type": "processed",
                    "gasUsed": 9354n,
                  },
                  {
                    "$type": "sent",
                    "messages": [
                      {
                        "body": {
                          "type": "known",
                          "value": {
                            "$$type": "DeployOk",
                            "queryId": 0n,
                          },
                        },
                        "bounce": false,
                        "from": "kQD5G8zE_ukY718VcHMSvIo8IaEoYkev5Q5B8mL9UonWIVxQ",
                        "to": "@treasure(owner)",
                        "type": "internal",
                        "value": "0.88945",
                      },
                    ],
                  },
                ],
              },
            ]
        `);
    });

    it("should keep enough for storage for beacon", async () => {
        let keypair = testKey("keypair-test");
        let publicKey = beginCell().storeBuffer(keypair.publicKey).endCell().beginParse().loadUintBig(256);
        let system = await ContractSystem.create();
        let owner = system.treasure("owner");
        let master = system.treasure("master");
        let contract = system.open(await PayoutBeacon.fromInit(owner.address, master.address));
        system.update({ now: 1000 });
        await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
        await system.run();

        // Check balances
        system.update({ now: 1000 + 5 * 365 * 24 * 60 * 60 }); // 5 years
        let track = system.track(contract.address);
        await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
        await system.run();
        expect(track.collect()).toMatchInlineSnapshot(`
            [
              {
                "$seq": 1,
                "events": [
                  {
                    "$type": "storage-charged",
                    "amount": "0.063453593",
                  },
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "type": "known",
                        "value": {
                          "$$type": "Deploy",
                          "queryId": 0n,
                        },
                      },
                      "bounce": true,
                      "from": "@treasure(owner)",
                      "to": "kQBIFQ-G8L3XRUNxbTs8xg3BjFOUKtmQdZWtX9ybpeHI42t-",
                      "type": "internal",
                      "value": "1",
                    },
                  },
                  {
                    "$type": "processed",
                    "gasUsed": 9633n,
                  },
                  {
                    "$type": "sent",
                    "messages": [
                      {
                        "body": {
                          "type": "known",
                          "value": {
                            "$$type": "DeployOk",
                            "queryId": 0n,
                          },
                        },
                        "bounce": false,
                        "from": "kQBIFQ-G8L3XRUNxbTs8xg3BjFOUKtmQdZWtX9ybpeHI42t-",
                        "to": "@treasure(owner)",
                        "type": "internal",
                        "value": "0.925717407",
                      },
                    ],
                  },
                ],
              },
            ]
        `);
    });
});
