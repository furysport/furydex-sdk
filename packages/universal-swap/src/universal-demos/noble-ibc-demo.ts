import "dotenv/config";
import { CosmosWalletImpl } from "./offline-wallet";
import { UniversalSwapHandler } from "../handler";
import { USDC_CONTRACT, cosmosTokens, generateError, toAmount } from "@furyanetwork/furydex-common";

const nobleUsdcToFuryUsdc = async (chainId: "noble-1" | "furya-1") => {
  const wallet = new CosmosWalletImpl(process.env.MNEMONIC);
  const sender = await wallet.getKeplrAddr(chainId);
  const fromAmount = 0.000001;
  console.log("sender: ", sender);
  let originalFromToken = cosmosTokens.find((t) => t.chainId === "noble-1" && t.denom === "uusdc");
  let originalToToken = cosmosTokens.find(
    (t) => t.chainId === "furya-1" && t.contractAddress && t.contractAddress === USDC_CONTRACT
  );
  // if we bridge from Furya -> Noble then we reverse order
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
  if (process.env.FORWARD) return nobleUsdcToFuryUsdc("noble-1");
  return nobleUsdcToFuryUsdc("furya-1");
})();
