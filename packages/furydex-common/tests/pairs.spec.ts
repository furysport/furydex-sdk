import { MILKY_CONTRACT, OSMOSIS_FURYA_DENOM, USDC_CONTRACT, USDT_CONTRACT } from "../src/constant";
import { isFactoryV1, isInPairList } from "../src/pairs";

describe("test pairs functions should behave correctly", () => {
  it("test-isFactoryV1", () => {
    const furyToken = { native_token: { denom: "ufury" } };
    expect(
      isFactoryV1([furyToken, { token: { contract_addr: "furya10ldgzued6zjp0mkqwsv2mux3ml50l97c74x8sg" } }])
    ).toEqual(true);

    expect(
      isFactoryV1([
        furyToken,
        { token: { contract_addr: "furya15un8msx3n5zf9ahlxmfeqd2kwa5wm0nrpxer304m9nd5q6qq0g6sku5pdd" } }
      ])
    ).toEqual(false);
  });

  it.each<[string, boolean]>([
    [USDT_CONTRACT, true],
    [OSMOSIS_FURYA_DENOM, true],
    ["foobar", false]
  ])("test-isInPairList", (identifier, expectedResult) => {
    expect(isInPairList(identifier)).toEqual(expectedResult);
  });
});
