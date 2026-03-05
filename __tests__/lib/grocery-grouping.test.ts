import { describe, it, expect } from "vitest";

import {
  normalizeIngredientNameForGrouping,
  groupGroceriesByIngredient,
} from "@/lib/grocery-grouping";
import type { GroceryDto } from "@/types";

describe("normalizeIngredientNameForGrouping", () => {
  it("lowercases the name", () => {
    expect(normalizeIngredientNameForGrouping("Carrot")).toBe("carrot");
  });

  it("strips comma-separated preparation instructions", () => {
    expect(normalizeIngredientNameForGrouping("carrot, cubed")).toBe("carrot");
  });

  it("strips multi-word preparation instructions", () => {
    expect(normalizeIngredientNameForGrouping("onion, finely chopped")).toBe("onion");
  });

  it("leaves names without commas unchanged", () => {
    expect(normalizeIngredientNameForGrouping("chicken breast")).toBe("chicken breast");
  });

  it("returns empty string for null", () => {
    expect(normalizeIngredientNameForGrouping(null)).toBe("");
  });
});

describe("groupGroceriesByIngredient — preparation grouping", () => {
  const makeGrocery = (id: string, name: string): GroceryDto => ({
    id,
    userId: "user-1",
    name,
    unit: null,
    amount: 1,
    isDone: false,
    sortOrder: 0,
    storeId: null,
    recipeIngredientId: null,
    recurringGroceryId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  it("groups groceries with different preparation instructions together", () => {
    const groceries = [
      makeGrocery("1", "carrot, cubed"),
      makeGrocery("2", "carrot, diced"),
    ];

    const result = groupGroceriesByIngredient(groceries, () => null);
    const groups = result.get(null) ?? [];

    expect(groups).toHaveLength(1);
    expect(groups[0].displayName).toBe("carrot");
    expect(groups[0].sources).toHaveLength(2);
  });

  it("groups prep-suffixed grocery with plain-name grocery", () => {
    const groceries = [
      makeGrocery("1", "carrot"),
      makeGrocery("2", "carrot, grated"),
    ];

    const result = groupGroceriesByIngredient(groceries, () => null);
    const groups = result.get(null) ?? [];

    expect(groups).toHaveLength(1);
    expect(groups[0].sources).toHaveLength(2);
  });

  it("does not group different ingredients", () => {
    const groceries = [
      makeGrocery("1", "carrot, cubed"),
      makeGrocery("2", "onion, diced"),
    ];

    const result = groupGroceriesByIngredient(groceries, () => null);
    const groups = result.get(null) ?? [];

    expect(groups).toHaveLength(2);
  });
});
