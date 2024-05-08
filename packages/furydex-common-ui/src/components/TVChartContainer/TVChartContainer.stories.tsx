import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import TVChartContainer, { TVChartContainerProsp } from "./TVChartContainer";

const meta: Meta<typeof TVChartContainer> = {
  component: TVChartContainer,
  title: "Tradingview",
  argTypes: {}
};
export default meta;

type Story = StoryObj<typeof TVChartContainer>;
export const FuryUsdtChart: Story = (args: TVChartContainerProsp) => (
  <div style={{ height: "80vh" }}>
    <TVChartContainer {...args} />;
  </div>
);
FuryUsdtChart.args = {
  theme: "dark",
  currentPair: {
    symbol: "FURY/USDT",
    info: "fury-furya12hzjxfh77wl572gdzct2fxv2arxcwh6gykc7qh"
  }
};

export const FuryAtomChart: Story = (args: TVChartContainerProsp) => (
  <div style={{ height: "80vh" }}>
    <TVChartContainer {...args} />;
  </div>
);
FuryAtomChart.args = {
  theme: "dark",
  currentPair: {
    symbol: "FURY/ATOM",
    info: "fury-ibc/A2E2EEC9057A4A1C2C0A6A4C78B0239118DF5F278830F50B4A6BDD7A66506B78"
  }
};
