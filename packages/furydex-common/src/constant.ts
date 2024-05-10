import { CosmosChainId, EvmChainId, chainInfos, cosmosChains, evmChains } from "./network";

export const truncDecimals = 6;
export const atomic = 10 ** truncDecimals;

export const FURY = "ufury";
export const ATOM = "ATOM";
export const OSMO = "OSMO";
export const LP = "LP";
export const STABLE_DENOM = "usdt";
export const TRON_DENOM = "trx";

// estimate fee
export const GAS_ESTIMATION_SWAP_DEFAULT = 580000;
export const GAS_ESTIMATION_BRIDGE_DEFAULT = 200000;
export const MULTIPLIER = 1.6;
export const HIGH_GAS_PRICE = 0.007;
export const AVERAGE_COSMOS_GAS_PRICE = 0.025; // average based on Keplr

export const SEC_PER_YEAR = 60 * 60 * 24 * 365;

export const BROADCAST_POLL_INTERVAL = 600;

// commission_rate pool
export const COMMISSION_RATE = "0.003";

/* network:settings */
export const IBC_TRANSFER_TIMEOUT = 3600;
export const AXIOS_THROTTLE_THRESHOLD = 2000;
export const AXIOS_TIMEOUT = 10000;

// bsc and eth information
export const ETHEREUM_SCAN = "https://etherscan.io";
export const BSC_SCAN = "https://bscscan.com";
export const TRON_SCAN = "https://tronscan.org";

export const FURY_BRIDGE_UDENOM = "ufuryb";
export const FURY_BRIDGE_EVM_DENOM_PREFIX = "furyb";
export const FURY_BRIDGE_EVM_ETH_DENOM_PREFIX = "eth-mainnet";
export const FURY_BRIDGE_EVM_TRON_DENOM_PREFIX = "trontrx-mainnet";
export const FURY_BRIDGE_EVM_FEE = "1";
export const FURY_BRIDGE_CHAIN_FEE = "1";

// bsc contracts
export const FURY_BSC_CONTRACT = "0xA325Ad6D9c92B55A3Fc5aD7e412B1518F96441C0";
// tron contracts
export const USDT_TRON_CONTRACT = "0xa614f803B6FD780986A42c78Ec9c7f77e6DeD13C";
export const WRAP_TRON_TRX_CONTRACT = "0x891cdb91d149f23B1a45D9c5Ca78a88d0cB44C18";

// erc20 contracts
export const FURY_ETH_CONTRACT = "0x4c11249814f11b9346808179Cf06e71ac328c1b5";
export const FURYX_ETH_CONTRACT = "0x2d869aE129e308F94Cc47E66eaefb448CEe0d03e";

// config for relayer
// export const ATOM_FURYA_CHANNELS = "channel-301 channel-15";
// export const ATOM_FURYA_CHANNELS="channel-642 channel-124"
export const OSMOSIS_FURYA_CHANNELS = "channel-8 channel-74222";
// export const INJECTIVE_FURYA_CHANNELS = "channel-147 channel-146";
export const NOBLE_FURYA_CHANNELS = "channel-4 channel-42";
export const KUJIRA_FURYA_CHANNELS = "channel-1 channel-189";

// config for ibc denom
export const ATOM_FURYA_DENOM = "ibc/A2E2EEC9057A4A1C2C0A6A4C78B0239118DF5F278830F50B4A6BDD7A66506B78";
export const KUJIRA_FURYA_DENOM = "ibc/576B1D63E401B6A9A071C78A1D1316D016EC9333D2FEB14AD503FAC4B8731CD1";
export const OSMOSIS_FURYA_DENOM = "ibc/9C4DCD21B48231D0BC2AC3D1B74A864746B37E4292694C93C617324250D002FC";
export const AIRIBSC_FURYA_DENOM = "ibc/C458B4CC4F5581388B9ACB40774FDFBCEDC77A7F7CDFB112B469794AF86C4A69";
export const USDTBSC_FURYA_DENOM = "ibc/E8B5509BE79025DD7A572430204271D3061A535CC66A3A28FDEC4573E473F32F";
export const KWTBSC_FURYA_DENOM = "ibc/4F7464EEE736CCFB6B444EB72DE60B3B43C0DD509FFA2B87E05D584467AAE8C8";
export const MILKYBSC_FURYA_DENOM = "ibc/E12A2298AC40011C79F02F26C324BD54DF20F4B2904CB9028BFDEDCFAA89B906";
export const KWT_SUB_NETWORK_DENOM = "ibc/E8734BEF4ECF225B71825BC74DE30DCFF3644EAC9778FFD4EF9F94369B6C8377";
export const MILKY_SUB_NETWORK_DENOM = "ibc/81ACD1F7F5380CAA3F590C58C699FBD408B8792F694888D7256EEAF564488FAB";
export const INJECTIVE_FURYA_DENOM = "ibc/49D820DFDE9F885D7081725A58202ABA2F465CAEE4AFBC683DFB79A8E013E83E";
export const FURYIBC_INJECTIVE_DENOM = "ibc/C20C0A822BD22B2CEF0D067400FCCFB6FAEEE9E91D360B4E0725BD522302D565";

// config for furya token
export const FURYX_CONTRACT = "furya1w66gusatju0afgytfkcsm449y7e6jrd4uca0qy0fdcvdy8rl9x3s0jxq4t";
export const USDT_CONTRACT = "furya1062jkn73ew8gzmrhyr4dc7nhl4q2na4y5d2s720szfdlzzj344dqu67e3g";
export const USDC_CONTRACT = "furya1s786sa67veppvzj5fe7kzve8tz82ujs3cuxhyt5d5usk3ffcwwrq38kksa";

// config for furya contract
export const FACTORY_CONTRACT = "furya10enz8yltawxsnh444c5sppnlltlfs4t5wtypr2d2de984xnln78s7tg0pd";
export const FACTORY_V2_CONTRACT = "furya10enz8yltawxsnh444c5sppnlltlfs4t5wtypr2d2de984xnln78s7tg0pd";
export const ROUTER_V2_CONTRACT = "furya1ch29yeq6yhcm38lcugg9qxfk6cytar6e9rw9xr29lnj837ksvnnsvw8cl3";
export const ORACLE_CONTRACT = "furya1llq6xptk7y26slzcpxs00wnslk5xgrjed6ug3vsys5a6q9kmhddqg4ftaa";
export const STAKING_CONTRACT = "furya1hp04f5rw7kzq3esru9kzuvshlxxncjgkpw8aaxkmn80860flaspq0srza3";
export const REWARDER_CONTRACT = "furya1j9g97wvj2j0kk3vkw0e9d0tc43hd6r7v97tskkxk3u04lujpacrsjukxan";
export const CONVERTER_CONTRACT = "furya1w4drj5z4krtc8cs2knsxmvjucpk0ety20x0xv6u9vn0vj8guj5us23gn9t";
export const FURYDEX_LISTING_CONTRACT = "furya16qkrvwvzckr2p6ad9nn9lykm88hrxqky6cz8wjlecamsahgt88uqcy4fj0";
export const FURYDEX_BID_POOL_CONTRACT = "furya15lcvnlgt5zjeyvv7m0y96a7qhvfm5fkmneaamwxkd7jvgm4yfx0sx7pnd6";
// export const FURYDEX_SMART_ROUTER_CONTRACT = "furya107rze07vst8gzw82vzds6tvpnf2yru6pgutcfsscvxjww8z88ktsgyqgcm";

// Cw20-staking contract
export const CW20_STAKING_CONTRACT = "furya1hp04f5rw7kzq3esru9kzuvshlxxncjgkpw8aaxkmn80860flaspq0srza3";
export const CW20_REWARDER_CONTRACT = "furya1j9g97wvj2j0kk3vkw0e9d0tc43hd6r7v97tskkxk3u04lujpacrsjukxan";
export const CW20_SNAPSHOT_CONTRACT = "furya1hmlnhwu3p2kkzac64un5zkz3za8hscklkyaqu4gagdc756zjyemsyp96kd"; // DAODAO support querrier

// config for evm
export const GRAVITY_EVM_CONTRACT = "0x9a0A02B296240D2620E339cCDE386Ff612f07Be5";
// export const GRAVITY_TRON_CONTRACT in tron format TLXrPtQor6xxF2HeQtmKJUUkVNjJZVsgTM
export const GRAVITY_TRON_CONTRACT = "0x73Ddc880916021EFC4754Cb42B53db6EAB1f9D64";

// IBC Wasm contract
export const IBC_WASM_CONTRACT = "furya195269awwnt5m6c843q6w7hp8rt0k7syfu9de4h0wz384slshuzps8y7ccm";
export const IBC_WASM_CONTRACT_TEST = "furya1jtt8c2lz8emh8s708y0aeduh32xef2rxyg8y78lyvxn806cu7q0sjtxsnv";

// Utiliti contract
export const MULTICALL_CONTRACT = "furya19nczmtp93vvn69vfg2hk8wyp0ely20d5zks9s5zxpzxp8qwqz5fsvra0gt";

export const BASE_API_URL = "https://api.furya.xyz";

// websocket consts
export const WEBSOCKET_RECONNECT_ATTEMPTS = 5;
export const WEBSOCKET_RECONNECT_INTERVAL = 20000;

export const UNISWAP_ROUTER_DEADLINE = 15000; // swap deadline in ms
export const EVM_BALANCE_RETRY_COUNT = 5;

// evm chainID
export enum EVM_CHAIN_ID_COMMON {
  ETH_CHAIN_ID = "0x01",
  BSC_CHAIN_ID = "0x38",
  KAWAII_EVM_CHAIN_ID = "0x1ae6",
  TRON_CHAIN_ID = "0x2b6653dc"
}
// cosmos chainId
export enum COSMOS_CHAIN_ID_COMMON {
  FURYA_CHAIN_ID = "furya-1",
  FURYBRIDGE_CHAIN_ID = "furybridge-subnet-2",
  OSMOSIS_CHAIN_ID = "osmosis-1",
  COSMOSHUB_CHAIN_ID = "cosmoshub-4",
  INJECTVE_CHAIN_ID = "injective-1",
  KAWAII_COSMOS_CHAIN_ID = "kawaii_6886-1",
  NOBLE_CHAIN_ID = "noble-1"
}

// asset info token
export const FURY_INFO = {
  native_token: {
    denom: FURY
  }
};

export const FURYX_INFO = {
  token: {
    contract_addr: FURYX_CONTRACT
  }
};

export const FURYXOCH_INFO = {
  token: {
    contract_addr: XOCH_CONTRACT
  }
};

export const USDC_INFO = {
  token: {
    contract_addr: USDC_CONTRACT
  }
};

export const KUJIRA_INFO = {
  native_token: {
    denom: KUJIRA_FURYA_DENOM
  }
};

// slippage swap
export const OPTIONS_SLIPPAGE = [1, 3, 5];
export const DEFAULT_SLIPPAGE = OPTIONS_SLIPPAGE[0];
export const DEFAULT_MANUAL_SLIPPAGE = 2.5;

// create cw20 token
export const CODE_ID_CW20 = 761;
export const CW20_DECIMALS = 6;

// type switch wallet between keplr and owallet
export type WalletType = "keplr" | "owallet" | "leapSnap";

export const gravityContracts: Omit<Record<EvmChainId, string>, "0x1ae6"> = {
  "0x38": GRAVITY_EVM_CONTRACT,
  "0x01": GRAVITY_EVM_CONTRACT,
  "0x2b6653dc": GRAVITY_TRON_CONTRACT
};
