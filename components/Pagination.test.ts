import { getPaginationArr } from "./Pagination";

const arr = ["pizza", "hamburger", "sushi", "banana", "apple"];

describe("Pagination", () => {
  it("should return all for falsy", () => {
    const result = getPaginationArr(arr, 0, 0);
    expect(result).toStrictEqual([
      "pizza",
      "hamburger",
      "sushi",
      "banana",
      "apple",
    ]);
  });

  it("should return with 1 padding at index 2", () => {
    const result = getPaginationArr(arr, 1, 2);
    expect(result).toStrictEqual(["hamburger", "sushi", "banana"]);
  });

  it("should return with 1 padding at index 3", () => {
    const result = getPaginationArr(arr, 1, 3);
    expect(result).toStrictEqual(["sushi", "banana", "apple"]);
  });

  it("should return with 1 padding at index 4", () => {
    const result = getPaginationArr(arr, 1, 4);
    expect(result).toStrictEqual(["sushi", "banana", "apple"]);
  });

  it("should return with 2 padding at index 2", () => {
    const result = getPaginationArr(arr, 2, 2);
    expect(result).toStrictEqual([
      "pizza",
      "hamburger",
      "sushi",
      "banana",
      "apple",
    ]);
  });

  it("should return with 3 padding at index 2", () => {
    const result = getPaginationArr(arr, 3, 2);
    expect(result).toStrictEqual([
      "pizza",
      "hamburger",
      "sushi",
      "banana",
      "apple",
    ]);
  });

  it("should return with 1 padding at index 0", () => {
    const result = getPaginationArr(arr, 1, 0);
    expect(result).toStrictEqual(["pizza", "hamburger", "sushi"]);
  });

  it("should return with 1 padding at index 1", () => {
    const result = getPaginationArr(arr, 1, 1);
    expect(result).toStrictEqual(["pizza", "hamburger", "sushi"]);
  });

  it("should return with 1 padding at index 2", () => {
    const result = getPaginationArr(arr, 1, 2);
    expect(result).toStrictEqual(["hamburger", "sushi", "banana"]);
  });

  it("should return with 2 padding at index 0", () => {
    const result = getPaginationArr(arr, 2, 0);
    expect(result).toStrictEqual([
      "pizza",
      "hamburger",
      "sushi",
      "banana",
      "apple",
    ]);
  });

  it("should return with 2 padding at index 1", () => {
    const result = getPaginationArr(arr, 2, 1);
    expect(result).toStrictEqual([
      "pizza",
      "hamburger",
      "sushi",
      "banana",
      "apple",
    ]);
  });

  it("should return with 3 padding at index 4", () => {
    const result = getPaginationArr(arr, 3, 4);
    expect(result).toStrictEqual([
      "pizza",
      "hamburger",
      "sushi",
      "banana",
      "apple",
    ]);
  });

  it("should return with 8 padding at index 8", () => {
    const sixteenItems = new Array(16).fill(null).map((_, i) => i + 1);
    const result = getPaginationArr(sixteenItems, 8, 8);
    expect(result).toStrictEqual(sixteenItems);
  });
});
