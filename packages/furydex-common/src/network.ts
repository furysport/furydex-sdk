import { Bech32Config, ChainInfo, Currency, FeeCurrency } from "@keplr-wallet/types";
import {
  AIRI_BSC_CONTRACT,
  AIRI_CONTRACT,
  ATOM_FURYA_DENOM,
  CONVERTER_CONTRACT,
  FACTORY_CONTRACT,
  FACTORY_V2_CONTRACT,
  INJECTIVE_CONTRACT,
  INJECTIVE_FURYA_DENOM,
  KWTBSC_FURYA_DENOM,
  KWT_BSC_CONTRACT,
  KWT_CONTRACT,
  KWT_DENOM,
  KWT_SUB_NETWORK_DENOM,
  MILKYBSC_FURYA_DENOM,
  MILKY_BSC_CONTRACT,
  MILKY_CONTRACT,
  MILKY_DENOM,
  MILKY_ERC_CONTRACT,
  MILKY_SUB_NETWORK_DENOM,
  MULTICALL_CONTRACT,
  ORACLE_CONTRACT,
  FURYDEX_LISTING_CONTRACT,
  FURYIBC_INJECTIVE_DENOM,
  FURYX_CONTRACT,
  FURY_BRIDGE_EVM_DENOM_PREFIX,
  FURY_BRIDGE_EVM_ETH_DENOM_PREFIX,
  FURY_BRIDGE_EVM_TRON_DENOM_PREFIX,
  FURY_BSC_CONTRACT,
  FURY_ETH_CONTRACT,
  OSMOSIS_FURYA_DENOM,
  REWARDER_CONTRACT,
  ROUTER_V2_CONTRACT,
  SCATOM_CONTRACT,
  SCFURY_CONTRACT,
  STAKING_CONTRACT,
  TRX_CONTRACT,
  USDC_CONTRACT,
  USDC_ETH_CONTRACT,
  USDT_BSC_CONTRACT,
  USDT_CONTRACT,
  USDT_TRON_CONTRACT,
  WETH_CONTRACT,
  WRAP_BNB_CONTRACT,
  WRAP_ETH_CONTRACT,
  WRAP_TRON_TRX_CONTRACT,
  USDT_ETH_CONTRACT,
  BTC_CONTRACT,
  NEUTARO_FURYA_DENOM,
  OCH_ETH_CONTRACT,
  OCH_CONTRACT,
  FURYDEX_BID_POOL_CONTRACT,
  FURYX_ETH_CONTRACT
} from "./constant";

export type NetworkName =
  | "furya-1"
  | "Cosmos Hub"
  | "Osmosis"
  | "FuryBridge"
  | "BNB Chain"
  | "Ethereum"
  | "Kawaiiverse"
  | "Kawaiiverse EVM"
  | "Tron Network"
  | "Injective"
  | "Noble"
  | "Neutaro";

export type CosmosChainId =
  | "furya-1" // furya
  | "furybridge-subnet-2" // furybridge
  | "osmosis-1" // osmosis
  | "cosmoshub-4" // cosmos hub
  | "injective-1" // injective network
  | "kawaii_6886-1" // kawaii subnetwork
  | "noble-1" // noble network
  | "Neutaro-1"; //neutaro network;

export type EvmChainId =
  | "0x38" // bsc
  | "0x01" // ethereum
  | "0x1ae6" // kawaii
  | "0x2b6653dc"; // tron

export type NetworkChainId = CosmosChainId | EvmChainId;

export type CoinGeckoId =
  | "fanfury"
  | "osmosis"
  | "cosmos"
  | "ethereum"
  | "binancecoin"
  | "airight"
  | "furydex"
  | "tether"
  | "kawaii-islands"
  | "milky-token"
  | "scfury"
  | "furydex"
  | "usd-coin"
  | "tron"
  | "weth"
  | "wbnb"
  | "scatom"
  | "injective-protocol"
  | "bitcoin"
  | "neutaro"
  | "och";

export type NetworkType = "cosmos" | "evm";
export interface NetworkConfig {
  coinType?: number;
  explorer: string;
  /** Fixed fee */
  fee: { gasPrice: string; amount: string; gas: string };
  factory: string;
  factory_v2: string;
  oracle: string;
  staking: string;
  router: string;
  denom: string;
  prefix: string;
  rewarder: string;
  converter: string;
  furydex_listing: string;
  bid_pool: string;
  multicall: string;
}

export type CoinIcon = any;
export type BridgeAppCurrency = FeeCurrency & {
  readonly bridgeTo?: NetworkChainId[];
  readonly coinGeckoId?: CoinGeckoId;
  readonly Icon?: CoinIcon;
  readonly IconLight?: CoinIcon;
  readonly bridgeNetworkIdentifier?: EvmChainId;
  readonly coinDecimals: 6 | 18;
  readonly contractAddress?: string;
  readonly prefixToken?: string;
};

export type CoinType = 118 | 60 | 195;

/**
 * A list of Cosmos chain infos. If we need to add / remove any chains, just directly update this variable.
 * some chain is already in wallet so we override some attributes as optional
 */
export interface CustomChainInfo
  extends Omit<ChainInfo, "feeCurrencies" | "stakeCurrency" | "currencies" | "rest" | "bech32Config"> {
  readonly chainId: NetworkChainId;
  readonly chainName: NetworkName;
  readonly Icon?: CoinIcon;
  readonly IconLight?: CoinIcon;
  readonly networkType: NetworkType;
  readonly bip44: {
    coinType: CoinType;
  };
  readonly bech32Config?: Bech32Config;
  readonly rest?: string; // optional, rest api tron and lcd for cosmos
  readonly stakeCurrency?: Currency;
  readonly feeCurrencies?: FeeCurrency[];
  readonly currencies: BridgeAppCurrency[];
  readonly hideInUI?: boolean;
  readonly txExplorer?: {
    readonly name: string;
    readonly txUrl: string;
    readonly accountUrl?: string;
  };
}

export const defaultBech32Config = (
  mainPrefix: string,
  validatorPrefix = "val",
  consensusPrefix = "cons",
  publicPrefix = "pub",
  operatorPrefix = "oper"
) => {
  return {
    bech32PrefixAccAddr: mainPrefix,
    bech32PrefixAccPub: mainPrefix + publicPrefix,
    bech32PrefixValAddr: mainPrefix + validatorPrefix + operatorPrefix,
    bech32PrefixValPub: mainPrefix + validatorPrefix + operatorPrefix + publicPrefix,
    bech32PrefixConsAddr: mainPrefix + validatorPrefix + consensusPrefix,
    bech32PrefixConsPub: mainPrefix + validatorPrefix + consensusPrefix + publicPrefix
  };
};

export const FuryToken: BridgeAppCurrency = {
  coinDenom: "FURY",
  coinMinimalDenom: "ufury",
  coinDecimals: 6,
  coinGeckoId: "fanfury",
  bridgeTo: ["0x38", "0x01", "injective-1"],
  coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/7533.png",
  gasPriceStep: {
    low: 0.003,
    average: 0.005,
    high: 0.007
  }
};

export const FuryBToken: BridgeAppCurrency = {
  coinDenom: "FURYB",
  coinMinimalDenom: "ufuryb",
  coinDecimals: 6,
  gasPriceStep: {
    low: 0,
    average: 0,
    high: 0
  }
};

export const KawaiiToken: BridgeAppCurrency = {
  coinDenom: "FURYE",
  coinMinimalDenom: "furye",
  coinDecimals: 18,
  coinGeckoId: "kawaii-islands",
  gasPriceStep: {
    low: 0,
    average: 0.000025,
    high: 0.00004
  }
};

export const InjectiveToken: BridgeAppCurrency = {
  coinDenom: "INJ",
  coinMinimalDenom: "inj",
  coinDecimals: 18,
  coinGeckoId: "injective-protocol",
  gasPriceStep: {
    low: 5000000000,
    average: 25000000000,
    high: 50000000000
  }
};

export const AtomToken: BridgeAppCurrency = {
  coinDenom: "ATOM",
  coinMinimalDenom: "uatom",
  coinDecimals: 6,
  coinGeckoId: "cosmos",
  coinImageUrl: "https://dhj8dql1kzq2v.cloudfront.net/white/atom.png",
  gasPriceStep: {
    low: 0,
    average: 0.025,
    high: 0.04
  }
};

export const NeutaroToken: BridgeAppCurrency = {
  coinDenom: "NTMPI",
  coinMinimalDenom: "uneutaro",
  coinDecimals: 6,
  coinGeckoId: "neutaro",
  coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/Neutaro/chain.png",
  gasPriceStep: {
    low: 0.01,
    average: 0.025,
    high: 0.03
  }
};

export const NativeUsdcNobleToken: BridgeAppCurrency = {
  coinDenom: "USDC",
  coinMinimalDenom: "uusdc",
  coinDecimals: 6,
  coinGeckoId: "usd-coin",
  coinImageUrl: "https://raw.githubusercontent.com/cosmos/chain-registry/master/noble/images/USDCoin.png",
  gasPriceStep: {
    low: 0,
    average: 0.025,
    high: 0.03
  }
};

export const OsmoToken: BridgeAppCurrency = {
  coinDenom: "OSMO",
  coinMinimalDenom: "uosmo",
  coinDecimals: 6,
  coinGeckoId: "osmosis",
  coinImageUrl: "https://dhj8dql1kzq2v.cloudfront.net/white/osmo.png",
  gasPriceStep: {
    low: 0,
    average: 0.025,
    high: 0.04
  }
};

export const furyaNetwork: CustomChainInfo = {
  rpc: "https://rpc.furya.xyz",
  rest: "https://lcd.furya.xyz",
  chainId: "furya-1",
  chainName: "furya-1",
  networkType: "cosmos",
  stakeCurrency: FuryToken,
  feeCurrencies: [FuryToken],
  bip44: {
    coinType: 118
  },
  bech32Config: defaultBech32Config("furya"),

  features: ["stargate", "ibc-transfer", "cosmwasm", "wasmd_0.24+", "no-legacy-stdTx"],
  txExplorer: {
    name: "Furyscan",
    txUrl: "https://scan.furya.xyz/txs/{txHash}",
    accountUrl: "https://scan.furya.xyz/account/{address}"
  },
  currencies: [
    FuryToken,
    {
      coinDenom: "ATOM",
      coinGeckoId: "cosmos",
      coinMinimalDenom: ATOM_FURYA_DENOM,
      bridgeTo: ["cosmoshub-4"],
      coinDecimals: 6,
      coinImageUrl: "https://dhj8dql1kzq2v.cloudfront.net/white/atom.png"
    },
    {
      coinDenom: "NTMPI",
      coinGeckoId: "neutaro",
      coinMinimalDenom: NEUTARO_FURYA_DENOM,
      bridgeTo: ["Neutaro-1"],
      coinDecimals: 6,
      coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/Neutaro/chain.png"
    },
    // {
    //   coinDenom: 'BEP20 AIRI',
    //   coinGeckoId: 'airight',
    //   coinMinimalDenom: AIRIBSC_FURYA_DENOM,
    //   coinDecimals: 18,
    //   Icon: AiriIcon
    // },
    {
      coinDenom: "AIRI",
      coinGeckoId: "airight",
      coinMinimalDenom: "airi",
      type: "cw20",
      contractAddress: AIRI_CONTRACT,
      bridgeTo: ["0x38"],
      coinDecimals: 6,
      coinImageUrl: "https://i.ibb.co/m8mCyMr/airi.png"
    },
    {
      coinDenom: "USDT",
      coinGeckoId: "tether",
      coinMinimalDenom: "usdt",
      type: "cw20",
      contractAddress: USDT_CONTRACT,
      bridgeTo: ["0x38", "0x2b6653dc", "0x01"],
      coinDecimals: 6,
      coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
    },
    {
      coinDenom: "USDC",
      coinGeckoId: "usd-coin",
      coinMinimalDenom: "usdc",
      type: "cw20",
      contractAddress: USDC_CONTRACT,
      bridgeTo: ["0x01", "noble-1"],
      coinDecimals: 6,
      coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
    },
    {
      coinDenom: "OSMO",
      coinMinimalDenom: OSMOSIS_FURYA_DENOM,
      coinDecimals: 6,
      coinGeckoId: "osmosis",
      bridgeTo: ["osmosis-1"],
      coinImageUrl: "https://dhj8dql1kzq2v.cloudfront.net/white/osmo.png"
    },
    {
      coinDenom: "BEP20 KWT",
      coinGeckoId: "kawaii-islands",
      coinMinimalDenom: KWTBSC_FURYA_DENOM,
      coinDecimals: 18,
      coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/12313.png"
    },
    {
      coinDenom: "KWT",
      coinGeckoId: "kawaii-islands",
      coinMinimalDenom: "kwt",
      type: "cw20",
      contractAddress: KWT_CONTRACT,
      bridgeTo: ["kawaii_6886-1", "0x38"],
      coinDecimals: 6,
      coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/12313.png"
    },
    {
      coinDenom: "BEP20 MILKY",
      coinGeckoId: "milky-token",
      coinMinimalDenom: MILKYBSC_FURYA_DENOM,
      coinDecimals: 18,
      coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/14418.png"
    },
    {
      coinDenom: "MILKY",
      coinGeckoId: "milky-token",
      coinMinimalDenom: "milky",
      type: "cw20",
      contractAddress: MILKY_CONTRACT,
      bridgeTo: ["kawaii_6886-1", "0x38"],
      coinDecimals: 6,
      coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/14418.png"
    },
    {
      coinDenom: "FURYX",
      coinMinimalDenom: "furyx",
      type: "cw20",
      contractAddress: FURYX_CONTRACT,
      bridgeTo: ["0x01"],
      coinGeckoId: "furydex",
      coinDecimals: 6,
      coinImageUrl: "https://i.ibb.co/VmMJtf7/furyx.png"
    },
    {
      coinDenom: "scFURY",
      coinMinimalDenom: "scfury",
      type: "cw20",
      contractAddress: SCFURY_CONTRACT,
      coinGeckoId: "scfury",
      coinDecimals: 6
    },
    {
      coinDenom: "wTRX",
      coinGeckoId: "tron",
      coinMinimalDenom: "trx",
      type: "cw20",
      contractAddress: TRX_CONTRACT,
      bridgeTo: ["0x2b6653dc"],
      coinDecimals: 6,
      coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png"
    },
    {
      coinDenom: "scATOM",
      coinMinimalDenom: "scatom",
      type: "cw20",
      contractAddress: SCATOM_CONTRACT,
      coinGeckoId: "scatom",
      coinDecimals: 6
    },
    {
      coinDenom: "IBC INJ",
      coinGeckoId: "injective-protocol",
      coinMinimalDenom: INJECTIVE_FURYA_DENOM,
      coinDecimals: 18,
      coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/7226.png"
    },
    {
      coinDenom: "INJ",
      coinGeckoId: "injective-protocol",
      coinMinimalDenom: "injective",
      contractAddress: INJECTIVE_CONTRACT,
      bridgeTo: ["injective-1"],
      type: "cw20",
      coinDecimals: 6,
      coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/7226.png"
    },
    {
      coinDenom: "WETH",
      coinGeckoId: "weth",
      coinMinimalDenom: "weth",
      type: "cw20",
      contractAddress: WETH_CONTRACT,
      bridgeTo: ["0x01"],
      coinDecimals: 6,
      coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
    },
    {
      coinDenom: "BTC",
      coinGeckoId: "bitcoin",
      coinMinimalDenom: "usat",
      type: "cw20",
      contractAddress: BTC_CONTRACT,
      // bridgeTo: ["bitcoinTestnet"],
      coinDecimals: 6,
      coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
    },
    {
      coinDenom: "OCH",
      coinGeckoId: "och",
      coinMinimalDenom: "och",
      type: "cw20",
      contractAddress: OCH_CONTRACT,
      bridgeTo: ["0x01"],
      coinDecimals: 6,
      coinImageUrl:
        "https://assets.coingecko.com/coins/images/34236/standard/orchai_logo_white_copy_4x-8_%281%29.png?1704307670"
    }
  ]
};

export const chainInfos: CustomChainInfo[] = [
  // networks to add on keplr
  furyaNetwork,
  {
    rpc: "https://bridge-v2.rpc.furya.xyz",
    rest: "https://bridge-v2.lcd.furya.xyz",
    chainId: "furybridge-subnet-2",
    chainName: "FuryBridge",
    networkType: "cosmos",
    bip44: {
      coinType: 118
    },
    bech32Config: defaultBech32Config("furyab"),
    features: ["stargate", "ibc-transfer", "no-legacy-stdTx"],
    stakeCurrency: FuryBToken,
    feeCurrencies: [FuryBToken],
    // not use furyb as currency
    currencies: [
      FuryBToken,
      {
        coinDenom: "FURY",
        coinMinimalDenom: FURY_BRIDGE_EVM_DENOM_PREFIX + FURY_BSC_CONTRACT,
        bridgeNetworkIdentifier: "0x38",
        coinDecimals: 18,
        coinGeckoId: "fanfury",
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/7533.png"
      },
      {
        coinDenom: "FURY",
        coinMinimalDenom: FURY_BRIDGE_EVM_ETH_DENOM_PREFIX + FURY_ETH_CONTRACT,
        bridgeNetworkIdentifier: "0x01",
        coinDecimals: 18,
        coinGeckoId: "fanfury",
        prefixToken: FURY_BRIDGE_EVM_ETH_DENOM_PREFIX,
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/7533.png"
      },
      {
        coinDenom: "USDC",
        coinMinimalDenom: FURY_BRIDGE_EVM_ETH_DENOM_PREFIX + USDC_ETH_CONTRACT,
        bridgeNetworkIdentifier: "0x01",
        coinDecimals: 6,
        coinGeckoId: "usd-coin",
        prefixToken: FURY_BRIDGE_EVM_ETH_DENOM_PREFIX,
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
      },
      {
        coinDenom: "AIRI",
        coinMinimalDenom: FURY_BRIDGE_EVM_DENOM_PREFIX + AIRI_BSC_CONTRACT,
        bridgeNetworkIdentifier: "0x38",
        coinDecimals: 18,
        coinGeckoId: "airight",
        coinImageUrl: "https://i.ibb.co/m8mCyMr/airi.png"
      },
      {
        coinDenom: "USDT",
        coinMinimalDenom: FURY_BRIDGE_EVM_DENOM_PREFIX + USDT_BSC_CONTRACT,
        bridgeNetworkIdentifier: "0x38",
        coinDecimals: 18,
        coinGeckoId: "tether",
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
      },
      {
        coinDenom: "USDT",
        coinMinimalDenom: FURY_BRIDGE_EVM_TRON_DENOM_PREFIX + USDT_TRON_CONTRACT,
        bridgeNetworkIdentifier: "0x2b6653dc",
        prefixToken: FURY_BRIDGE_EVM_TRON_DENOM_PREFIX,
        coinDecimals: 6,
        coinGeckoId: "tether",
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
      },
      {
        coinDenom: "wTRX",
        coinMinimalDenom: FURY_BRIDGE_EVM_TRON_DENOM_PREFIX + WRAP_TRON_TRX_CONTRACT,
        bridgeNetworkIdentifier: "0x2b6653dc",
        coinDecimals: 6,
        coinGeckoId: "tron",
        prefixToken: FURY_BRIDGE_EVM_TRON_DENOM_PREFIX,
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png"
      },
      {
        coinDenom: "KWT",
        bridgeNetworkIdentifier: "0x38",
        coinMinimalDenom: KWT_DENOM,
        coinDecimals: 18,
        coinGeckoId: "kawaii-islands",
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/12313.png"
      },
      {
        coinDenom: "MILKY",
        bridgeNetworkIdentifier: "0x38",
        coinMinimalDenom: MILKY_DENOM,
        coinDecimals: 18,
        coinGeckoId: "milky-token",
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/14418.png"
      },
      {
        coinDenom: "WETH",
        coinMinimalDenom: FURY_BRIDGE_EVM_ETH_DENOM_PREFIX + WRAP_ETH_CONTRACT,
        bridgeNetworkIdentifier: "0x01",
        coinDecimals: 18,
        coinGeckoId: "weth",
        prefixToken: FURY_BRIDGE_EVM_ETH_DENOM_PREFIX,
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
      },
      {
        coinDenom: "USDT",
        coinMinimalDenom: FURY_BRIDGE_EVM_ETH_DENOM_PREFIX + USDT_ETH_CONTRACT,
        bridgeNetworkIdentifier: "0x01",
        coinDecimals: 6,
        coinGeckoId: "tether",
        prefixToken: FURY_BRIDGE_EVM_ETH_DENOM_PREFIX,
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
      },
      {
        coinDenom: "OCH",
        coinMinimalDenom: FURY_BRIDGE_EVM_ETH_DENOM_PREFIX + OCH_ETH_CONTRACT,
        bridgeNetworkIdentifier: "0x01",
        coinDecimals: 18,
        coinGeckoId: "och",
        prefixToken: FURY_BRIDGE_EVM_ETH_DENOM_PREFIX,
        coinImageUrl:
          "https://assets.coingecko.com/coins/images/34236/standard/orchai_logo_white_copy_4x-8_%281%29.png?1704307670"
      },
      {
        coinDenom: "FURYX",
        coinMinimalDenom: FURY_BRIDGE_EVM_ETH_DENOM_PREFIX + FURYX_ETH_CONTRACT,
        bridgeNetworkIdentifier: "0x01",
        coinDecimals: 18,
        coinGeckoId: "furydex",
        prefixToken: FURY_BRIDGE_EVM_ETH_DENOM_PREFIX,
        coinImageUrl: "https://i.ibb.co/VmMJtf7/furyx.png"
      }
    ],
    txExplorer: {
      name: "FuryBridge Scan",
      txUrl: "https://scan.bridge.furya.xyz/tx/${txHash}",
      accountUrl: "https://scan.bridge.furya.xyz/account/{address}"
    }
  },
  {
    rpc: "https://tendermint1.kawaii.global",
    rest: "https://cosmos1.kawaii.global",
    chainId: "kawaii_6886-1",
    chainName: "Kawaiiverse",
    networkType: "cosmos",
    stakeCurrency: KawaiiToken,
    feeCurrencies: [KawaiiToken],
    bip44: {
      coinType: 60
    },
    bech32Config: defaultBech32Config("furyae"),

    // features: ['ibc-transfer'],
    features: ["ibc-transfer", "ibc-go", "stargate", "eth-address-gen", "eth-key-sign", "isEvm", "no-legacy-stdTx"],
    currencies: [
      KawaiiToken,
      {
        coinDenom: "MILKY",
        coinGeckoId: "milky-token",
        coinMinimalDenom: MILKY_SUB_NETWORK_DENOM,
        coinDecimals: 18,
        bridgeTo: ["furya-1", "kawaii_6886-1"],
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/14418.png"
      },
      {
        coinDenom: "ERC20 MILKY",
        coinMinimalDenom: "erc20_milky",
        bridgeTo: ["furya-1", "kawaii_6886-1"],
        contractAddress: MILKY_ERC_CONTRACT,
        coinDecimals: 18,
        coinGeckoId: "milky-token",
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/14418.png"
      },
      {
        coinDenom: "KWT",
        coinMinimalDenom: KWT_SUB_NETWORK_DENOM,
        coinDecimals: 18,
        bridgeTo: ["furya-1", "kawaii_6886-1"],
        coinGeckoId: "kawaii-islands",
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/12313.png"
      },
      {
        coinDenom: "ERC20 KWT",
        bridgeTo: ["furya-1", "kawaii_6886-1"],
        coinMinimalDenom: "erc20_kwt",
        contractAddress: "0x80b5a32E4F032B2a058b4F29EC95EEfEEB87aDcd",
        coinDecimals: 18,
        coinGeckoId: "kawaii-islands",
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/12313.png"
      }
    ],
    txExplorer: {
      name: "Kawaiiverse Scan",
      txUrl: "https://scan.kawaii.global/tx/${txHash}",
      accountUrl: "https://scan.kawaii.global/account/{address}"
    }
  },

  /// popular networks already included
  {
    rpc: "https://osmosis.rpc.furya.xyz/",
    rest: "https://osmosis.lcd.furya.xyz/",
    chainId: "osmosis-1",
    chainName: "Osmosis",
    networkType: "cosmos",
    bip44: {
      coinType: 118
    },
    bech32Config: defaultBech32Config("osmo"),
    features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go", "cosmwasm"],
    stakeCurrency: OsmoToken,
    feeCurrencies: [OsmoToken],
    currencies: [
      {
        ...OsmoToken,
        bridgeTo: ["furya-1"]
      }
    ]
  },
  /// popular networks already included
  {
    rpc: "https://rpc.cosmos.directory/injective",
    rest: "https://rest.cosmos.directory/injective",
    chainId: "injective-1",
    chainName: "Injective",
    networkType: "cosmos",
    bip44: {
      coinType: 60
    },
    bech32Config: defaultBech32Config("inj"),
    features: ["stargate", "no-legacy-stdTx", "ibc-transfer", "ibc-go"],
    stakeCurrency: InjectiveToken,
    feeCurrencies: [InjectiveToken],
    currencies: [
      {
        ...InjectiveToken,
        bridgeTo: ["furya-1"]
      },
      {
        coinDenom: "FURY",
        coinMinimalDenom: FURYIBC_INJECTIVE_DENOM,
        coinDecimals: 6,
        coinGeckoId: "fanfury",
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/7533.png",
        bridgeTo: ["furya-1"]
      }
    ],
    txExplorer: {
      name: "Injective Scan",
      txUrl: "https://explorer.injective.network/transaction/{txHash}"
    },
    beta: true
  },
  {
    rpc: "https://rpc.cosmos.directory/cosmoshub",
    rest: "https://rest.cosmos.directory/cosmoshub",
    chainId: "cosmoshub-4",
    chainName: "Cosmos Hub",
    networkType: "cosmos",
    bip44: {
      coinType: 118
    },
    bech32Config: defaultBech32Config("cosmos"),
    features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
    currencies: [
      {
        ...AtomToken,
        bridgeTo: ["furya-1"]
      }
    ],
    feeCurrencies: [AtomToken],
    stakeCurrency: AtomToken,
    chainSymbolImageUrl: "https://dhj8dql1kzq2v.cloudfront.net/white/atom.png",
    txExplorer: {
      name: "Mintscan",
      txUrl: "https://www.mintscan.io/cosmos/txs/{txHash}"
    }
  },
  {
    // rpc: 'http://rpc.neutaro.tech:26657/',
    rpc: "https://neutaro.rpc.furya.xyz",
    rest: "https://neutaro.lcd.furya.xyz",
    // rest: "http://api.neutaro.tech:1317/",
    chainId: "Neutaro-1",
    chainName: "Neutaro",
    networkType: "cosmos",
    bip44: {
      coinType: 118
    },
    bech32Config: defaultBech32Config("neutaro"),
    stakeCurrency: {
      coinDenom: "ntmpi",
      coinMinimalDenom: "uneutaro",
      coinDecimals: 6,
      coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/Neutaro/chain.png"
    },
    feeCurrencies: [
      {
        coinDenom: "ntmpi",
        coinMinimalDenom: "uneutaro",
        coinDecimals: 6,
        coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/Neutaro/chain.png",
        gasPriceStep: {
          low: 0.01,
          average: 0.025,
          high: 0.03
        }
      }
    ],
    currencies: [
      {
        ...NeutaroToken,
        bridgeTo: ["furya-1"]
      }
    ]
  },
  {
    rpc: "https://rpc.cosmos.directory/noble",
    rest: "https://rest.cosmos.directory/noble",
    chainId: "noble-1",
    chainName: "Noble",
    networkType: "cosmos",
    bip44: {
      coinType: 118
    },
    bech32Config: defaultBech32Config("noble"),
    features: ["stargate", "ibc-transfer", "no-legacy-stdTx", "ibc-go"],
    currencies: [
      {
        ...NativeUsdcNobleToken,
        bridgeTo: ["furya-1"]
      }
    ],
    feeCurrencies: [NativeUsdcNobleToken],
    stakeCurrency: {
      coinDecimals: 6,
      coinDenom: "STAKE",
      coinMinimalDenom: "ustake",
      coinImageUrl: "https://raw.githubusercontent.com/cosmos/chain-registry/master/noble/images/stake.png"
    },
    chainSymbolImageUrl: "https://raw.githubusercontent.com/cosmos/chain-registry/master/noble/images/stake.png",
    txExplorer: {
      name: "Mintscan",
      txUrl: "https://www.mintscan.io/noble/txs/{txHash}"
    }
  },

  /// evm chain info
  {
    rpc: "https://rpc.ankr.com/eth",
    chainId: "0x01",
    chainName: "Ethereum",
    bip44: {
      coinType: 60
    },
    networkType: "evm",
    features: ["isEvm"],
    currencies: [
      {
        coinDenom: "FURY",
        coinMinimalDenom: "erc20_fury",
        contractAddress: FURY_ETH_CONTRACT,
        coinDecimals: 18,
        bridgeTo: ["furya-1"],
        coinGeckoId: "fanfury",
        prefixToken: FURY_BRIDGE_EVM_ETH_DENOM_PREFIX,
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/7533.png"
      },
      {
        coinDenom: "USDC",
        coinMinimalDenom: "erc20_usdc",
        contractAddress: USDC_ETH_CONTRACT,
        coinDecimals: 6,
        bridgeTo: ["furya-1"],
        coinGeckoId: "usd-coin",
        prefixToken: FURY_BRIDGE_EVM_ETH_DENOM_PREFIX,
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
      },
      {
        coinDenom: "WETH",
        coinMinimalDenom: "erc20_eth",
        contractAddress: WRAP_ETH_CONTRACT,
        coinDecimals: 18,
        bridgeTo: ["furya-1"],
        coinGeckoId: "weth",
        prefixToken: FURY_BRIDGE_EVM_ETH_DENOM_PREFIX,
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
      },
      {
        coinDenom: "ETH",
        coinMinimalDenom: "eth",
        contractAddress: "",
        coinDecimals: 18,
        bridgeTo: ["furya-1"],
        coinGeckoId: "ethereum",
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
      },
      {
        coinDenom: "USDT",
        coinMinimalDenom: "erc20_usdt",
        contractAddress: USDT_ETH_CONTRACT,
        coinDecimals: 6,
        bridgeTo: ["furya-1"],
        coinGeckoId: "tether",
        prefixToken: FURY_BRIDGE_EVM_ETH_DENOM_PREFIX,
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
      },
      {
        coinDenom: "OCH",
        coinMinimalDenom: "erc20_och",
        contractAddress: OCH_ETH_CONTRACT,
        coinDecimals: 18,
        bridgeTo: ["furya-1"],
        coinGeckoId: "och",
        prefixToken: FURY_BRIDGE_EVM_ETH_DENOM_PREFIX,
        coinImageUrl:
          "https://assets.coingecko.com/coins/images/34236/standard/orchai_logo_white_copy_4x-8_%281%29.png?1704307670"
      },
      {
        coinDenom: "FURYX",
        coinMinimalDenom: "erc20_furyx",
        contractAddress: FURYX_ETH_CONTRACT,
        coinDecimals: 18,
        bridgeTo: ["furya-1"],
        coinGeckoId: "furydex",
        prefixToken: FURY_BRIDGE_EVM_ETH_DENOM_PREFIX,
        coinImageUrl: "https://i.ibb.co/VmMJtf7/furyx.png"
      }
    ],
    txExplorer: {
      name: "Etherscan",
      txUrl: "https://etherscan.io/tx/{txHash}",
      accountUrl: "https://etherscan.io/address/{address}"
    }
  },
  {
    rpc: "https://api.trongrid.io/jsonrpc",
    rest: "https://api.trongrid.io",
    chainId: "0x2b6653dc",
    networkType: "evm",
    chainName: "Tron Network",
    features: ["isEvm"],
    currencies: [
      {
        coinDenom: "USDT",
        coinMinimalDenom: "trx20_usdt",
        contractAddress: USDT_TRON_CONTRACT,
        bridgeTo: ["furya-1"],
        coinDecimals: 6,
        coinGeckoId: "tether",
        prefixToken: FURY_BRIDGE_EVM_TRON_DENOM_PREFIX,
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
      },
      {
        coinDenom: "wTRX",
        coinMinimalDenom: "trx20_trx",
        contractAddress: WRAP_TRON_TRX_CONTRACT,
        bridgeTo: ["furya-1"],
        coinDecimals: 6,
        coinGeckoId: "tron",
        prefixToken: FURY_BRIDGE_EVM_TRON_DENOM_PREFIX,
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png"
      }
    ],
    bip44: {
      coinType: 195
    },
    txExplorer: {
      name: "Tronscan",
      txUrl: "https://tronscan.org/#/transaction/{txHash}",
      accountUrl: "https://tronscan.org/#/address/{address}"
    }
  },
  {
    rpc: "https://bsc-dataseed1.binance.org",
    networkType: "evm",
    chainId: "0x38",
    chainName: "BNB Chain",
    bip44: {
      coinType: 60
    },
    features: ["isEvm"],
    currencies: [
      {
        coinDenom: "FURY",
        coinMinimalDenom: "bep20_fury",
        contractAddress: FURY_BSC_CONTRACT,
        bridgeTo: ["furya-1"],
        coinDecimals: 18,
        coinGeckoId: "fanfury",
        prefixToken: FURY_BRIDGE_EVM_DENOM_PREFIX,
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/7533.png"
      },
      {
        coinDenom: "AIRI",
        coinMinimalDenom: "bep20_airi",
        contractAddress: AIRI_BSC_CONTRACT,
        bridgeTo: ["furya-1"],
        coinDecimals: 18,
        coinGeckoId: "airight",
        prefixToken: FURY_BRIDGE_EVM_DENOM_PREFIX,
        coinImageUrl: "https://i.ibb.co/m8mCyMr/airi.png"
      },
      {
        coinDenom: "USDT",
        coinMinimalDenom: "bep20_usdt",
        contractAddress: USDT_BSC_CONTRACT,
        bridgeTo: ["furya-1"],
        coinDecimals: 18,
        coinGeckoId: "tether",
        prefixToken: FURY_BRIDGE_EVM_DENOM_PREFIX,
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
      },
      {
        coinDenom: "KWT",
        coinMinimalDenom: "bep20_kwt",
        contractAddress: KWT_BSC_CONTRACT,
        bridgeTo: ["furya-1"],
        coinDecimals: 18,
        coinGeckoId: "kawaii-islands",
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/12313.png"
      },
      {
        coinDenom: "MILKY",
        coinMinimalDenom: "bep20_milky",
        contractAddress: MILKY_BSC_CONTRACT,
        coinDecimals: 18,
        coinGeckoId: "milky-token",
        bridgeTo: ["furya-1"],
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/14418.png"
      },
      {
        coinDenom: "WBNB",
        coinMinimalDenom: "bep20_wbnb",
        contractAddress: WRAP_BNB_CONTRACT,
        coinDecimals: 18,
        coinGeckoId: "wbnb",
        bridgeTo: ["furya-1"],
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png"
      },
      {
        coinDenom: "BNB",
        coinMinimalDenom: "bnb",
        contractAddress: "",
        coinDecimals: 18,
        coinGeckoId: "binancecoin",
        bridgeTo: ["furya-1"],
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png"
      }
    ],
    txExplorer: {
      name: "Bsc Scan",
      txUrl: "https://bscscan.com/tx/${txHash}",
      accountUrl: "https://bscscan.com/address/{address}"
    }
  },
  {
    rpc: "https://endpoint1.kawaii.global",
    chainId: "0x1ae6",
    networkType: "evm",
    chainName: "Kawaiiverse EVM",
    bip44: {
      coinType: 60
    },
    features: ["isEvm"],
    currencies: [
      {
        coinDenom: "ERC20 MILKY",
        coinMinimalDenom: "erc20_milky",
        bridgeTo: ["furya-1", "kawaii_6886-1"],
        contractAddress: MILKY_ERC_CONTRACT,
        coinDecimals: 18,
        coinGeckoId: "milky-token",
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/14418.png"
      },
      {
        coinDenom: "ERC20 KWT",
        bridgeTo: ["furya-1", "kawaii_6886-1"],
        coinMinimalDenom: "erc20_kwt",
        contractAddress: "0x80b5a32E4F032B2a058b4F29EC95EEfEEB87aDcd",
        coinDecimals: 18,
        coinGeckoId: "kawaii-islands",
        coinImageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/12313.png"
      }
    ],
    txExplorer: {
      name: "Kawaiiverse Scan",
      txUrl: "https://scan.kawaii.global/tx/${txHash}",
      accountUrl: "https://scan.kawaii.global/account/{address}"
    }
  }
];

export const network: CustomChainInfo & NetworkConfig = {
  ...furyaNetwork,
  prefix: furyaNetwork.bech32Config.bech32PrefixAccAddr,
  denom: "ufury",
  coinType: furyaNetwork.bip44.coinType,
  fee: { gasPrice: "0.00506", amount: "1518", gas: "2000000" }, // 0.000500 FURY
  factory: FACTORY_CONTRACT,
  factory_v2: FACTORY_V2_CONTRACT,
  router: ROUTER_V2_CONTRACT,
  oracle: ORACLE_CONTRACT,
  staking: STAKING_CONTRACT,
  rewarder: REWARDER_CONTRACT,
  converter: CONVERTER_CONTRACT,
  furydex_listing: FURYDEX_LISTING_CONTRACT,
  multicall: MULTICALL_CONTRACT,
  bid_pool: FURYDEX_BID_POOL_CONTRACT,
  explorer: "https://scan.furya.xyz"
};

// exclude kawaiverse subnet and other special evm that has different cointype
export const evmChains = chainInfos.filter((c) => c.networkType === "evm");
export const cosmosChains = chainInfos.filter((c) => c.networkType === "cosmos");

// evm network
export enum Networks {
  mainnet = 1,
  ropsten = 3,
  rinkeby = 4,
  goerli = 5,
  optimism = 10,
  kovan = 42,
  matic = 137,
  kovanOptimism = 69,
  xdai = 100,
  goerliOptimism = 420,
  arbitrum = 42161,
  rinkebyArbitrum = 421611,
  goerliArbitrum = 421613,
  mumbai = 80001,
  sepolia = 11155111,
  avalancheMainnet = 43114,
  avalancheFuji = 43113,
  fantomTestnet = 4002,
  fantom = 250,
  bsc = 56,
  bsc_testnet = 97,
  moonbeam = 1284,
  moonriver = 1285,
  moonbaseAlphaTestnet = 1287,
  harmony = 1666600000,
  cronos = 25,
  fuse = 122,
  songbirdCanaryNetwork = 19,
  costonTestnet = 16,
  boba = 288,
  aurora = 1313161554,
  astar = 592,
  okc = 66,
  heco = 128,
  metis = 1088,
  rsk = 30,
  rskTestnet = 31,
  evmos = 9001,
  evmosTestnet = 9000,
  thundercore = 108,
  thundercoreTestnet = 18,
  oasis = 26863,
  celo = 42220,
  godwoken = 71402,
  godwokentestnet = 71401,
  klatyn = 8217,
  milkomeda = 2001,
  kcc = 321,
  kawaiiverse = 6886,
  etherlite = 111,
  tron = 728126428
}
