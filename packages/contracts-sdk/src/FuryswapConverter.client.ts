/**
* This file was automatically generated by @oraichain/ts-codegen@0.35.9.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @oraichain/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
import {Uint128, Binary, Addr, AssetInfo, Cw20ReceiveMsg, Decimal} from "./types";
import {InstantiateMsg, ExecuteMsg, TokenInfo, QueryMsg, MigrateMsg, ConfigResponse, ConvertInfoResponse, TokenRatio} from "./FuryswapConverter.types";
export interface FuryswapConverterReadOnlyInterface {
  contractAddress: string;
  config: () => Promise<ConfigResponse>;
  convertInfo: ({
    assetInfo
  }: {
    assetInfo: AssetInfo;
  }) => Promise<ConvertInfoResponse>;
}
export class FuryswapConverterQueryClient implements FuryswapConverterReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.config = this.config.bind(this);
    this.convertInfo = this.convertInfo.bind(this);
  }

  config = async (): Promise<ConfigResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      config: {}
    });
  };
  convertInfo = async ({
    assetInfo
  }: {
    assetInfo: AssetInfo;
  }): Promise<ConvertInfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      convert_info: {
        asset_info: assetInfo
      }
    });
  };
}
export interface FuryswapConverterInterface extends FuryswapConverterReadOnlyInterface {
  contractAddress: string;
  sender: string;
  receive: ({
    amount,
    msg,
    sender
  }: {
    amount: Uint128;
    msg: Binary;
    sender: string;
  }, _fee?: number | StdFee | "auto", _memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  updateConfig: ({
    owner
  }: {
    owner: Addr;
  }, _fee?: number | StdFee | "auto", _memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  convert: (_fee?: number | StdFee | "auto", _memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  updatePair: ({
    from,
    to
  }: {
    from: TokenInfo;
    to: TokenInfo;
  }, _fee?: number | StdFee | "auto", _memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  unregisterPair: ({
    from
  }: {
    from: TokenInfo;
  }, _fee?: number | StdFee | "auto", _memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  convertReverse: ({
    fromAsset
  }: {
    fromAsset: AssetInfo;
  }, _fee?: number | StdFee | "auto", _memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  withdrawTokens: ({
    assetInfos
  }: {
    assetInfos: AssetInfo[];
  }, _fee?: number | StdFee | "auto", _memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
}
export class FuryswapConverterClient extends FuryswapConverterQueryClient implements FuryswapConverterInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;

  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.receive = this.receive.bind(this);
    this.updateConfig = this.updateConfig.bind(this);
    this.convert = this.convert.bind(this);
    this.updatePair = this.updatePair.bind(this);
    this.unregisterPair = this.unregisterPair.bind(this);
    this.convertReverse = this.convertReverse.bind(this);
    this.withdrawTokens = this.withdrawTokens.bind(this);
  }

  receive = async ({
    amount,
    msg,
    sender
  }: {
    amount: Uint128;
    msg: Binary;
    sender: string;
  }, _fee: number | StdFee | "auto" = "auto", _memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      receive: {
        amount,
        msg,
        sender
      }
    }, _fee, _memo, _funds);
  };
  updateConfig = async ({
    owner
  }: {
    owner: Addr;
  }, _fee: number | StdFee | "auto" = "auto", _memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_config: {
        owner
      }
    }, _fee, _memo, _funds);
  };
  convert = async (_fee: number | StdFee | "auto" = "auto", _memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      convert: {}
    }, _fee, _memo, _funds);
  };
  updatePair = async ({
    from,
    to
  }: {
    from: TokenInfo;
    to: TokenInfo;
  }, _fee: number | StdFee | "auto" = "auto", _memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_pair: {
        from,
        to
      }
    }, _fee, _memo, _funds);
  };
  unregisterPair = async ({
    from
  }: {
    from: TokenInfo;
  }, _fee: number | StdFee | "auto" = "auto", _memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      unregister_pair: {
        from
      }
    }, _fee, _memo, _funds);
  };
  convertReverse = async ({
    fromAsset
  }: {
    fromAsset: AssetInfo;
  }, _fee: number | StdFee | "auto" = "auto", _memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      convert_reverse: {
        from_asset: fromAsset
      }
    }, _fee, _memo, _funds);
  };
  withdrawTokens = async ({
    assetInfos
  }: {
    assetInfos: AssetInfo[];
  }, _fee: number | StdFee | "auto" = "auto", _memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      withdraw_tokens: {
        asset_infos: assetInfos
      }
    }, _fee, _memo, _funds);
  };
}