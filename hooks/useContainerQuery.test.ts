import { queryWithPixels } from "./useContainerQuery";

describe("queryWithPixels", () => {
  it("should convert query from rems to pixels", () => {
    const query = {
      foo: {
        minWidth: 10,
        maxWidth: 10,
      },
    };
    const result = queryWithPixels(query, 16);
    expect(result).toEqual({
      foo: {
        minWidth: 160,
        maxWidth: 159,
      },
    });
  });
});
