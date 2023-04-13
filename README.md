# TACT Payouts Contract

This contract is a perfect solution to perform on-chain payouts after your project failed. This contracts works by generating an list of text tickets for each address that is entitled for a payout. Tickets are essentially a signed transactions serialized to a comment to be parsed by smart contract. Tickets are best to be generated using offline machine and secret key to be discarded after the generation. You MUST use a new key for each contract to avoid replay attacks.

## Features

* 🔐 Secure. No need to have hot wallets with funds. Key can be discarded after the ticket generation.
* 📝 Easy to use and commercially feasible.
* ⛽️ Minimal gas usage. Most of the gas fees are paid by the payee (~0.1 TON)
* ⏯️ Start, stop and abort payouts at any time.
* 🔥 Ability to slowly burn balances if no one claims the payout.

## Licence

MIT
