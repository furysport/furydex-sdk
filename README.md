# Furya Orderbook SDK

## Generate code and docs

```bash
# build code:
cwtools build ../furyswap/contracts/* ../furydex-listing-contract ../co-harvest-contracts/contracts/* ../cw20-staking/contracts/* -o packages/contracts-build/data
# gen code:
cwtools gents ../furyswap/contracts/* ../furydex-listing-contract ../co-harvest-contracts/contracts/* ../cw20-staking/contracts/* -o packages/contracts-sdk/src
# gen doc:
yarn docs

# update comments:
git apply patches/contracts-sdk.patch
# edit contracts-sdk
git diff packages/contracts-sdk > patches/contracts-sdk.patch
# rollback
git checkout packages/contracts-sdk
```

## Run sample with CosmwasmSimulate

```bash
NODE_ENV=test yarn --cwd packages/market-maker start
```
