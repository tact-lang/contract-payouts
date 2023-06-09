import { beginCell, fromNano, toNano } from "ton";
import { ContractSystem, testKey } from "@tact-lang/emulator";
import { PayoutsMaster } from "./output/payouts_PayoutsMaster";

describe("contract-deposits", () => {
    it("should deploy correctly and deposit", async () => {
        // Create keyparis
        let keypair = testKey("keypair-test");
        let publicKey = beginCell().storeBuffer(keypair.publicKey).endCell().beginParse().loadUintBig(256);

        // Create contract system
        let system = await ContractSystem.create();
        let owner = system.treasure("owner");
        expect(owner.address).toMatchInlineSnapshot(`kQAI-3FJVc_ywSuY4vq0bYrzR7S4Och4y7bTU_i5yLOB3A6P`);
        let nonOwner = system.treasure("non-owner");
        let contract = system.open(await PayoutsMaster.fromInit(owner.address, publicKey, null));
        system.name(contract, "master");
        let track = system.track(contract.address);
        await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
        await contract.send(owner, { value: toNano(100000) }, "Deposit");
        await contract.send(nonOwner, { value: toNano(100000) }, "Deposit");
        await system.run();

        // Check balances
        expect(await contract.getOwner()).toMatchInlineSnapshot(`kQAI-3FJVc_ywSuY4vq0bYrzR7S4Och4y7bTU_i5yLOB3A6P`);
        expect(await contract.getStopped()).toMatchInlineSnapshot(`false`);
        expect(system.contract(contract).balance).toMatchInlineSnapshot(`199999883128000n`);
        expect(track.collect()).toMatchInlineSnapshot(`
            [
              {
                "$seq": 0,
                "events": [
                  {
                    "$type": "deploy",
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
                      "to": "@master",
                      "type": "internal",
                      "value": "1",
                    },
                  },
                  {
                    "$type": "processed",
                    "gasUsed": 9934n,
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
                        "from": "@master",
                        "to": "@treasure(owner)",
                        "type": "internal",
                        "value": "0.88887",
                      },
                    ],
                  },
                ],
              },
              {
                "$seq": 1,
                "events": [
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "text": "Deposit",
                        "type": "text",
                      },
                      "bounce": true,
                      "from": "@treasure(owner)",
                      "to": "@master",
                      "type": "internal",
                      "value": "100000",
                    },
                  },
                  {
                    "$type": "processed",
                    "gasUsed": 8436n,
                  },
                  {
                    "$type": "sent",
                    "messages": [
                      {
                        "body": {
                          "text": "Deposit received",
                          "type": "text",
                        },
                        "bounce": false,
                        "from": "@master",
                        "to": "@treasure(owner)",
                        "type": "internal",
                        "value": "0.09874",
                      },
                    ],
                  },
                ],
              },
              {
                "$seq": 2,
                "events": [
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "text": "Deposit",
                        "type": "text",
                      },
                      "bounce": true,
                      "from": "@treasure(non-owner)",
                      "to": "@master",
                      "type": "internal",
                      "value": "100000",
                    },
                  },
                  {
                    "$type": "processed",
                    "gasUsed": 8436n,
                  },
                  {
                    "$type": "sent",
                    "messages": [
                      {
                        "body": {
                          "text": "Deposit received",
                          "type": "text",
                        },
                        "bounce": false,
                        "from": "@master",
                        "to": "@treasure(non-owner)",
                        "type": "internal",
                        "value": "0.09874",
                      },
                    ],
                  },
                ],
              },
            ]
        `);

        // Should fail because of low value
        await contract.send(nonOwner, { value: toNano("0.5") }, "Deposit");
        await system.run();
        expect(track.collect()).toMatchInlineSnapshot(`
            [
              {
                "$seq": 3,
                "events": [
                  {
                    "$type": "storage-charged",
                    "amount": "0.000000018",
                  },
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "text": "Deposit",
                        "type": "text",
                      },
                      "bounce": true,
                      "from": "@treasure(non-owner)",
                      "to": "@master",
                      "type": "internal",
                      "value": "0.5",
                    },
                  },
                  {
                    "$type": "failed",
                    "errorCode": 16059,
                    "errorMessage": "Invalid value",
                  },
                  {
                    "$type": "sent-bounced",
                    "message": {
                      "body": {
                        "cell": "x{FFFFFFFF000000004465706F736974}",
                        "type": "cell",
                      },
                      "bounce": false,
                      "from": "@master",
                      "to": "@treasure(non-owner)",
                      "type": "internal",
                      "value": "0.494863",
                    },
                  },
                ],
              },
            ]
        `);
    });

    it("should allow withdraw for owner", async () => {
        // Create keyparis
        let keypair = testKey("keypair-test");
        let publicKey = beginCell().storeBuffer(keypair.publicKey).endCell().beginParse().loadUintBig(256);

        // Create contract system
        let system = await ContractSystem.create();
        let owner = system.treasure("owner");
        expect(owner.address).toMatchInlineSnapshot(`kQAI-3FJVc_ywSuY4vq0bYrzR7S4Och4y7bTU_i5yLOB3A6P`);
        let nonOwner = system.treasure("non-owner");
        let contract = system.open(await PayoutsMaster.fromInit(owner.address, publicKey, null));
        system.name(contract, "master");
        await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
        await contract.send(owner, { value: toNano(100000) }, "Deposit");
        await system.run();

        // Withdraw by non-owner must fail
        let track = system.track(contract.address);
        await contract.send(nonOwner, { value: toNano("0.5") }, "Withdraw");
        await system.run();
        expect(track.collect()).toMatchInlineSnapshot(`
            [
              {
                "$seq": 2,
                "events": [
                  {
                    "$type": "storage-charged",
                    "amount": "0.000000018",
                  },
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "text": "Withdraw",
                        "type": "text",
                      },
                      "bounce": true,
                      "from": "@treasure(non-owner)",
                      "to": "@master",
                      "type": "internal",
                      "value": "0.5",
                    },
                  },
                  {
                    "$type": "failed",
                    "errorCode": 132,
                    "errorMessage": "Access denied",
                  },
                  {
                    "$type": "sent-bounced",
                    "message": {
                      "body": {
                        "cell": "x{FFFFFFFF000000005769746864726177}",
                        "type": "cell",
                      },
                      "bounce": false,
                      "from": "@master",
                      "to": "@treasure(non-owner)",
                      "type": "internal",
                      "value": "0.494651",
                    },
                  },
                ],
              },
            ]
        `);

        // Withdraw by owner must succeed
        await contract.send(owner, { value: toNano("0.5") }, "Withdraw");
        await system.run();
        expect(track.collect()).toMatchInlineSnapshot(`
            [
              {
                "$seq": 3,
                "events": [
                  {
                    "$type": "storage-charged",
                    "amount": "0.000000018",
                  },
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "text": "Withdraw",
                        "type": "text",
                      },
                      "bounce": true,
                      "from": "@treasure(owner)",
                      "to": "@master",
                      "type": "internal",
                      "value": "0.5",
                    },
                  },
                  {
                    "$type": "processed",
                    "gasUsed": 9207n,
                  },
                  {
                    "$type": "sent",
                    "messages": [
                      {
                        "body": {
                          "text": "Withdraw completed",
                          "type": "text",
                        },
                        "bounce": false,
                        "from": "@master",
                        "to": "@treasure(owner)",
                        "type": "internal",
                        "value": "100000.381080964",
                      },
                    ],
                  },
                ],
              },
            ]
        `);

        // Check balance
        expect(system.contract(contract).state.state.type).toMatchInlineSnapshot(`"active"`);
        expect(fromNano(system.contract(contract).balance)).toMatchInlineSnapshot(`"0.1"`);
    });

    it("should allow destroy for owner", async () => {
        // Create keyparis
        let keypair = testKey("keypair-test");
        let publicKey = beginCell().storeBuffer(keypair.publicKey).endCell().beginParse().loadUintBig(256);

        // Create contract system
        let system = await ContractSystem.create();
        let owner = system.treasure("owner");
        expect(owner.address).toMatchInlineSnapshot(`kQAI-3FJVc_ywSuY4vq0bYrzR7S4Och4y7bTU_i5yLOB3A6P`);
        let nonOwner = system.treasure("non-owner");
        let contract = system.open(await PayoutsMaster.fromInit(owner.address, publicKey, null));
        system.name(contract, "master");
        await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
        await contract.send(owner, { value: toNano(100000) }, "Deposit");
        await system.run();

        // Destroy by non-owner must fail
        let track = system.track(contract.address);
        await contract.send(nonOwner, { value: toNano("0.5") }, "Destroy");
        await system.run();
        expect(track.collect()).toMatchInlineSnapshot(`
            [
              {
                "$seq": 2,
                "events": [
                  {
                    "$type": "storage-charged",
                    "amount": "0.000000018",
                  },
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "text": "Destroy",
                        "type": "text",
                      },
                      "bounce": true,
                      "from": "@treasure(non-owner)",
                      "to": "@master",
                      "type": "internal",
                      "value": "0.5",
                    },
                  },
                  {
                    "$type": "failed",
                    "errorCode": 132,
                    "errorMessage": "Access denied",
                  },
                  {
                    "$type": "sent-bounced",
                    "message": {
                      "body": {
                        "cell": "x{FFFFFFFF0000000044657374726F79}",
                        "type": "cell",
                      },
                      "bounce": false,
                      "from": "@master",
                      "to": "@treasure(non-owner)",
                      "type": "internal",
                      "value": "0.494538",
                    },
                  },
                ],
              },
            ]
        `);

        // Destroy by owner must succeed
        await contract.send(owner, { value: toNano("0.5") }, "Destroy");
        await system.run();
        expect(track.collect()).toMatchInlineSnapshot(`
            [
              {
                "$seq": 3,
                "events": [
                  {
                    "$type": "storage-charged",
                    "amount": "0.000000018",
                  },
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "text": "Destroy",
                        "type": "text",
                      },
                      "bounce": true,
                      "from": "@treasure(owner)",
                      "to": "@master",
                      "type": "internal",
                      "value": "0.5",
                    },
                  },
                  {
                    "$type": "processed",
                    "gasUsed": 8761n,
                  },
                  {
                    "$type": "sent",
                    "messages": [
                      {
                        "body": {
                          "text": "Contract destroyed",
                          "type": "text",
                        },
                        "bounce": false,
                        "from": "@master",
                        "to": "@treasure(owner)",
                        "type": "internal",
                        "value": "100000.481526964",
                      },
                    ],
                  },
                ],
              },
            ]
        `);
    });
});
