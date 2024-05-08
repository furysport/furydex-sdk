import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { readFileSync } from "fs";
import path from "path";

export type ContractName =
  | "furyswap-token"
  | "furyswap-orderbook"
  | "furyswap-pair"
  | "furyswap-oracle"
  | "furyswap-converter"
  | "furyswap-factory"
  | "furyswap_rewarder"
  | "furyswap-router"
  | "furyswap-staking"
  | "furydex-listing-contract";

const contractDir = path.join(path.dirname(module.filename), "..", "data");

export const getContractDir = (name: ContractName = "furyswap-orderbook") => {
  return path.join(contractDir, name + ".wasm");
};

export const deployContract = async <T>(
  client: SigningCosmWasmClient,
  senderAddress: string,
  msg?: T,
  label?: string,
  contractName?: ContractName
) => {
  // upload and instantiate the contract
  const wasmBytecode = readFileSync(getContractDir(contractName));
  const uploadRes = await client.upload(senderAddress, wasmBytecode, "auto");
  const initRes = await client.instantiate(senderAddress, uploadRes.codeId, msg ?? {}, label ?? contractName, "auto");
  return { ...uploadRes, ...initRes };
};
