import { beginCell, toNano } from "ton";
import { ContractSystem, testKey } from "@tact-lang/emulator";
import { PayoutsMaster } from "./output/payouts_PayoutsMaster";
import { PayoutBeacon } from "./output/payouts_PayoutBeacon";
import { createTicket } from "./contract.tickets";

describe("contract-payouts", () => {
    it("should payout correctly", async () => {
        // Create keyparis
        let keypair = testKey("keypair-test");
        let publicKey = beginCell().storeBuffer(keypair.publicKey).endCell().beginParse().loadUintBig(256);

        // Create contract system
        let system = await ContractSystem.create();
        let owner = system.treasure("owner");
        expect(owner.address).toMatchInlineSnapshot(`kQAI-3FJVc_ywSuY4vq0bYrzR7S4Och4y7bTU_i5yLOB3A6P`);
        let nonOwner = system.treasure("non-owner");
        let nonOwner2 = system.treasure("non-owner-2");
        let contract = system.open(await PayoutsMaster.fromInit(owner.address, publicKey, null));
        let payeeBeaconContract = system.open(await PayoutBeacon.fromInit(nonOwner.address, contract.address));
        system.name(contract, "master");
        let track = system.track(contract.address);
        await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
        await contract.send(owner, { value: toNano(100000) }, "Deposit");
        await system.run();

        // Try to withdraw with a ticket for incorrect user
        track.reset();
        let ticket = createTicket(nonOwner.address, toNano(100), keypair.secretKey);
        await contract.send(nonOwner2, { value: toNano(1) }, ticket);
        await system.run();
        expect(track.collect()).toMatchInlineSnapshot(`
            [
              {
                "$seq": 2,
                "events": [
                  {
                    "$type": "storage-charged",
                    "amount": "0.000000017",
                  },
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "text": "ykxDM8uSVnETzVCi8-mWYFMiCPLAKkVUn4qj2Bki4zzxYmawJq8rMPQ7jD6h69tsJlJpWDdFpCACzyBTb3osCVF0h26AAA",
                        "type": "text",
                      },
                      "bounce": true,
                      "from": "@treasure(non-owner-2)",
                      "to": "@master",
                      "type": "internal",
                      "value": "1",
                    },
                  },
                  {
                    "$type": "failed",
                    "errorCode": 48401,
                    "errorMessage": "Invalid signature",
                  },
                  {
                    "$type": "sent-bounced",
                    "message": {
                      "body": {
                        "cell": "x{FFFFFFFF00000000796B78444D387553566E45547A564369382D6D5759464D6943504C41}",
                        "type": "cell",
                      },
                      "bounce": false,
                      "from": "@master",
                      "to": "@treasure(non-owner-2)",
                      "type": "internal",
                      "value": "0.944409",
                    },
                  },
                ],
              },
            ]
        `);

        // Try to withdraw with a ticket for correct user
        await contract.send(nonOwner, { value: toNano(1) }, ticket);
        await system.run();
        expect((await payeeBeaconContract.getOwner()).toString({ testOnly: true })).toBe(
            nonOwner.address.toString({ testOnly: true })
        );
        expect(await payeeBeaconContract.getCompleted()).toBe(true);
        expect((await payeeBeaconContract.getMaster()).toString({ testOnly: true })).toBe(
            contract.address.toString({ testOnly: true })
        );
        expect(track.collect()).toMatchInlineSnapshot(`
            [
              {
                "$seq": 3,
                "events": [
                  {
                    "$type": "storage-charged",
                    "amount": "0.000000017",
                  },
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "text": "ykxDM8uSVnETzVCi8-mWYFMiCPLAKkVUn4qj2Bki4zzxYmawJq8rMPQ7jD6h69tsJlJpWDdFpCACzyBTb3osCVF0h26AAA",
                        "type": "text",
                      },
                      "bounce": true,
                      "from": "@treasure(non-owner)",
                      "to": "@master",
                      "type": "internal",
                      "value": "1",
                    },
                  },
                  {
                    "$type": "processed",
                    "gasUsed": 68346n,
                  },
                  {
                    "$type": "sent",
                    "messages": [
                      {
                        "body": {
                          "cell": "x{60912F1F8012B3B3A9D3FC4B5C62F80F98DD957DF46D5ADF361B39CA1BC6DA803B4BB6F36E0A2E90EDD001_}",
                          "type": "cell",
                        },
                        "bounce": true,
                        "from": "@master",
                        "to": "kQCs3SKsnoYEsiI-lboLs597Jqlj65MMIYeZUlz4DMzPIYPF",
                        "type": "internal",
                        "value": "0.917541",
                      },
                    ],
                  },
                ],
              },
              {
                "$seq": 4,
                "events": [
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "cell": "x{D90AAA128012B3B3A9D3FC4B5C62F80F98DD957DF46D5ADF361B39CA1BC6DA803B4BB6F36E0A2E90EDD001_}",
                        "type": "cell",
                      },
                      "bounce": true,
                      "from": "kQCs3SKsnoYEsiI-lboLs597Jqlj65MMIYeZUlz4DMzPIYPF",
                      "to": "@master",
                      "type": "internal",
                      "value": "0.804706",
                    },
                  },
                  {
                    "$type": "processed",
                    "gasUsed": 14160n,
                  },
                  {
                    "$type": "sent",
                    "messages": [
                      {
                        "body": {
                          "text": "Withdraw Completed",
                          "type": "text",
                        },
                        "bounce": true,
                        "from": "@master",
                        "to": "@treasure(non-owner)",
                        "type": "internal",
                        "value": "100.78927",
                      },
                    ],
                  },
                ],
              },
            ]
        `);

        // Try to withdraw second time
        await contract.send(nonOwner, { value: toNano(1) }, ticket);
        await system.run();
        expect(track.collect()).toMatchInlineSnapshot(`
            [
              {
                "$seq": 5,
                "events": [
                  {
                    "$type": "storage-charged",
                    "amount": "0.000000017",
                  },
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "text": "ykxDM8uSVnETzVCi8-mWYFMiCPLAKkVUn4qj2Bki4zzxYmawJq8rMPQ7jD6h69tsJlJpWDdFpCACzyBTb3osCVF0h26AAA",
                        "type": "text",
                      },
                      "bounce": true,
                      "from": "@treasure(non-owner)",
                      "to": "@master",
                      "type": "internal",
                      "value": "1",
                    },
                  },
                  {
                    "$type": "processed",
                    "gasUsed": 68346n,
                  },
                  {
                    "$type": "sent",
                    "messages": [
                      {
                        "body": {
                          "cell": "x{60912F1F8012B3B3A9D3FC4B5C62F80F98DD957DF46D5ADF361B39CA1BC6DA803B4BB6F36E0A2E90EDD001_}",
                          "type": "cell",
                        },
                        "bounce": true,
                        "from": "@master",
                        "to": "kQCs3SKsnoYEsiI-lboLs597Jqlj65MMIYeZUlz4DMzPIYPF",
                        "type": "internal",
                        "value": "0.917541",
                      },
                    ],
                  },
                ],
              },
              {
                "$seq": 6,
                "events": [
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "cell": "x{25BD488E8012B3B3A9D3FC4B5C62F80F98DD957DF46D5ADF361B39CA1BC6DA803B4BB6F36E0A2E90EDD001_}",
                        "type": "cell",
                      },
                      "bounce": false,
                      "from": "kQCs3SKsnoYEsiI-lboLs597Jqlj65MMIYeZUlz4DMzPIYPF",
                      "to": "@master",
                      "type": "internal",
                      "value": "0.905232993",
                    },
                  },
                  {
                    "$type": "processed",
                    "gasUsed": 7874n,
                  },
                  {
                    "$type": "sent",
                    "messages": [
                      {
                        "body": {
                          "text": "Already withdrawn",
                          "type": "text",
                        },
                        "bounce": true,
                        "from": "@master",
                        "to": "@treasure(non-owner)",
                        "type": "internal",
                        "value": "100.896090993",
                      },
                    ],
                  },
                ],
              },
            ]
        `);
    });
});
