import { beginCell, toNano } from "ton";
import { ContractSystem, testKey } from "@tact-lang/emulator";
import { BurnParameters, PayoutsMaster } from "./output/payouts_PayoutsMaster";
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
                    "amount": "0.000000018",
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
                    "amount": "0.000000018",
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
                    "gasUsed": 68454n,
                  },
                  {
                    "$type": "sent",
                    "messages": [
                      {
                        "body": {
                          "type": "known",
                          "value": {
                            "$$type": "TryPayout",
                            "address": kQCVnZ1On-Ja4xfAfMbsq--jatb5sNnOUN421AHaXbebcCWH,
                            "value": 100000000000n,
                          },
                        },
                        "bounce": true,
                        "from": "@master",
                        "to": "kQCVTYoBbKakFl8ZaOQXmRAvYNmxx_-58hw-znXuYeap2XpM",
                        "type": "internal",
                        "value": "0.917433",
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
                        "type": "known",
                        "value": {
                          "$$type": "PayoutOk",
                          "address": kQCVnZ1On-Ja4xfAfMbsq--jatb5sNnOUN421AHaXbebcCWH,
                          "value": 100000000000n,
                        },
                      },
                      "bounce": true,
                      "from": "kQCVTYoBbKakFl8ZaOQXmRAvYNmxx_-58hw-znXuYeap2XpM",
                      "to": "@master",
                      "type": "internal",
                      "value": "0.804598",
                    },
                  },
                  {
                    "$type": "processed",
                    "gasUsed": 16432n,
                  },
                  {
                    "$type": "sent",
                    "messages": [
                      {
                        "body": {
                          "type": "known",
                          "value": {
                            "$$type": "EventPayoutCompleted",
                            "address": kQCVnZ1On-Ja4xfAfMbsq--jatb5sNnOUN421AHaXbebcCWH,
                            "value": 100000000000n,
                          },
                        },
                        "to": null,
                        "type": "external-out",
                      },
                    ],
                  },
                  {
                    "$type": "sent",
                    "messages": [
                      {
                        "body": {
                          "text": "Payout сompleted",
                          "type": "text",
                        },
                        "bounce": true,
                        "from": "@master",
                        "to": "@treasure(non-owner)",
                        "type": "internal",
                        "value": "100.786898",
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
                    "amount": "0.000000018",
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
                    "gasUsed": 68454n,
                  },
                  {
                    "$type": "sent",
                    "messages": [
                      {
                        "body": {
                          "type": "known",
                          "value": {
                            "$$type": "TryPayout",
                            "address": kQCVnZ1On-Ja4xfAfMbsq--jatb5sNnOUN421AHaXbebcCWH,
                            "value": 100000000000n,
                          },
                        },
                        "bounce": true,
                        "from": "@master",
                        "to": "kQCVTYoBbKakFl8ZaOQXmRAvYNmxx_-58hw-znXuYeap2XpM",
                        "type": "internal",
                        "value": "0.917433",
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
                        "type": "known",
                        "value": {
                          "$$type": "PayoutFailed",
                          "address": kQCVnZ1On-Ja4xfAfMbsq--jatb5sNnOUN421AHaXbebcCWH,
                          "value": 100000000000n,
                        },
                      },
                      "bounce": false,
                      "from": "kQCVTYoBbKakFl8ZaOQXmRAvYNmxx_-58hw-znXuYeap2XpM",
                      "to": "@master",
                      "type": "internal",
                      "value": "0.905124993",
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
                          "text": "Already paid",
                          "type": "text",
                        },
                        "bounce": true,
                        "from": "@master",
                        "to": "@treasure(non-owner)",
                        "type": "internal",
                        "value": "100.896022993",
                      },
                    ],
                  },
                ],
              },
            ]
        `);
    });

    it("should burn correctly", async () => {
        // Create keyparis
        let keypair = testKey("keypair-test");
        let publicKey = beginCell().storeBuffer(keypair.publicKey).endCell().beginParse().loadUintBig(256);

        // Create contract system
        let system = await ContractSystem.create();
        let owner = system.treasure("owner");
        let time = 1000000;
        system.update({ now: time });
        expect(owner.address).toMatchInlineSnapshot(`kQAI-3FJVc_ywSuY4vq0bYrzR7S4Och4y7bTU_i5yLOB3A6P`);
        let nonOwner = system.treasure("non-owner");
        let nonOwner2 = system.treasure("non-owner-2");
        let nonOwner3 = system.treasure("non-owner-3");
        let parameters: BurnParameters = {
            $$type: "BurnParameters",
            startAt: BigInt(time + 1000000),
            endAt: BigInt(time + 2000000),
        };
        let contract = system.open(await PayoutsMaster.fromInit(owner.address, publicKey, parameters));
        let payeeBeaconContract = system.open(await PayoutBeacon.fromInit(nonOwner.address, contract.address));
        system.name(contract, "master");
        await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
        await contract.send(owner, { value: toNano(100000) }, "Deposit");
        await system.run();

        // Create tickets
        let ticket1 = createTicket(nonOwner.address, toNano(100), keypair.secretKey);
        let ticket2 = createTicket(nonOwner2.address, toNano(100), keypair.secretKey);
        let ticket3 = createTicket(nonOwner3.address, toNano(100), keypair.secretKey);

        // Withdraw before burn start
        let track = system.track(contract.address);
        system.update({ now: time + 100000 }); // Should not be burned
        await contract.send(nonOwner, { value: toNano(1) }, ticket1);
        await system.run();
        expect(track.collect()).toMatchInlineSnapshot(`
            [
              {
                "$seq": 2,
                "events": [
                  {
                    "$type": "storage-charged",
                    "amount": "0.00010671",
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
                    "gasUsed": 69176n,
                  },
                  {
                    "$type": "sent",
                    "messages": [
                      {
                        "body": {
                          "type": "known",
                          "value": {
                            "$$type": "TryPayout",
                            "address": kQCVnZ1On-Ja4xfAfMbsq--jatb5sNnOUN421AHaXbebcCWH,
                            "value": 100000000000n,
                          },
                        },
                        "bounce": true,
                        "from": "@master",
                        "to": "kQBvO3dtER3iFzHBia6pUWAwEV_Lna8xroilY0zN6LVO2ZBW",
                        "type": "internal",
                        "value": "0.916711",
                      },
                    ],
                  },
                ],
              },
              {
                "$seq": 3,
                "events": [
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "type": "known",
                        "value": {
                          "$$type": "PayoutOk",
                          "address": kQCVnZ1On-Ja4xfAfMbsq--jatb5sNnOUN421AHaXbebcCWH,
                          "value": 100000000000n,
                        },
                      },
                      "bounce": true,
                      "from": "kQBvO3dtER3iFzHBia6pUWAwEV_Lna8xroilY0zN6LVO2ZBW",
                      "to": "@master",
                      "type": "internal",
                      "value": "0.803876",
                    },
                  },
                  {
                    "$type": "processed",
                    "gasUsed": 16698n,
                  },
                  {
                    "$type": "sent",
                    "messages": [
                      {
                        "body": {
                          "type": "known",
                          "value": {
                            "$$type": "EventPayoutCompleted",
                            "address": kQCVnZ1On-Ja4xfAfMbsq--jatb5sNnOUN421AHaXbebcCWH,
                            "value": 100000000000n,
                          },
                        },
                        "to": null,
                        "type": "external-out",
                      },
                    ],
                  },
                  {
                    "$type": "sent",
                    "messages": [
                      {
                        "body": {
                          "text": "Payout сompleted",
                          "type": "text",
                        },
                        "bounce": true,
                        "from": "@master",
                        "to": "@treasure(non-owner)",
                        "type": "internal",
                        "value": "100.78591",
                      },
                    ],
                  },
                ],
              },
            ]
        `);

        // Withdraw after burn start but before burn end
        system.update({ now: time + 1500000 }); // Should be 50% burned
        await contract.send(nonOwner2, { value: toNano(1) }, ticket2);
        await system.run();
        expect(track.collect()).toMatchInlineSnapshot(`
            [
              {
                "$seq": 4,
                "events": [
                  {
                    "$type": "storage-charged",
                    "amount": "0.001493931",
                  },
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "text": "rT5KDaSaihJd8KPZa3BV-lpX_nF5UPhmjFtlK0AJEl50LgkoFSjIocBLwRigugTXen_oh-TB0GxYzXagFckGDlF0h26AAA",
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
                    "$type": "processed",
                    "gasUsed": 70722n,
                  },
                  {
                    "$type": "sent",
                    "messages": [
                      {
                        "body": {
                          "type": "known",
                          "value": {
                            "$$type": "TryPayout",
                            "address": kQDVWm0ti1fdMhzNYlzx6DPkpoQtNGw_YKv41uETVNgZJ5TO,
                            "value": 50000000000n,
                          },
                        },
                        "bounce": true,
                        "from": "@master",
                        "to": "kQD0-XQmn_y7TPe_dLR-cnlKZk5eNIiS7SqOK5JlvbHRQIAc",
                        "type": "internal",
                        "value": "0.915165",
                      },
                    ],
                  },
                ],
              },
              {
                "$seq": 5,
                "events": [
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "type": "known",
                        "value": {
                          "$$type": "PayoutOk",
                          "address": kQDVWm0ti1fdMhzNYlzx6DPkpoQtNGw_YKv41uETVNgZJ5TO,
                          "value": 50000000000n,
                        },
                      },
                      "bounce": true,
                      "from": "kQD0-XQmn_y7TPe_dLR-cnlKZk5eNIiS7SqOK5JlvbHRQIAc",
                      "to": "@master",
                      "type": "internal",
                      "value": "0.80233",
                    },
                  },
                  {
                    "$type": "processed",
                    "gasUsed": 16698n,
                  },
                  {
                    "$type": "sent",
                    "messages": [
                      {
                        "body": {
                          "type": "known",
                          "value": {
                            "$$type": "EventPayoutCompleted",
                            "address": kQDVWm0ti1fdMhzNYlzx6DPkpoQtNGw_YKv41uETVNgZJ5TO,
                            "value": 50000000000n,
                          },
                        },
                        "to": null,
                        "type": "external-out",
                      },
                    ],
                  },
                  {
                    "$type": "sent",
                    "messages": [
                      {
                        "body": {
                          "text": "Payout сompleted",
                          "type": "text",
                        },
                        "bounce": true,
                        "from": "@master",
                        "to": "@treasure(non-owner-2)",
                        "type": "internal",
                        "value": "50.784364",
                      },
                    ],
                  },
                ],
              },
            ]
        `);

        // Withdraw after burn end
        system.update({ now: time + 2500000 }); // Should be 100% burned
        await contract.send(nonOwner3, { value: toNano(1) }, ticket3);
        await system.run();
        expect(track.collect()).toMatchInlineSnapshot(`
            [
              {
                "$seq": 6,
                "events": [
                  {
                    "$type": "storage-charged",
                    "amount": "0.001067093",
                  },
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "text": "Xe2gsVc2lhXQqPr4Gi6X079PGuOneUuK7rbaGKKm_zY4rsNOJmXBuOOrMcSgfgpV_PeFC7IM2vboFumWwLOtC1F0h26AAA",
                        "type": "text",
                      },
                      "bounce": true,
                      "from": "@treasure(non-owner-3)",
                      "to": "@master",
                      "type": "internal",
                      "value": "1",
                    },
                  },
                  {
                    "$type": "processed",
                    "gasUsed": 61702n,
                  },
                  {
                    "$type": "sent",
                    "messages": [
                      {
                        "body": {
                          "text": "Payout already ended",
                          "type": "text",
                        },
                        "bounce": true,
                        "from": "@master",
                        "to": "@treasure(non-owner-3)",
                        "type": "internal",
                        "value": "0.937006",
                      },
                    ],
                  },
                ],
              },
            ]
        `);
    });
});
