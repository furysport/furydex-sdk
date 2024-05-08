/**
* This file was automatically generated by @oraichain/ts-codegen@0.35.9.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @oraichain/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
import {Uint128, AssetInfo, Addr, Logo, EmbeddedLogo, Binary, Cw20Coin, Asset, InstantiateMarketingInfo} from "./types";
import {InstantiateMsg, ExecuteMsg, ListTokenMsg, MinterResponse, QueryMsg, MigrateMsg, Config} from "./FurydexListingContract.types";
export interface FurydexListingContractReadOnlyInterface {
  contractAddress: string;
  config: () => Promise<Config>;
}
export class FurydexListingContractQueryClient implements FurydexListingContractReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.config = this.config.bind(this);
  }

  config = async (): Promise<Config> => {
    return this.client.queryContractSmart(this.contractAddress, {
      config: {}
    });
  };
}
export interface FurydexListingContractInterface extends FurydexListingContractReadOnlyInterface {
  contractAddress: string;
  sender: string;
  listToken: ({
    cw20Admin,
    initialBalances,
    label,
    liquidityPoolRewardAssets,
    marketing,
    mint,
    name,
    pairAssetInfo,
    symbol,
    targetedAssetInfo
  }: {
    cw20Admin?: string;
    initialBalances?: Cw20Coin[];
    label?: string;
    liquidityPoolRewardAssets: Asset[];
    marketing?: InstantiateMarketingInfo;
    mint?: MinterResponse;
    name?: string;
    pairAssetInfo: AssetInfo;
    symbol?: string;
    targetedAssetInfo?: AssetInfo;
  }, _fee?: number | StdFee | "auto", _memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
}
export class FurydexListingContractClient extends FurydexListingContractQueryClient implements FurydexListingContractInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;

  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.listToken = this.listToken.bind(this);
  }

  listToken = async ({
    cw20Admin,
    initialBalances,
    label,
    liquidityPoolRewardAssets,
    marketing,
    mint,
    name,
    pairAssetInfo,
    symbol,
    targetedAssetInfo
  }: {
    cw20Admin?: string;
    initialBalances?: Cw20Coin[];
    label?: string;
    liquidityPoolRewardAssets: Asset[];
    marketing?: InstantiateMarketingInfo;
    mint?: MinterResponse;
    name?: string;
    pairAssetInfo: AssetInfo;
    symbol?: string;
    targetedAssetInfo?: AssetInfo;
  }, _fee: number | StdFee | "auto" = "auto", _memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      list_token: {
        cw20_admin: cw20Admin,
        initial_balances: initialBalances,
        label,
        liquidity_pool_reward_assets: liquidityPoolRewardAssets,
        marketing,
        mint,
        name,
        pair_asset_info: pairAssetInfo,
        symbol,
        targeted_asset_info: targetedAssetInfo
      }
    }, _fee, _memo, _funds);
  };
}