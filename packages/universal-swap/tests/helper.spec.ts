import {
  AIRI_CONTRACT,
  ATOM,
  ATOM_FURYA_DENOM,
  AmountDetails,
  CoinGeckoId,
  CosmosChainId,
  EvmChainId,
  INJECTIVE_CONTRACT,
  INJECTIVE_FURYA_DENOM,
  KWT_BSC_CONTRACT,
  MILKY_BSC_CONTRACT,
  KUJIRA_INFO,
  KUJIRA_FURYA_DENOM,
  NetworkChainId,
  FURY,
  FURYX_CONTRACT,
  FURYX_INFO,
  FURY_BRIDGE_EVM_DENOM_PREFIX,
  FURY_BRIDGE_EVM_ETH_DENOM_PREFIX,
  FURY_BRIDGE_EVM_TRON_DENOM_PREFIX,
  FURY_BSC_CONTRACT,
  FURY_ETH_CONTRACT,
  FURY_INFO,
  TokenInfo,
  TokenItemType,
  USDC_CONTRACT,
  USDC_INFO,
  USDT_BSC_CONTRACT,
  USDT_CONTRACT,
  USDT_ETH_CONTRACT,
  USDT_TRON_CONTRACT,
  WRAP_BNB_CONTRACT,
  WRAP_ETH_CONTRACT,
  WRAP_TRON_TRX_CONTRACT,
  flattenTokens,
  getTokenOnFurya,
  getTokenOnSpecificChainId,
  ibcInfos,
  furyb2furya,
  furya2atom,
  furya2furyb,
  parseTokenInfoRawDenom,
  toDisplay
} from "@furyanetwork/furydex-common";

import * as dexCommonHelper from "@furyanetwork/furydex-common/build/helper";
import * as universalHelper from "../src/helper";
import {
  buildIbcWasmPairKey,
  buildSwapRouterKey,
  addFuryBridgeRoute,
  getRoute,
  getEvmSwapRoute,
  getIbcInfo,
  getSourceReceiver,
  isEvmNetworkNativeSwapSupported,
  isEvmSwappable,
  isSupportedNoPoolSwapEvm,
  generateSwapRoute,
  generateSwapOperationMsgs,
  UniversalSwapHelper
} from "../src/helper";
import { SwapRoute, UniversalSwapType } from "../src/types";
import { AssetInfo } from "@furyanetwork/furydex-contracts-sdk";
import { SwapOperation } from "@furyanetwork/furydex-contracts-sdk";
import { parseToIbcHookMemo, parseToIbcWasmMemo } from "../src/proto/proto-gen";
import { Coin, coin } from "@cosmjs/proto-signing";

describe("test helper functions", () => {
  it("test-buildSwapRouterKey", () => {
    expect(buildSwapRouterKey("foo", "bar")).toEqual("foo-bar");
  });
  it.each<[string, string, string, string[] | undefined]>([
    ["0x38", USDT_BSC_CONTRACT, WRAP_BNB_CONTRACT, [USDT_BSC_CONTRACT, WRAP_BNB_CONTRACT]],
    ["0x38", WRAP_BNB_CONTRACT, USDT_BSC_CONTRACT, [WRAP_BNB_CONTRACT, USDT_BSC_CONTRACT]],
    ["0x38", WRAP_BNB_CONTRACT, USDT_TRON_CONTRACT, [WRAP_BNB_CONTRACT, USDT_BSC_CONTRACT]],
    ["0x38", "", USDT_TRON_CONTRACT, [WRAP_BNB_CONTRACT, USDT_BSC_CONTRACT]],
    ["0x38", USDT_BSC_CONTRACT, "", [USDT_BSC_CONTRACT, WRAP_BNB_CONTRACT]],
    ["0x38", WRAP_BNB_CONTRACT, WRAP_TRON_TRX_CONTRACT, undefined],
    ["Furya", WRAP_BNB_CONTRACT, WRAP_TRON_TRX_CONTRACT, undefined],
    ["0x01", WRAP_ETH_CONTRACT, USDT_ETH_CONTRACT, [WRAP_ETH_CONTRACT, USDT_ETH_CONTRACT]]
  ])("test-getEvmSwapRoute", (chainId, fromContractAddr, toContractAddr, expectedRoute) => {
    const result = getEvmSwapRoute(chainId, fromContractAddr, toContractAddr);
    expect(JSON.stringify(result)).toEqual(JSON.stringify(expectedRoute));
  });

  it.each<[CoinGeckoId, boolean]>([
    ["wbnb", true],
    ["weth", false],
    ["binancecoin", true],
    ["ethereum", true],
    ["kawaii-islands", false]
  ])("test-isSupportedNoPoolSwapEvm", (coingeckoId, expectedResult) => {
    expect(isSupportedNoPoolSwapEvm(coingeckoId)).toEqual(expectedResult);
  });

  it.each<[string, string, string | undefined, string | undefined, boolean]>([
    ["a", "b", "b", "c", false],
    ["a", "a", "b", "c", false],
    ["0x38", "0x38", USDT_TRON_CONTRACT, USDT_BSC_CONTRACT, false],
    ["0x38", "0x38", undefined, USDT_BSC_CONTRACT, true],
    ["0x38", "0x38", USDT_TRON_CONTRACT, undefined, true],
    ["0x38", "0x38", undefined, undefined, false],
    ["0x38", "0x38", WRAP_BNB_CONTRACT, USDT_BSC_CONTRACT, true]
  ])("test-isEvmSwappable", (fromChainId, toChainId, fromContractAddr, toContractAddr, expectedResult) => {
    const result = isEvmSwappable({ fromChainId, toChainId, fromContractAddr, toContractAddr });
    expect(result).toEqual(expectedResult);
  });

  it("test-getIbcInfo", () => {
    expect(() => {
      getIbcInfo("foobar" as any, "0x1ae6");
    }).toThrow();

    expect(getIbcInfo("Furya", "furybridge-subnet-2")).toEqual(ibcInfos["Furya"]["furybridge-subnet-2"]);
    expect(() => {
      getIbcInfo("osmosis-1", "furybridge-subnet-2");
    }).toThrow();
  });

  it("test-buildIbcWasmPairKey", () => {
    expect(buildIbcWasmPairKey("foo", "bar", "john-doe")).toEqual("foo/bar/john-doe");
  });

  it.each<[NetworkChainId, boolean]>([
    ["0x01", true],
    ["0x38", true],
    ["Furya", false]
  ])("test-isEvmNetworkNativeSwapSupported", (chainId, expectedResult) => {
    expect(isEvmNetworkNativeSwapSupported(chainId)).toEqual(expectedResult);
  });

  it("test-getSourceReceiver-should-return-channel-1-plus-address", async () => {
    const keplrAddress = "furya1329tg05k3snr66e2r9ytkv6hcjx6fkxcarydx6";
    const tokenAddress = FURY_BSC_CONTRACT;
    const res = getSourceReceiver(keplrAddress, tokenAddress);
    expect(res).toBe(`${furyb2furya}/${keplrAddress}`);
  });

  it("test-getSourceReceiver-should-return-only-address", async () => {
    const keplrAddress = "furya1329tg05k3snr66e2r9ytkv6hcjx6fkxcarydx6";
    let tokenAddress = KWT_BSC_CONTRACT;
    let res = getSourceReceiver(keplrAddress, tokenAddress);
    expect(res).toBe(keplrAddress);

    tokenAddress = MILKY_BSC_CONTRACT;
    res = getSourceReceiver(keplrAddress, tokenAddress);
    expect(res).toBe(keplrAddress);
  });

  it.each<
    [CoinGeckoId, EvmChainId | CosmosChainId, CoinGeckoId, EvmChainId | CosmosChainId, string, SwapRoute, boolean]
  >([
    [
      "airight",
      "0x38",
      "airight",
      "Furya",
      "",
      { swapRoute: "", universalSwapType: "other-networks-to-furya" },
      false
    ],
    [
      "cosmos",
      "cosmoshub-4",
      "airight",
      "Furya",
      "",
      { swapRoute: "", universalSwapType: "other-networks-to-furya" },
      false
    ],
    [
      "osmosis",
      "osmosis-1",
      "airight",
      "Furya",
      "",
      { swapRoute: "", universalSwapType: "other-networks-to-furya" },
      false
    ],
    [
      "kawaii-islands",
      "kawaii_6886-1",
      "airight",
      "Furya",
      "",
      { swapRoute: "", universalSwapType: "other-networks-to-furya" },
      false
    ],
    [
      "kawaii-islands",
      "0x1ae6",
      "airight",
      "Furya",
      "",
      { swapRoute: "", universalSwapType: "other-networks-to-furya" },
      false
    ],
    [
      "airight",
      "0x38",
      "airight",
      "Furya",
      "furya1234",
      { swapRoute: parseToIbcWasmMemo("furya1234", "", ""), universalSwapType: "other-networks-to-furya" },
      false
    ],
    [
      "airight",
      "Furya",
      "tether",
      "Furya",
      "furya1234",
      { swapRoute: "", universalSwapType: "furya-to-furya" },
      false
    ],
    [
      "airight",
      "0x38",
      "cosmos",
      "Furya",
      "furya1234",
      {
        swapRoute: parseToIbcWasmMemo("furya1234", "", ATOM_FURYA_DENOM),
        universalSwapType: "other-networks-to-furya"
      },
      false
    ],
    [
      "airight",
      "Furya",
      "cosmos",
      "cosmoshub-4",
      "furya1234",
      { swapRoute: "", universalSwapType: "furya-to-cosmos" },
      false
    ],
    [
      "airight",
      "Furya",
      "cosmos",
      "cosmoshub-4",
      "furya1234",
      { swapRoute: "", universalSwapType: "furya-to-cosmos" },
      false
    ],
    [
      "airight",
      "0x38",
      "cosmos",
      "cosmoshub-4",
      "furya1234",
      {
        // swapRoute: `${furya2atom}/furya1234:uatom`,
        swapRoute: parseToIbcWasmMemo("furya1234", furya2atom, "uatom"),
        universalSwapType: "other-networks-to-furya"
      },
      false
    ],
    [
      "tether",
      "0x38",
      "fanfury",
      "0x01",
      "0x09beeedf51aa45718f46837c94712d89b157a9d3",
      {
        swapRoute: parseToIbcWasmMemo(
          `${FURY_BRIDGE_EVM_ETH_DENOM_PREFIX}0x09beeedf51aa45718f46837c94712d89b157a9d3`,
          furya2furyb,
          FURY_BRIDGE_EVM_ETH_DENOM_PREFIX + FURY_ETH_CONTRACT
        ),
        universalSwapType: "other-networks-to-furya"
      },
      false
    ],
    [
      "usd-coin",
      "0x01",
      "tether",
      "0x38",
      "0x09beeedf51aa45718f46837c94712d89b157a9d3",
      {
        // swapRoute: `${furya2furyb}/furya1234:${USDT_BSC_CONTRACT}`,
        swapRoute: parseToIbcWasmMemo(
          `${FURY_BRIDGE_EVM_DENOM_PREFIX}0x09beeedf51aa45718f46837c94712d89b157a9d3`,
          furya2furyb,
          FURY_BRIDGE_EVM_DENOM_PREFIX + USDT_BSC_CONTRACT
        ),
        universalSwapType: "other-networks-to-furya"
      },
      false
    ],
    [
      "usd-coin",
      "0x01",
      "tether",
      "0x2b6653dc",
      "0x09beeedf51aa45718f46837c94712d89b157a9d3",
      {
        // swapRoute: `${furya2furyb}/furya1234:${USDT_TRON_CONTRACT}`,
        swapRoute: parseToIbcWasmMemo(
          `${FURY_BRIDGE_EVM_TRON_DENOM_PREFIX}0x09beeedf51aa45718f46837c94712d89b157a9d3`,
          furya2furyb,
          FURY_BRIDGE_EVM_TRON_DENOM_PREFIX + USDT_TRON_CONTRACT
        ),
        universalSwapType: "other-networks-to-furya"
      },
      false
    ],
    [
      "usd-coin",
      "0x01",
      "tether",
      "0x2b6653dc",
      "0x1234",
      {
        // swapRoute: `${furya2furyb}/${FURY_BRIDGE_EVM_TRON_DENOM_PREFIX}0x1234:${USDT_TRON_CONTRACT}`,
        swapRoute: parseToIbcWasmMemo(
          `${FURY_BRIDGE_EVM_TRON_DENOM_PREFIX}0x1234`,
          furya2furyb,
          FURY_BRIDGE_EVM_TRON_DENOM_PREFIX + USDT_TRON_CONTRACT
        ),
        universalSwapType: "other-networks-to-furya"
      },
      false
    ],
    [
      "usd-coin",
      "0x01",
      "wbnb",
      "0x38",
      "0x1234",
      {
        swapRoute: "",
        universalSwapType: "other-networks-to-furya"
      },
      false
    ],
    [
      "fanfury",
      "Furya",
      "usd-coin",
      "0x01",
      "0x1234",
      { swapRoute: "", universalSwapType: "furya-to-evm" },
      false
    ],
    [
      "kawaii-islands",
      "0x1ae6",
      "fanfury",
      "Furya",
      "furya1234",
      { swapRoute: "", universalSwapType: "other-networks-to-furya" },
      true
    ],
    [
      "kawaii-islands",
      "kawaii_6886-1",
      "fanfury",
      "Furya",
      "furya1234",
      { swapRoute: "", universalSwapType: "other-networks-to-furya" },
      true
    ],
    [
      "kawaii-islands",
      "0x38",
      "fanfury",
      "Furya",
      "furya1234",
      { swapRoute: "", universalSwapType: "other-networks-to-furya" },
      false
    ],
    [
      "milky-token",
      "0x38",
      "fanfury",
      "Furya",
      "furya1234",
      { swapRoute: "", universalSwapType: "other-networks-to-furya" },
      false
    ]
  ])(
    "test-getRoute-given %s coingecko id, chain id %s, send-to %s, chain id %s with receiver %s should have swapRoute %s",
    (fromCoingeckoId, fromChainId, toCoingeckoId, toChainId, receiver, swapRoute, willThrow) => {
      jest
        .spyOn(dexCommonHelper, "isEthAddress")
        .mockImplementation((address) => (address.includes("0x") ? true : false));
      const fromToken = flattenTokens.find(
        (item) => item.coinGeckoId === fromCoingeckoId && item.chainId === fromChainId
      )!;
      const toToken = flattenTokens.find((item) => item.coinGeckoId === toCoingeckoId && item.chainId === toChainId);
      try {
        const receiverAddress = getRoute(fromToken, toToken, receiver);
        expect(receiverAddress).toEqual(swapRoute);
        expect(willThrow).toEqual(false);
      } catch (error) {
        expect(willThrow).toEqual(true);
        expect(error).toEqual(new Error(`chain id ${fromToken.chainId} is currently not supported in universal swap`));
      }
    }
  );

  it.each<
    [
      CoinGeckoId,
      EvmChainId | CosmosChainId,
      CoinGeckoId,
      EvmChainId | CosmosChainId,
      string,
      string,
      SwapRoute,
      boolean
    ]
  >([
    [
      "cosmos",
      "cosmoshub-4",
      "cosmos",
      "Furya",
      "furya1ek2243955krr3enky8jq8y8vhh3p63y5wjzs4j",
      "furya1ek2243955krr3enky8jq8y8vhh3p63y5wjzs4j",
      {
        swapRoute: parseToIbcHookMemo(
          "furya1ek2243955krr3enky8jq8y8vhh3p63y5wjzs4j",
          "furya1ek2243955krr3enky8jq8y8vhh3p63y5wjzs4j",
          "",
          parseTokenInfoRawDenom(getTokenOnSpecificChainId("cosmos", "Furya") as TokenItemType)
        ),
        universalSwapType: "cosmos-to-others"
      },
      false
    ],
    [
      "cosmos",
      "cosmoshub-4",
      "fanfury",
      "Furya",
      "furya1ek2243955krr3enky8jq8y8vhh3p63y5wjzs4j",
      "furya1ek2243955krr3enky8jq8y8vhh3p63y5wjzs4j",
      {
        swapRoute: parseToIbcHookMemo(
          "furya1ek2243955krr3enky8jq8y8vhh3p63y5wjzs4j",
          "furya1ek2243955krr3enky8jq8y8vhh3p63y5wjzs4j",
          "",
          parseTokenInfoRawDenom(getTokenOnSpecificChainId("fanfury", "Furya") as TokenItemType)
        ),
        universalSwapType: "cosmos-to-others"
      },
      false
    ],
    [
      "cosmos",
      "cosmoshub-4",
      "tether",
      "0x01",
      "furya1ek2243955krr3enky8jq8y8vhh3p63y5wjzs4j",
      "0x09beeedf51aa45718f46837c94712d89b157a9d3",
      {
        swapRoute: parseToIbcHookMemo(
          "furya1ek2243955krr3enky8jq8y8vhh3p63y5wjzs4j",
          `${FURY_BRIDGE_EVM_ETH_DENOM_PREFIX}0x09beeedf51aa45718f46837c94712d89b157a9d3`,
          ibcInfos["Furya"]["0x01"]?.channel ?? "",
          `${FURY_BRIDGE_EVM_ETH_DENOM_PREFIX}${parseTokenInfoRawDenom(
            getTokenOnSpecificChainId("tether", "0x01") as TokenItemType
          )}`
        ),
        universalSwapType: "cosmos-to-others"
      },
      false
    ],
    [
      "cosmos",
      "cosmoshub-4",
      "tether",
      "0x38",
      "furya1ek2243955krr3enky8jq8y8vhh3p63y5wjzs4j",
      "0x09beeedf51aa45718f46837c94712d89b157a9d3",
      {
        swapRoute: parseToIbcHookMemo(
          "furya1ek2243955krr3enky8jq8y8vhh3p63y5wjzs4j",
          `${FURY_BRIDGE_EVM_DENOM_PREFIX}0x09beeedf51aa45718f46837c94712d89b157a9d3`,
          ibcInfos["Furya"]["0x38"]?.channel ?? "",
          `${FURY_BRIDGE_EVM_DENOM_PREFIX}${parseTokenInfoRawDenom(
            getTokenOnSpecificChainId("tether", "0x38") as TokenItemType
          )}`
        ),
        universalSwapType: "cosmos-to-others"
      },
      false
    ],
    [
      "cosmos",
      "cosmoshub-4",
      "tether",
      "0x2b6653dc",
      "furya1ek2243955krr3enky8jq8y8vhh3p63y5wjzs4j",
      "0x09beeedf51aa45718f46837c94712d89b157a9d3",
      {
        swapRoute: parseToIbcHookMemo(
          "furya1ek2243955krr3enky8jq8y8vhh3p63y5wjzs4j",
          `${FURY_BRIDGE_EVM_TRON_DENOM_PREFIX}0x09beeedf51aa45718f46837c94712d89b157a9d3`,
          ibcInfos["Furya"]["0x2b6653dc"]?.channel ?? "",
          `${FURY_BRIDGE_EVM_TRON_DENOM_PREFIX}${parseTokenInfoRawDenom(
            getTokenOnSpecificChainId("tether", "0x2b6653dc") as TokenItemType
          )}`
        ),
        universalSwapType: "cosmos-to-others"
      },
      false
    ],
    [
      "osmosis",
      "osmosis-1",
      "cosmos",
      "cosmoshub-4",
      "furya1ek2243955krr3enky8jq8y8vhh3p63y5wjzs4j",
      "furya1ek2243955krr3enky8jq8y8vhh3p63y5wjzs4j",
      {
        swapRoute: parseToIbcHookMemo(
          "furya1ek2243955krr3enky8jq8y8vhh3p63y5wjzs4j",
          "furya1ek2243955krr3enky8jq8y8vhh3p63y5wjzs4j",
          ibcInfos["Furya"]["cosmoshub-4"]?.channel as string,
          parseTokenInfoRawDenom(getTokenOnSpecificChainId("cosmos", "cosmoshub-4") as TokenItemType)
        ),
        universalSwapType: "cosmos-to-others"
      },
      false
    ],
    [
      "usd-coin",
      "noble-1",
      "cosmos",
      "cosmoshub-4",
      "furya1ek2243955krr3enky8jq8y8vhh3p63y5wjzs4j",
      "cosmos1ek2243955krr3enky8jq8y8vhh3p63y5wjzs4j",
      {
        swapRoute: parseToIbcWasmMemo(
          "cosmos1ek2243955krr3enky8jq8y8vhh3p63y5wjzs4j",
          ibcInfos["Furya"]["cosmoshub-4"]?.channel as string,
          parseTokenInfoRawDenom(getTokenOnSpecificChainId("cosmos", "cosmoshub-4") as TokenItemType)
        ),
        universalSwapType: "cosmos-to-others"
      },
      false
    ],
    [
      "usd-coin",
      "noble-1",
      "fanfury",
      "Furya",
      "furya1ek2243955krr3enky8jq8y8vhh3p63y5wjzs4j",
      "furya1ek2243955krr3enky8jq8y8vhh3p63y5wjzs4j",
      {
        swapRoute: parseToIbcWasmMemo(
          "furya1ek2243955krr3enky8jq8y8vhh3p63y5wjzs4j",
          "",
          parseTokenInfoRawDenom(getTokenOnSpecificChainId("fanfury", "Furya") as TokenItemType)
        ),
        universalSwapType: "cosmos-to-others"
      },
      false
    ]
  ])(
    "test-ibc-hooks-getRoute-given %s coingecko id, chain id %s, send-to %s, chain id %s with receiver %s should have swapRoute %s",
    (
      fromCoingeckoId,
      fromChainId,
      toCoingeckoId,
      toChainId,
      receiverOnFury,
      destinationReceiver,
      swapRoute,
      willThrow
    ) => {
      jest
        .spyOn(dexCommonHelper, "isEthAddress")
        .mockImplementation((address) => (address.includes("0x") ? true : false));

      const fromToken = flattenTokens.find(
        (item) => item.coinGeckoId === fromCoingeckoId && item.chainId === fromChainId
      )!;
      const toToken = flattenTokens.find((item) => item.coinGeckoId === toCoingeckoId && item.chainId === toChainId);
      try {
        const receiverAddress = getRoute(fromToken, toToken, destinationReceiver, receiverOnFury);
        expect(receiverAddress).toEqual(swapRoute);
        expect(willThrow).toEqual(false);
      } catch (error) {
        expect(willThrow).toEqual(true);
        expect(error).toEqual(new Error(`chain id ${fromToken.chainId} is currently not supported in universal swap`));
      }
    }
  );

  it("test-addFuryBridgeRoute-empty-swapRoute", () => {
    const result = addFuryBridgeRoute("receiver", "any" as any, "any" as any);
    expect(result.swapRoute).toEqual(`${furyb2furya}/receiver`);
  });
  it("test-addFuryBridgeRoute-empty-sourceReceiver", () => {
    expect(() => addFuryBridgeRoute("", "" as any, "" as any)).toThrow();
  });
  it("test-addFuryBridgeRoute-non-empty-swapRoute", () => {
    const result = addFuryBridgeRoute(
      "receiver",
      flattenTokens.find((item) => item.coinGeckoId === "airight" && item.chainId === "0x38")!,
      flattenTokens.find((item) => item.coinGeckoId === "fanfury" && item.chainId === "Furya")!,
      "foobar"
    );
    // expect(result.swapRoute).toEqual(`${furyb2furya}/receiver:foobar:fury`);
    const memo = parseToIbcWasmMemo("foobar", "", "fury");
    expect(result.swapRoute).toEqual(`${furyb2furya}/receiver:${memo}`);
  });

  it.each<[string, any]>([
    [
      "channel-1/furya1234:0x1234",
      {
        furyBridgeChannel: "channel-1",
        furyReceiver: "furya1234",
        finalDestinationChannel: "",
        finalReceiver: "0x1234",
        tokenIdentifier: ""
      }
    ],
    [
      "furya1234:0x1234",
      {
        furyBridgeChannel: "",
        furyReceiver: "furya1234",
        finalDestinationChannel: "",
        finalReceiver: "0x1234",
        tokenIdentifier: ""
      }
    ],
    [
      "furya1234",
      {
        furyBridgeChannel: "",
        furyReceiver: "furya1234",
        finalDestinationChannel: "",
        finalReceiver: "",
        tokenIdentifier: ""
      }
    ],
    [
      "furya1234:0x1234:atom",
      {
        furyBridgeChannel: "",
        furyReceiver: "furya1234",
        finalDestinationChannel: "",
        finalReceiver: "0x1234",
        tokenIdentifier: "atom"
      }
    ],
    [
      "furya1234:channel-29/0x1234:atom",
      {
        furyBridgeChannel: "",
        furyReceiver: "furya1234",
        finalDestinationChannel: "channel-29",
        finalReceiver: "0x1234",
        tokenIdentifier: "atom"
      }
    ],
    [
      "channel-1/furya1234:channel-29/0x1234:atom",
      {
        furyBridgeChannel: "channel-1",
        furyReceiver: "furya1234",
        finalDestinationChannel: "channel-29",
        finalReceiver: "0x1234",
        tokenIdentifier: "atom"
      }
    ]
  ])("test-unmarshalFuryBridgeRoute-%s", (destination, routeData) => {
    expect(universalHelper.unmarshalFuryBridgeRoute(destination)).toEqual(routeData);
  });

  it.each<[AssetInfo, AssetInfo, AssetInfo[], SwapOperation[]]>([
    [
      KUJIRA_INFO,
      FURY_INFO,
      [USDC_INFO],
      [
        {
          fury_swap: {
            offer_asset_info: KUJIRA_INFO,
            ask_asset_info: USDC_INFO
          }
        },
        {
          fury_swap: {
            offer_asset_info: USDC_INFO,
            ask_asset_info: FURY_INFO
          }
        }
      ]
    ],
    [
      FURY_INFO,
      KUJIRA_INFO,
      [USDC_INFO],
      [
        {
          fury_swap: {
            offer_asset_info: FURY_INFO,
            ask_asset_info: USDC_INFO
          }
        },
        {
          fury_swap: {
            offer_asset_info: USDC_INFO,
            ask_asset_info: KUJIRA_INFO
          }
        }
      ]
    ],
    [
      FURY_INFO,
      USDC_INFO,
      [],
      [
        {
          fury_swap: {
            offer_asset_info: FURY_INFO,
            ask_asset_info: USDC_INFO
          }
        }
      ]
    ],
    [
      FURYX_INFO,
      KUJIRA_INFO,
      [FURY_INFO, USDC_INFO],
      [
        {
          fury_swap: {
            offer_asset_info: FURYX_INFO,
            ask_asset_info: FURY_INFO
          }
        },
        {
          fury_swap: {
            offer_asset_info: FURY_INFO,
            ask_asset_info: USDC_INFO
          }
        },
        {
          fury_swap: {
            offer_asset_info: USDC_INFO,
            ask_asset_info: KUJIRA_INFO
          }
        }
      ]
    ],
    [
      KUJIRA_INFO,
      FURYX_INFO,
      [USDC_INFO, FURY_INFO],
      [
        {
          fury_swap: {
            offer_asset_info: KUJIRA_INFO,
            ask_asset_info: USDC_INFO
          }
        },
        {
          fury_swap: {
            offer_asset_info: USDC_INFO,
            ask_asset_info: FURY_INFO
          }
        },
        {
          fury_swap: {
            offer_asset_info: FURY_INFO,
            ask_asset_info: FURYX_INFO
          }
        }
      ]
    ]
  ])("test-generateSwapRoute", (offerAsset, askAsset, swapRoute, expectSwapRoute) => {
    const getSwapRoute: SwapOperation[] = generateSwapRoute(offerAsset, askAsset, swapRoute);
    expect(getSwapRoute).toEqual(expect.arrayContaining(expectSwapRoute));
    getSwapRoute.forEach((swap) => {
      expect(swap).toMatchObject({
        fury_swap: expect.objectContaining({
          offer_asset_info: expect.any(Object),
          ask_asset_info: expect.any(Object)
        })
      });
    });
  });

  it.each<[AssetInfo, AssetInfo, SwapOperation[]]>([
    [
      FURYX_INFO,
      KUJIRA_INFO,
      [
        {
          fury_swap: {
            offer_asset_info: FURYX_INFO,
            ask_asset_info: FURY_INFO
          }
        },
        {
          fury_swap: {
            offer_asset_info: FURY_INFO,
            ask_asset_info: USDC_INFO
          }
        },
        {
          fury_swap: {
            offer_asset_info: USDC_INFO,
            ask_asset_info: KUJIRA_INFO
          }
        }
      ]
    ],
    [
      KUJIRA_INFO,
      FURYX_INFO,
      [
        {
          fury_swap: {
            offer_asset_info: KUJIRA_INFO,
            ask_asset_info: USDC_INFO
          }
        },
        {
          fury_swap: {
            offer_asset_info: USDC_INFO,
            ask_asset_info: FURY_INFO
          }
        },
        {
          fury_swap: {
            offer_asset_info: FURY_INFO,
            ask_asset_info: FURYX_INFO
          }
        }
      ]
    ]
  ])("test-generateSwapOperationMsgs", (offerAsset, askAsset, expectSwapRoute) => {
    const getSwapOperationMsgsRoute = generateSwapOperationMsgs(offerAsset, askAsset);
    expect(getSwapOperationMsgsRoute).toEqual(expect.arrayContaining(expectSwapRoute));
    getSwapOperationMsgsRoute.forEach((swap) => {
      expect(swap).toMatchObject({
        fury_swap: expect.objectContaining({
          offer_asset_info: expect.any(Object),
          ask_asset_info: expect.any(Object)
        })
      });
    });
  });

  it.each<[AmountDetails, TokenItemType, Coin, number]>([
    [
      {
        injective: "10000"
      },
      getTokenOnFurya("injective-protocol"),
      coin(1000, INJECTIVE_FURYA_DENOM),
      1
    ],
    [
      {
        [INJECTIVE_FURYA_DENOM]: "1000",
        injective: "10000"
      },
      getTokenOnFurya("injective-protocol"),
      coin(1000, INJECTIVE_FURYA_DENOM),
      0
    ],
    [{}, getTokenOnFurya("injective-protocol"), coin(1000, INJECTIVE_FURYA_DENOM), 0]
  ])("test-generate-convert-msgs", async (currentBal: AmountDetails, tokenInfo, toSend, msgLength) => {
    const msg = universalHelper.generateConvertCw20Erc20Message(currentBal, tokenInfo, "furya123", toSend);
    console.dir(msg, { depth: null });
    expect(msg.length).toEqual(msgLength);
  });

  it.each<[AmountDetails, TokenItemType, number]>([
    [{}, getTokenOnFurya("cosmos"), 0],
    [{ [`${INJECTIVE_FURYA_DENOM}`]: "10" }, getTokenOnFurya("injective-protocol"), 1],
    [{ injective: "10" }, getTokenOnFurya("injective-protocol"), 0]
  ])(
    "test-generateConvertErc20Cw20Message-should-return-correct-message-length",
    (amountDetails, tokenInfo, expectedMessageLength) => {
      const result = universalHelper.generateConvertErc20Cw20Message(amountDetails, tokenInfo, "john doe");
      expect(result.length).toEqual(expectedMessageLength);
    }
  );

  it.each<[AssetInfo, AssetInfo, any[], SwapOperation[]]>([
    [
      FURYX_INFO,
      KUJIRA_INFO,
      [
        { poolId: "1", tokenOut: FURY },
        { poolId: "2", tokenOut: USDC_CONTRACT },
        { poolId: "1", tokenOut: KUJIRA_FURYA_DENOM }
      ],
      [
        {
          fury_swap: {
            offer_asset_info: FURYX_INFO,
            ask_asset_info: FURY_INFO
          }
        },
        {
          fury_swap: {
            offer_asset_info: FURY_INFO,
            ask_asset_info: USDC_INFO
          }
        },
        {
          fury_swap: {
            offer_asset_info: USDC_INFO,
            ask_asset_info: KUJIRA_INFO
          }
        }
      ]
    ],
    [
      KUJIRA_INFO,
      FURYX_INFO,
      [
        { poolId: "3", tokenOut: USDC_CONTRACT },
        { poolId: "2", tokenOut: FURY },
        { poolId: "1", tokenOut: FURYX_CONTRACT }
      ],
      [
        {
          fury_swap: {
            offer_asset_info: KUJIRA_INFO,
            ask_asset_info: USDC_INFO
          }
        },
        {
          fury_swap: {
            offer_asset_info: USDC_INFO,
            ask_asset_info: FURY_INFO
          }
        },
        {
          fury_swap: {
            offer_asset_info: FURY_INFO,
            ask_asset_info: FURYX_INFO
          }
        }
      ]
    ]
  ])("test-generateSmartRouteForSwap", async (offerAsset, askAsset, paths, expectSwapRoute) => {
    jest.spyOn(UniversalSwapHelper, "querySmartRoute").mockResolvedValue({
      swapAmount: "1",
      returnAmount: "1",
      routes: [{ swapAmount: "1", returnAmount: "1", paths: paths }]
    });
    const res = await UniversalSwapHelper.generateSmartRouteForSwap(
      offerAsset,
      "Furya",
      askAsset,
      "Furya",
      "1"
    );
    let getSwapOperationMsgsRoute = res.routes[0].swapOps;
    expect(getSwapOperationMsgsRoute).toEqual(expect.arrayContaining(expectSwapRoute));
    getSwapOperationMsgsRoute.forEach((swap) => {
      expect(swap).toMatchObject({
        fury_swap: expect.objectContaining({
          offer_asset_info: expect.any(Object),
          ask_asset_info: expect.any(Object)
        })
      });
    });
  });
});
