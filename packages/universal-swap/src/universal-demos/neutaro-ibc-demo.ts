import "dotenv/config";
import { CosmosWalletImpl } from "./offline-wallet";
import { UniversalSwapHandler } from "../handler";
import { NEUTARO_FURYA_DENOM, cosmosTokens, generateError, toAmount } from "@furyanetwork/furydex-common";

const neutaroUsdcToFuryUsdc = async (chainId: "Neutaro-1" | "furya-1") => {
  const wallet = new CosmosWalletImpl(process.env.MNEMONIC);
  const sender = await wallet.getKeplrAddr(chainId);
  const fromAmount = 0.01;
  let originalFromToken = cosmosTokens.find((t) => t.chainId === "Neutaro-1" && t.denom === "uneutaro");

  let originalToToken = cosmosTokens.find(
    (t) => t.chainId === "furya-1" && t.denom && t.denom === NEUTARO_FURYA_DENOM
  );

  // if we bridge from Furya -> Neutaro then we reverse order
  if (chainId === "furya-1") {
    const temp = originalFromToken;
    originalFromToken = originalToToken;
    originalToToken = temp;
  }

  if (!originalFromToken) throw generateError("Could not find original from token");
  if (!originalToToken) throw generateError("Could not find original to token");
  const universalHandler = new UniversalSwapHandler(
    {
      originalFromToken,
      originalToToken,
      sender: { cosmos: sender },
      fromAmount,
      simulateAmount: toAmount(fromAmount, originalToToken.decimals).toString()
    },
    { cosmosWallet: wallet, swapOptions: { ibcInfoTestMode: true } }
  );

  try {
    const result = await universalHandler.processUniversalSwap();
    console.log("result: ", result);
  } catch (error) {
    console.log("error: ", error);
  }
};

(() => {
  if (process.env.FORWARD) return neutaroUsdcToFuryUsdc("Neutaro-1");
  return neutaroUsdcToFuryUsdc("furya-1");
})();
