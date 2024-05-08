import { FeeCurrency } from "@keplr-wallet/types";
import { PairInfo } from "@furyanetwork/furydex-contracts-sdk";
import { flatten, uniqBy } from "lodash";
import { INJECTIVE_FURYA_DENOM, KWTBSC_FURYA_DENOM, MILKYBSC_FURYA_DENOM } from "./constant";
import {
  CoinGeckoId,
  CoinIcon,
  CustomChainInfo,
  NetworkChainId,
  NetworkName,
  chainInfos,
  furyaNetwork
} from "./network";

export type EvmDenom = "bep20_fury" | "bep20_airi" | "erc20_fury" | "kawaii_fury";
export type AmountDetails = { [denom: string]: string };

/**
 * Prices of each token.
 */
export type CoinGeckoPrices<T extends string> = {
  [C in T]: number | null;
};

export type TokenItemType = {
  name: string;
  org: NetworkName;
  denom: string;
  prefix?: string;
  contractAddress?: string;
  evmDenoms?: string[];
  bridgeNetworkIdentifier?: NetworkChainId;
  bridgeTo?: NetworkChainId[];
  Icon: CoinIcon;
  IconLight?: CoinIcon;
  chainId: NetworkChainId;
  coinType?: number;
  rpc: string;
  decimals: number;
  maxGas?: number;
  coinGeckoId: CoinGeckoId;
  cosmosBased: Boolean;
  minAmountSwap?: number;
  gasPriceStep?: {
    readonly low: number;
    readonly average: number;
    readonly high: number;
  };
  feeCurrencies?: FeeCurrency[];
};

export type TokenInfo = TokenItemType & {
  symbol?: string;
  total_supply?: string;
  icon?: string;
  verified?: boolean;
};

export type PairInfoExtend = PairInfo & {
  asset_infos_raw: [string, string];
};

export interface FormatNumberDecimal {
  price: number;
  maxDecimal?: number;
  unit?: string;
  minDecimal?: number;
  minPrice?: number;
  unitPosition?: "prefix" | "suffix";
}

const evmDenomsMap = {
  kwt: [KWTBSC_FURYA_DENOM],
  milky: [MILKYBSC_FURYA_DENOM],
  injective: [INJECTIVE_FURYA_DENOM]
};
const minAmountSwapMap = {
  trx: 10
};

export const getTokensFromNetwork = (network: CustomChainInfo): TokenItemType[] => {
  return network.currencies.map((currency) => ({
    name: currency.coinDenom,
    org: network.chainName,
    coinType: network.bip44.coinType,
    contractAddress: currency.contractAddress,
    prefix: currency?.prefixToken ?? network.bech32Config?.bech32PrefixAccAddr,
    coinGeckoId: currency.coinGeckoId,
    denom: currency.coinMinimalDenom,
    bridgeNetworkIdentifier: currency.bridgeNetworkIdentifier,
    decimals: currency.coinDecimals,
    bridgeTo: currency.bridgeTo,
    chainId: network.chainId,
    rpc: network.rpc,
    lcd: network.rest,
    cosmosBased: network.networkType === "cosmos",
    maxGas: (network.feeCurrencies?.[0].gasPriceStep?.high ?? 0) * 20000,
    gasPriceStep: currency.gasPriceStep,
    feeCurrencies: network.feeCurrencies,
    minAmountSwap: minAmountSwapMap[currency.coinMinimalDenom],
    evmDenoms: evmDenomsMap[currency.coinMinimalDenom],
    Icon: currency.Icon,
    IconLight: currency?.IconLight
  }));
};

// other chains, furya
const otherChainTokens = flatten(
  chainInfos.filter((chainInfo) => chainInfo.chainId !== "furya-1").map(getTokensFromNetwork)
);
export const furyaTokens: TokenItemType[] = getTokensFromNetwork(furyaNetwork);

export const tokens = [otherChainTokens, furyaTokens];
export const flattenTokens = flatten(tokens);
export const tokenMap = Object.fromEntries(flattenTokens.map((c) => [c.denom, c]));
export const assetInfoMap = Object.fromEntries(flattenTokens.map((c) => [c.contractAddress || c.denom, c]));
export const cosmosTokens = uniqBy(
  flattenTokens.filter(
    (token) =>
      // !token.contractAddress &&
      token.denom && token.cosmosBased && token.coinGeckoId
  ),
  (c) => c.denom
);

export const cw20Tokens = uniqBy(
  cosmosTokens.filter(
    // filter cosmos based tokens to collect tokens that have contract addresses
    (token) =>
      // !token.contractAddress &&
      token.contractAddress
  ),
  (c) => c.denom
);

export const cw20TokenMap = Object.fromEntries(cw20Tokens.map((c) => [c.contractAddress, c]));

export const evmTokens = uniqBy(
  flattenTokens.filter(
    (token) =>
      // !token.contractAddress &&
      token.denom && !token.cosmosBased && token.coinGeckoId && token.chainId !== "kawaii_6886-1"
  ),
  (c) => c.denom
);

export const kawaiiTokens = uniqBy(
  cosmosTokens.filter((token) => token.chainId === "kawaii_6886-1"),
  (c) => c.denom
);
