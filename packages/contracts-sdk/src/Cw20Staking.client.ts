/**
* This file was automatically generated by @oraichain/ts-codegen@0.35.9.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @oraichain/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
import {Addr, Uint128, Binary, AssetInfo, Cw20ReceiveMsg, Asset, RewardMsg, Decimal, RewardInfoResponseItem} from "./types";
import {InstantiateMsg, ExecuteMsg, QueryMsg, MigrateMsg, ConfigResponse, ArrayOfQueryPoolInfoResponse, QueryPoolInfoResponse, PoolInfoResponse, LockInfosResponse, LockInfoResponse, RewardInfoResponse, ArrayOfRewardInfoResponse, RewardsPerSecResponse, StakedBalanceAtHeightResponse, TotalStakedAtHeightResponse} from "./Cw20Staking.types";
export interface Cw20StakingReadOnlyInterface {
  contractAddress: string;
  config: () => Promise<ConfigResponse>;
  poolInfo: ({
    stakingToken
  }: {
    stakingToken: Addr;
  }) => Promise<PoolInfoResponse>;
  rewardsPerSec: ({
    stakingToken
  }: {
    stakingToken: Addr;
  }) => Promise<RewardsPerSecResponse>;
  rewardInfo: ({
    stakerAddr,
    stakingToken
  }: {
    stakerAddr: Addr;
    stakingToken?: Addr;
  }) => Promise<RewardInfoResponse>;
  rewardInfos: ({
    limit,
    order,
    stakingToken,
    startAfter
  }: {
    limit?: number;
    order?: number;
    stakingToken: Addr;
    startAfter?: Addr;
  }) => Promise<ArrayOfRewardInfoResponse>;
  getPoolsInformation: () => Promise<ArrayOfQueryPoolInfoResponse>;
  lockInfos: ({
    limit,
    order,
    stakerAddr,
    stakingToken,
    startAfter
  }: {
    limit?: number;
    order?: number;
    stakerAddr: Addr;
    stakingToken: Addr;
    startAfter?: number;
  }) => Promise<LockInfosResponse>;
  stakedBalanceAtHeight: ({
    address,
    assetKey,
    height
  }: {
    address: string;
    assetKey: Addr;
    height?: number;
  }) => Promise<StakedBalanceAtHeightResponse>;
  totalStakedAtHeight: ({
    assetKey,
    height
  }: {
    assetKey: Addr;
    height?: number;
  }) => Promise<TotalStakedAtHeightResponse>;
}
export class Cw20StakingQueryClient implements Cw20StakingReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.config = this.config.bind(this);
    this.poolInfo = this.poolInfo.bind(this);
    this.rewardsPerSec = this.rewardsPerSec.bind(this);
    this.rewardInfo = this.rewardInfo.bind(this);
    this.rewardInfos = this.rewardInfos.bind(this);
    this.getPoolsInformation = this.getPoolsInformation.bind(this);
    this.lockInfos = this.lockInfos.bind(this);
    this.stakedBalanceAtHeight = this.stakedBalanceAtHeight.bind(this);
    this.totalStakedAtHeight = this.totalStakedAtHeight.bind(this);
  }

  config = async (): Promise<ConfigResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      config: {}
    });
  };
  poolInfo = async ({
    stakingToken
  }: {
    stakingToken: Addr;
  }): Promise<PoolInfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      pool_info: {
        staking_token: stakingToken
      }
    });
  };
  rewardsPerSec = async ({
    stakingToken
  }: {
    stakingToken: Addr;
  }): Promise<RewardsPerSecResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      rewards_per_sec: {
        staking_token: stakingToken
      }
    });
  };
  rewardInfo = async ({
    stakerAddr,
    stakingToken
  }: {
    stakerAddr: Addr;
    stakingToken?: Addr;
  }): Promise<RewardInfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      reward_info: {
        staker_addr: stakerAddr,
        staking_token: stakingToken
      }
    });
  };
  rewardInfos = async ({
    limit,
    order,
    stakingToken,
    startAfter
  }: {
    limit?: number;
    order?: number;
    stakingToken: Addr;
    startAfter?: Addr;
  }): Promise<ArrayOfRewardInfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      reward_infos: {
        limit,
        order,
        staking_token: stakingToken,
        start_after: startAfter
      }
    });
  };
  getPoolsInformation = async (): Promise<ArrayOfQueryPoolInfoResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      get_pools_information: {}
    });
  };
  lockInfos = async ({
    limit,
    order,
    stakerAddr,
    stakingToken,
    startAfter
  }: {
    limit?: number;
    order?: number;
    stakerAddr: Addr;
    stakingToken: Addr;
    startAfter?: number;
  }): Promise<LockInfosResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      lock_infos: {
        limit,
        order,
        staker_addr: stakerAddr,
        staking_token: stakingToken,
        start_after: startAfter
      }
    });
  };
  stakedBalanceAtHeight = async ({
    address,
    assetKey,
    height
  }: {
    address: string;
    assetKey: Addr;
    height?: number;
  }): Promise<StakedBalanceAtHeightResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      staked_balance_at_height: {
        address,
        asset_key: assetKey,
        height
      }
    });
  };
  totalStakedAtHeight = async ({
    assetKey,
    height
  }: {
    assetKey: Addr;
    height?: number;
  }): Promise<TotalStakedAtHeightResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      total_staked_at_height: {
        asset_key: assetKey,
        height
      }
    });
  };
}
export interface Cw20StakingInterface extends Cw20StakingReadOnlyInterface {
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
    owner,
    rewarder
  }: {
    owner?: Addr;
    rewarder?: Addr;
  }, _fee?: number | StdFee | "auto", _memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  updateUnbondingPeriod: ({
    stakingToken,
    unbondingPeriod
  }: {
    stakingToken: Addr;
    unbondingPeriod: number;
  }, _fee?: number | StdFee | "auto", _memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  registerAsset: ({
    stakingToken,
    unbondingPeriod
  }: {
    stakingToken: Addr;
    unbondingPeriod?: number;
  }, _fee?: number | StdFee | "auto", _memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  updateRewardsPerSec: ({
    assets,
    stakingToken
  }: {
    assets: Asset[];
    stakingToken: Addr;
  }, _fee?: number | StdFee | "auto", _memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  depositReward: ({
    rewards
  }: {
    rewards: RewardMsg[];
  }, _fee?: number | StdFee | "auto", _memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  unbond: ({
    amount,
    stakingToken
  }: {
    amount: Uint128;
    stakingToken: Addr;
  }, _fee?: number | StdFee | "auto", _memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  withdraw: ({
    stakingToken
  }: {
    stakingToken?: Addr;
  }, _fee?: number | StdFee | "auto", _memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  withdrawOthers: ({
    stakerAddrs,
    stakingToken
  }: {
    stakerAddrs: Addr[];
    stakingToken?: Addr;
  }, _fee?: number | StdFee | "auto", _memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  restake: ({
    stakingToken
  }: {
    stakingToken: Addr;
  }, _fee?: number | StdFee | "auto", _memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
}
export class Cw20StakingClient extends Cw20StakingQueryClient implements Cw20StakingInterface {
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
    this.updateUnbondingPeriod = this.updateUnbondingPeriod.bind(this);
    this.registerAsset = this.registerAsset.bind(this);
    this.updateRewardsPerSec = this.updateRewardsPerSec.bind(this);
    this.depositReward = this.depositReward.bind(this);
    this.unbond = this.unbond.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.withdrawOthers = this.withdrawOthers.bind(this);
    this.restake = this.restake.bind(this);
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
    owner,
    rewarder
  }: {
    owner?: Addr;
    rewarder?: Addr;
  }, _fee: number | StdFee | "auto" = "auto", _memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_config: {
        owner,
        rewarder
      }
    }, _fee, _memo, _funds);
  };
  updateUnbondingPeriod = async ({
    stakingToken,
    unbondingPeriod
  }: {
    stakingToken: Addr;
    unbondingPeriod: number;
  }, _fee: number | StdFee | "auto" = "auto", _memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_unbonding_period: {
        staking_token: stakingToken,
        unbonding_period: unbondingPeriod
      }
    }, _fee, _memo, _funds);
  };
  registerAsset = async ({
    stakingToken,
    unbondingPeriod
  }: {
    stakingToken: Addr;
    unbondingPeriod?: number;
  }, _fee: number | StdFee | "auto" = "auto", _memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      register_asset: {
        staking_token: stakingToken,
        unbonding_period: unbondingPeriod
      }
    }, _fee, _memo, _funds);
  };
  updateRewardsPerSec = async ({
    assets,
    stakingToken
  }: {
    assets: Asset[];
    stakingToken: Addr;
  }, _fee: number | StdFee | "auto" = "auto", _memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_rewards_per_sec: {
        assets,
        staking_token: stakingToken
      }
    }, _fee, _memo, _funds);
  };
  depositReward = async ({
    rewards
  }: {
    rewards: RewardMsg[];
  }, _fee: number | StdFee | "auto" = "auto", _memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      deposit_reward: {
        rewards
      }
    }, _fee, _memo, _funds);
  };
  unbond = async ({
    amount,
    stakingToken
  }: {
    amount: Uint128;
    stakingToken: Addr;
  }, _fee: number | StdFee | "auto" = "auto", _memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      unbond: {
        amount,
        staking_token: stakingToken
      }
    }, _fee, _memo, _funds);
  };
  withdraw = async ({
    stakingToken
  }: {
    stakingToken?: Addr;
  }, _fee: number | StdFee | "auto" = "auto", _memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      withdraw: {
        staking_token: stakingToken
      }
    }, _fee, _memo, _funds);
  };
  withdrawOthers = async ({
    stakerAddrs,
    stakingToken
  }: {
    stakerAddrs: Addr[];
    stakingToken?: Addr;
  }, _fee: number | StdFee | "auto" = "auto", _memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      withdraw_others: {
        staker_addrs: stakerAddrs,
        staking_token: stakingToken
      }
    }, _fee, _memo, _funds);
  };
  restake = async ({
    stakingToken
  }: {
    stakingToken: Addr;
  }, _fee: number | StdFee | "auto" = "auto", _memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      restake: {
        staking_token: stakingToken
      }
    }, _fee, _memo, _funds);
  };
}