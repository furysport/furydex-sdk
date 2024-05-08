import { IndexedTx } from "@cosmjs/stargate";
import { Binary } from "@furyanetwork/furydex-contracts-sdk";
export type Tx = IndexedTx & {
  timestamp?: string;
};

// this msg is to replicate the stargate msg specified as an enum of CosmosMsg in the cosmwasm smart contract
export interface StargateMsg {
  stargate: {
    type_url: string;
    value: Binary;
  };
}
