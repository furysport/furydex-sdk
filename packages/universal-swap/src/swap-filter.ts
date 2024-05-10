import {
  INJECTIVE_FURYA_DENOM,
  KWTBSC_FURYA_DENOM,
  KWT_BSC_CONTRACT,
  MILKYBSC_FURYA_DENOM,
  MILKY_BSC_CONTRACT,
  flattenTokens
} from "@furyanetwork/furydex-common";

export const evmDenomsMap = {
  kwt: [KWTBSC_FURYA_DENOM],
  milky: [MILKYBSC_FURYA_DENOM],
  injective: [INJECTIVE_FURYA_DENOM]
};
const notAllowSwapCoingeckoIds = [];
// universal swap. Currently we dont support from tokens that are not using the ibc wasm channel
const notAllowSwapFromChainIds = [
  "0x1ae6",
  "kawaii_6886-1",
  "furybridge-subnet-2",
  "furybtc-mainnet-1",
  "kaiyo-1",
  "bitcoin"
];
const notAllowDenom = Object.values(evmDenomsMap).flat();
const notAllowBEP20Token = [KWT_BSC_CONTRACT, MILKY_BSC_CONTRACT];
export const swapFromTokens = flattenTokens.filter((token) => {
  return (
    !notAllowDenom.includes(token?.denom) &&
    !notAllowSwapCoingeckoIds.includes(token.coinGeckoId) &&
    !notAllowSwapFromChainIds.includes(token.chainId) &&
    !notAllowBEP20Token.includes(token?.contractAddress)
  );
});
// universal swap. We dont support kwt & milky & injective for simplicity. We also skip FuryBridge tokens because users dont care about them
const notAllowSwapToChainIds = [
  "0x1ae6",
  "kawaii_6886-1",
  "furybridge-subnet-2",
  "furybtc-mainnet-1",
  "kaiyo-1",
  "bitcoin"
];
export const swapToTokens = flattenTokens.filter((token) => {
  return (
    !notAllowDenom.includes(token?.denom) &&
    !notAllowSwapCoingeckoIds.includes(token.coinGeckoId) &&
    !notAllowSwapToChainIds.includes(token.chainId) &&
    !notAllowBEP20Token.includes(token?.contractAddress)
  );
});
