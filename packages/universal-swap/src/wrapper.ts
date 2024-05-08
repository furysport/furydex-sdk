import { CosmosChainId, CosmosWallet, EvmResponse, EvmWallet, TokenItemType } from "@furyanetwork/furydex-common";
import { UniversalSwapHandler } from "./handler";
import { ExecuteResult } from "@cosmjs/cosmwasm-stargate";

export const swapFuryaToFurya = async (data: {
  cosmosWallet: CosmosWallet;
  fromAmount: number;
  simulateAmount: string;
  fromToken: TokenItemType;
  toToken: TokenItemType;
  simulatePrice: string;
  userSlippage: number;
}): Promise<ExecuteResult> => {
  const { cosmosWallet, fromAmount, fromToken, toToken, simulatePrice, userSlippage, simulateAmount } = data;
  const sender = await cosmosWallet.getKeplrAddr("furya-1");
  const handler = new UniversalSwapHandler(
    {
      sender: { cosmos: sender },
      fromAmount,
      simulateAmount,
      originalFromToken: fromToken,
      originalToToken: toToken,
      simulatePrice,
      userSlippage
    },
    { cosmosWallet }
  );
  return handler.swap();
};

export const swapFuryaToCosmos = async (data: {
  cosmosWallet: CosmosWallet;
  fromAmount: number;
  fromToken: TokenItemType;
  toToken: TokenItemType;
  simulateAmount: string;
  simulatePrice: string;
  userSlippage: number;
}) => {
  const { cosmosWallet, fromAmount, fromToken, toToken, simulatePrice, userSlippage, simulateAmount } = data;
  const cosmos = await cosmosWallet.getKeplrAddr(fromToken.chainId as CosmosChainId);
  const handler = new UniversalSwapHandler(
    {
      sender: { cosmos },
      fromAmount,
      originalFromToken: fromToken,
      originalToToken: toToken,
      simulatePrice,
      simulateAmount,
      userSlippage
    },
    { cosmosWallet }
  );
  return handler.swapAndTransferToOtherNetworks("furya-to-cosmos");
};

export const swapFuryaToEvm = async (data: {
  cosmosWallet: CosmosWallet;
  evmWallet: EvmWallet;
  fromAmount: number;
  fromToken: TokenItemType;
  toToken: TokenItemType;
  simulateAmount: string;
  simulatePrice: string;
  userSlippage: number;
}) => {
  const { evmWallet, cosmosWallet, fromAmount, fromToken, toToken, simulatePrice, userSlippage, simulateAmount } = data;
  const cosmos = await cosmosWallet.getKeplrAddr(fromToken.chainId as CosmosChainId);
  const evm = await evmWallet.getEthAddress();
  const tron = evmWallet.tronWeb?.defaultAddress?.base58;
  const handler = new UniversalSwapHandler(
    {
      sender: { cosmos, evm, tron },
      fromAmount,
      originalFromToken: fromToken,
      originalToToken: toToken,
      simulatePrice,
      simulateAmount,
      userSlippage
    },
    { cosmosWallet, evmWallet }
  );
  return handler.swapAndTransferToOtherNetworks("furya-to-evm");
};

// TODO: Support swapping from other cosmos based networks 1 step
export const swapCosmosToFurya = async () => {};

export const swapEvmToFurya = async (data: {
  cosmosWallet: CosmosWallet;
  evmWallet: EvmWallet;
  fromAmount: number;
  fromToken: TokenItemType;
  toToken: TokenItemType;
  simulateAmount: string;
  simulatePrice: string;
  userSlippage: number;
}): Promise<EvmResponse> => {
  // the params and logic are the same, so we reuse it
  const { evmWallet, cosmosWallet, fromAmount, fromToken, toToken, simulatePrice, userSlippage, simulateAmount } = data;
  const cosmos = await cosmosWallet.getKeplrAddr(fromToken.chainId as CosmosChainId);
  const evm = await evmWallet.getEthAddress();
  const tron = evmWallet.tronWeb?.defaultAddress?.base58;
  const handler = new UniversalSwapHandler(
    {
      sender: { cosmos, evm, tron },
      fromAmount,
      originalFromToken: fromToken,
      originalToToken: toToken,
      simulatePrice,
      simulateAmount,
      userSlippage
    },
    { cosmosWallet, evmWallet }
  );
  return handler.processUniversalSwap() as Promise<EvmResponse>;
};
