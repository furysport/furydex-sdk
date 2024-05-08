import { Coin } from "@cosmjs/amino";
import {
  ContractInfoResponse,
  ExchangeRateResponse,
  ExchangeRatesResponse,
  TaxCapResponse,
  TaxRateResponse
} from "../src/FuryswapOracle.types";

declare global {
  type TreasuryResponse = TaxRateResponse | TaxCapResponse;
  type ContractResponse = ContractInfoResponse | Coin;
  type ExchangeResponse = ExchangeRateResponse | ExchangeRatesResponse;
}
