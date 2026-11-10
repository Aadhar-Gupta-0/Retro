# retro — Funding Metadata Explorer

A small, read-only Drips metadata explorer, expanded from a funding-configuration-only repository into a usable static website with validator tests and copyable network owner addresses.

## What this project does
- Loads the checked-in `FUNDING.json` and validates its networks and EVM-style owner addresses.
- Displays the configured owner addresses for Ethereum and Filecoin.
- Allows copying an address, with explicit warning that metadata is not proof of ownership or payment activity.
- Runs completely locally with no wallet connection, third-party RPC, trackers, or API keys.

## Run

```bash
python -m http.server 8000
```

Open http://localhost:8000. Tests: `node test-funding.js`.

## Provenance and safeguards

The `FUNDING.json` metadata is retained from [ethglobal/fil-retropgf](https://github.com/ethglobal/fil-retropgf). **Do not treat those addresses as your own or change them to solicit funds.** This edition adds an independent, read-only inspection interface; it does not distribute RetroPGF funds or validate on-chain balances.

The repository is independently maintained in `Aadhar-Gupta-0/Retro`.
