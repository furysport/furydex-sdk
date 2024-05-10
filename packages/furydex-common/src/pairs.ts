import { AssetInfo } from "@furyanetwork/furydex-contracts-sdk";
import {
  AIRI_CONTRACT,
  ATOM_FURYA_DENOM,
  BTC_CONTRACT,
  INJECTIVE_CONTRACT,
  KWT_CONTRACT,
  MILKY_CONTRACT,
  FURY,
  FURYX_CONTRACT,
  OSMOSIS_FURYA_DENOM,
  SCATOM_CONTRACT,
  SCFURY_CONTRACT,
  TRX_CONTRACT,
  USDC_CONTRACT,
  USDT_CONTRACT,
  WETH_CONTRACT,
  KUJIRA_FURYA_DENOM as KUJIRA_ADDRESS,
  OCH_CONTRACT
} from "./constant";
import { parseAssetInfo } from "./helper";
import { TokenItemType, assetInfoMap } from "./token";
import uniq from "lodash/uniq";
import flatten from "lodash/flatten";

export type PairMapping = {
  asset_infos: [AssetInfo, AssetInfo];
  symbols: [string, string];
  factoryV1?: boolean;
};

export const PAIRS: PairMapping[] = [
  {
    asset_infos: [{ token: { contract_addr: AIRI_CONTRACT } }, { native_token: { denom: FURY } }],
    symbols: ["AIRI", "FURY"],
    factoryV1: true
  },
  {
    asset_infos: [{ token: { contract_addr: FURYX_CONTRACT } }, { native_token: { denom: FURY } }],
    symbols: ["FURYX", "FURY"],
    factoryV1: true
  },
  {
    asset_infos: [{ token: { contract_addr: SCFURY_CONTRACT } }, { native_token: { denom: FURY } }],
    symbols: ["scFURY", "FURY"]
  },
  {
    asset_infos: [{ native_token: { denom: FURY } }, { native_token: { denom: ATOM_FURYA_DENOM } }],
    symbols: ["FURY", "ATOM"],
    factoryV1: true
  },
  {
    asset_infos: [{ native_token: { denom: FURY } }, { token: { contract_addr: USDT_CONTRACT } }],
    symbols: ["FURY", "USDT"],
    factoryV1: true
  },
  {
    asset_infos: [{ token: { contract_addr: KWT_CONTRACT } }, { native_token: { denom: FURY } }],
    symbols: ["KWT", "FURY"],
    factoryV1: true
  },
  {
    asset_infos: [{ native_token: { denom: FURY } }, { native_token: { denom: OSMOSIS_FURYA_DENOM } }],
    symbols: ["FURY", "OSMO"],
    factoryV1: true
  },
  {
    asset_infos: [{ token: { contract_addr: MILKY_CONTRACT } }, { token: { contract_addr: USDT_CONTRACT } }],
    symbols: ["MILKY", "USDT"],
    factoryV1: true
  },
  {
    asset_infos: [{ native_token: { denom: FURY } }, { token: { contract_addr: USDC_CONTRACT } }],
    symbols: ["FURY", "USDC"]
  },
  {
    asset_infos: [{ native_token: { denom: FURY } }, { token: { contract_addr: TRX_CONTRACT } }],
    symbols: ["FURY", "wTRX"]
  },
  {
    asset_infos: [{ token: { contract_addr: SCATOM_CONTRACT } }, { native_token: { denom: ATOM_FURYA_DENOM } }],
    symbols: ["scATOM", "ATOM"]
  },
  {
    asset_infos: [{ token: { contract_addr: INJECTIVE_CONTRACT } }, { native_token: { denom: FURY } }],
    symbols: ["INJ", "FURY"]
  },
  // TODO: true order is furyx/usdc, but we reverse this to serve client
  {
    asset_infos: [{ token: { contract_addr: USDC_CONTRACT } }, { token: { contract_addr: FURYX_CONTRACT } }],
    symbols: ["USDC", "FURYX"]
  },
  {
    asset_infos: [{ native_token: { denom: FURY } }, { token: { contract_addr: WETH_CONTRACT } }],
    symbols: ["FURY", "WETH"]
  },
  {
    asset_infos: [{ native_token: { denom: KUJIRA_ADDRESS } }, { token: { contract_addr: USDC_CONTRACT } }],
    symbols: ["KUJI", "USDC"]
  },
  {
    asset_infos: [{ native_token: { denom: FURY } }, { token: { contract_addr: BTC_CONTRACT } }],
    symbols: ["FURY", "BTC"]
  },
  {
    asset_infos: [{ token: { contract_addr: OCH_CONTRACT } }, { native_token: { denom: FURY } }],
    symbols: ["OCH", "FURY"]
  }
];

// FIXME: makes this dynamic in the future so that permissionless listing is simpler
export enum pairLpTokens {
  AIRI_FURY = "furya1hxm433hnwthrxneyjysvhny539s9kh6s2g2n8y",
  FURYX_FURY = "furya1qmy3uuxktflvreanaqph6yua7stjn6j65rur62",
  SCFURY_FURY = "furya1ay689ltr57jt2snujarvakxrmtuq8fhuat5rnvq6rct89vjer9gqm2vde6",
  ATOM_FURY = "furya1g2prqry343kx566cp7uws9w7v78n5tejylvaz6",
  USDT_FURY = "furya1mav52eqhd07c3lwevcnqdykdzhh4733zf32jcn",
  KWT_FURY = "furya17rcfcrwltujfvx7w4l2ggyku8qrncy0hdvrzvc",
  OSMO_FURY = "furya19ltj97jmdqnz5mrd2amethetvcwsp0220kww3e",
  MILKY_USDT = "furya18ywllw03hvy720l06rme0apwyyq9plk64h9ccf",
  USDC_FURY = "furya1e0x87w9ezwq2sdmvv5dq5ngzy98lt47tqfaf2m7zpkg49g5dj6fqred5d7",
  TRX_FURY = "furya1wgywgvumt5dxhm7vjpwx5es9ecrtl85qaqdspjqwx2lugy7vmw5qlwrn88",
  SCATOM_ATOM = "furya1hcjne0hmdj6pjrc3xuksucr0yplsa9ny7v047c34y8k8hfflq6yqyjapnn",
  INJ_FURY = "furya1slqw6gfvs6l2jgvh5ryjayf4g77d7sgfv6fumtyzcr06a6g9gnrq6c4rgg",
  USDC_FURYX = "furya1nwpfd09mr4rf8d5c9mh43axzezkwyr7dq2lus23jsw4xw2jqkaxqxwmkd3",
  FURY_WETH = "furya1rvr9wk6mdlfysvgp72ltthqvkkd5677mp892efq86yyr9alt0tms2a6lcs",
  FURY_BTC = "furya1jd9lc2qt0ltjsatgnu38xsz8ngp89clp0dpeh8geyjj70yvkn4kqmrmh3m",
  KUJI_USDC = "furya1rmvjmwd940ztafxue7630g75px8tqma4jskjuu57fkj0eqahqfgqqwjm00",
  OCH_FURY = "furya1xs5aj90d5m8kwfp9t6ghkcpk8d7sy5jsxdsyejjdxudhhfm7wegsdg929d"
}

// token identifier can be denom or contract addr
export const isInPairList = (tokenIdentifier: string) => {
  return PAIRS.some((pair) =>
    pair.asset_infos.some((info) => {
      if ("native_token" in info) {
        return info.native_token.denom === tokenIdentifier;
      }
      return info.token.contract_addr === tokenIdentifier;
    })
  );
};

export const isFactoryV1 = (assetInfos: [AssetInfo, AssetInfo]): boolean => {
  const pair = PAIRS.find(
    (pair) =>
      pair.asset_infos.find((info) => parseAssetInfo(info) === parseAssetInfo(assetInfos[0])) &&
      pair.asset_infos.find((info) => parseAssetInfo(info) === parseAssetInfo(assetInfos[1]))
  );
  if (!pair) {
    return true;
  }
  return pair.factoryV1 ?? false;
};

export const getPoolTokens = (): TokenItemType[] => {
  return uniq(flatten(PAIRS.map((pair) => pair.asset_infos)).map((info) => assetInfoMap[parseAssetInfo(info)]));
};

export const PAIRS_CHART = PAIRS.map((pair) => {
  const assets = pair.asset_infos.map((info) => {
    if ("native_token" in info) return info.native_token.denom;
    return info.token.contract_addr;
  });

  return {
    ...pair,
    symbol: `${pair.symbols[0]}/${pair.symbols[1]}`,
    info: `${assets[0]}-${assets[1]}`
  };
});
