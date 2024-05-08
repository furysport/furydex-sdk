import "dotenv/config";
import { CosmosWalletImpl } from "./offline-wallet";
import { UniversalSwapHandler } from "../handler";
import {
  FURY_ETH_CONTRACT,
  cosmosTokens,
  flattenTokens,
  generateError,
  toAmount,
  USDT_CONTRACT
} from "@furyanetwork/furydex-common";

const furyaToEvm = async (chainId: "furya-1") => {
  const wallet = new CosmosWalletImpl(process.env.MNEMONIC);

  const sender = await wallet.getKeplrAddr(chainId);
  const fromAmount = 90;
  let originalFromToken = cosmosTokens.find(
    (t) => t.chainId === chainId && t.contractAddress && t.contractAddress === USDT_CONTRACT
  );

  let originalToToken = flattenTokens.find(
    (t) => t.chainId === "0x01" && t.contractAddress && t.contractAddress === FURY_ETH_CONTRACT
  );
  const evmAddress = "0xf2846a1E4dAFaeA38C1660a618277d67605bd2B5";
  if (!originalFromToken) throw generateError("Could not find original from token");
  if (!originalToToken) throw generateError("Could not find original to token");
  const universalHandler = new UniversalSwapHandler(
    {
      originalFromToken,
      originalToToken,
      sender: { cosmos: sender, evm: evmAddress },
      relayerFee: {
        relayerAmount: "1000000",
        relayerDecimals: 6
      },
      fromAmount,
      simulateAmount: toAmount(fromAmount, originalToToken.decimals).toString()
    },
    { cosmosWallet: wallet, swapOptions: {} }
  );

  try {
    const result = await universalHandler.processUniversalSwap();
    console.log("result: ", result);
  } catch (error) {
    console.log("error: ", error);
  }
};

(() => {
  return furyaToEvm("furya-1");
})();
