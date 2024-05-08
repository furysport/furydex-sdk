// exclude evm chain

import {
  ATOM_FURYA_CHANNELS,
  IBC_TRANSFER_TIMEOUT,
  IBC_WASM_CONTRACT,
  IBC_WASM_CONTRACT_TEST,
  INJECTIVE_FURYA_CHANNELS,
  KWT_FURYA_CHANNELS,
  NOBLE_FURYA_CHANNELS,
  NOBLE_FURYA_CHANNELS_TEST,
  FURYB_FURYA_CHANNELS,
  FURYB_FURYA_CHANNELS_OLD,
  FURYB_FURYA_CHANNELS_TEST,
  OSMOSIS_FURYA_CHANNELS,
  NEUTARO_FURYA_CHANNELS
} from "./constant";
import { CosmosChainId, NetworkChainId } from "./network";

export interface IBCInfo {
  source: string;
  channel: string;
  testInfo?: Omit<IBCInfo, "testInfo">;
  timeout: number;
}

export type IBCInfoMap = { [key in CosmosChainId]: { [key in NetworkChainId]?: IBCInfo } };

// ibc constants

export const [atom2furya, furya2atom] = ATOM_FURYA_CHANNELS.split(/\s+/);
export const [neutaro2furya, furya2neutaro] = NEUTARO_FURYA_CHANNELS.split(/\s+/);
export const [inj2furya, furya2inj] = INJECTIVE_FURYA_CHANNELS.split(/\s+/);
export const [osmosis2furya, furya2osmosis] = OSMOSIS_FURYA_CHANNELS.split(/\s+/);
export const [furyb2furya, furya2furyb] = FURYB_FURYA_CHANNELS.split(/\s+/);
export const [noble2furya, furya2noble] = NOBLE_FURYA_CHANNELS.split(/\s+/);
export const [noble2furyaTest, furya2nobleTest] = NOBLE_FURYA_CHANNELS_TEST.split(/\s+/);
export const [furyb2furyaTest, furya2furybTest] = FURYB_FURYA_CHANNELS_TEST.split(/\s+/);
const [furyb2furya_old, furya2furyb_old] = FURYB_FURYA_CHANNELS_OLD.split(/\s+/);
const [kwt2furya, furya2kwt] = KWT_FURYA_CHANNELS.split(/\s+/);

// exclude evm chain

export const ibcInfos: IBCInfoMap = {
  "cosmoshub-4": {
    "furya-1": {
      source: "transfer",
      channel: atom2furya,
      timeout: IBC_TRANSFER_TIMEOUT
    }
  },
  "Neutaro-1": {
    "furya-1": {
      source: "transfer",
      channel: neutaro2furya,
      timeout: IBC_TRANSFER_TIMEOUT
    }
  },
  "injective-1": {
    "furya-1": {
      source: "transfer",
      channel: inj2furya,
      timeout: IBC_TRANSFER_TIMEOUT
    }
  },
  "osmosis-1": {
    "furya-1": {
      source: "transfer",
      channel: osmosis2furya,
      timeout: IBC_TRANSFER_TIMEOUT
    }
  },
  "kawaii_6886-1": {
    "furya-1": {
      source: "transfer",
      channel: kwt2furya,
      timeout: IBC_TRANSFER_TIMEOUT
    }
  },
  "noble-1": {
    "furya-1": {
      source: "transfer",
      channel: noble2furya,
      testInfo: {
        source: "transfer",
        channel: noble2furyaTest,
        timeout: IBC_TRANSFER_TIMEOUT
      },
      timeout: IBC_TRANSFER_TIMEOUT
    }
  },
  "furya-1": {
    "cosmoshub-4": {
      source: "transfer",
      channel: furya2atom,
      timeout: IBC_TRANSFER_TIMEOUT
    },
    "Neutaro-1": {
      source: "transfer",
      channel: furya2neutaro,
      timeout: IBC_TRANSFER_TIMEOUT
    },
    "injective-1": {
      source: "transfer",
      channel: furya2inj,
      timeout: IBC_TRANSFER_TIMEOUT
    },
    "osmosis-1": {
      source: "transfer",
      channel: furya2osmosis,
      timeout: IBC_TRANSFER_TIMEOUT
    },
    "furybridge-subnet-2": {
      source: `wasm.${IBC_WASM_CONTRACT}`,
      channel: furya2furyb,
      testInfo: {
        source: `wasm.${IBC_WASM_CONTRACT_TEST}`,
        channel: furya2furybTest,
        timeout: IBC_TRANSFER_TIMEOUT
      },
      timeout: IBC_TRANSFER_TIMEOUT
    },
    "0x01": {
      source: `wasm.${IBC_WASM_CONTRACT}`,
      channel: furya2furyb,
      timeout: IBC_TRANSFER_TIMEOUT
    },
    "0x38": {
      source: `wasm.${IBC_WASM_CONTRACT}`,
      channel: furya2furyb,
      timeout: IBC_TRANSFER_TIMEOUT
    },
    "0x2b6653dc": {
      source: `wasm.${IBC_WASM_CONTRACT}`,
      channel: furya2furyb,
      timeout: IBC_TRANSFER_TIMEOUT
    },
    "kawaii_6886-1": {
      source: "transfer",
      channel: furya2kwt,
      timeout: IBC_TRANSFER_TIMEOUT
    },
    "noble-1": {
      source: `wasm.${IBC_WASM_CONTRACT}`,
      channel: furya2noble,
      testInfo: {
        source: `wasm.${IBC_WASM_CONTRACT_TEST}`,
        channel: furya2nobleTest,
        timeout: IBC_TRANSFER_TIMEOUT
      },
      timeout: IBC_TRANSFER_TIMEOUT
    }
  },
  "furybridge-subnet-2": {
    "furya-1": {
      source: "transfer",
      channel: furyb2furya,
      testInfo: {
        source: "transfer",
        channel: furyb2furyaTest,
        timeout: IBC_TRANSFER_TIMEOUT
      },
      timeout: IBC_TRANSFER_TIMEOUT
    }
  }
};

export const ibcInfosOld: Omit<IBCInfoMap, "osmosis-1" | "cosmoshub-4" | "injective-1" | "noble-1" | "Neutaro-1"> = {
  "furya-1": {
    "furybridge-subnet-2": {
      source: "transfer",
      channel: furya2furyb_old,
      timeout: IBC_TRANSFER_TIMEOUT
    },
    "kawaii_6886-1": {
      source: "transfer",
      channel: furya2kwt,
      timeout: IBC_TRANSFER_TIMEOUT
    },
    "injective-1": {
      source: "transfer",
      channel: furya2inj,
      timeout: IBC_TRANSFER_TIMEOUT
    }
  },
  "furybridge-subnet-2": {
    "furya-1": {
      source: "transfer",
      channel: furyb2furya_old,
      timeout: IBC_TRANSFER_TIMEOUT
    }
  },
  "kawaii_6886-1": {
    "furya-1": {
      source: "transfer",
      channel: kwt2furya,
      timeout: IBC_TRANSFER_TIMEOUT
    }
  }
};
