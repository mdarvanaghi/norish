import { describe, it, expect } from "vitest";

import { extractPreparation } from "@/lib/parse-preparation";

describe("extractPreparation", () => {
  it("splits on the first comma", () => {
    const result = extractPreparation("carrot, cubed");

    expect(result.name).toBe("carrot");
    expect(result.preparation).toBe("cubed");
  });

  it("handles multi-word preparation", () => {
    const result = extractPreparation("onion, finely chopped");

    expect(result.name).toBe("onion");
    expect(result.preparation).toBe("finely chopped");
  });

  it("returns null preparation when no comma is present", () => {
    const result = extractPreparation("chicken breast");

    expect(result.name).toBe("chicken breast");
    expect(result.preparation).toBeNull();
  });

  it("only splits on the first comma, treating the rest as preparation", () => {
    const result = extractPreparation("tomato, peeled, deseeded");

    expect(result.name).toBe("tomato");
    expect(result.preparation).toBe("peeled, deseeded");
  });

  it("trims whitespace from both parts", () => {
    const result = extractPreparation("  carrot  ,  cubed  ");

    expect(result.name).toBe("carrot");
    expect(result.preparation).toBe("cubed");
  });

  it("returns null preparation when nothing follows the comma", () => {
    const result = extractPreparation("carrot,");

    expect(result.name).toBe("carrot");
    expect(result.preparation).toBeNull();
  });

  it("returns null preparation when only whitespace follows the comma", () => {
    const result = extractPreparation("carrot,   ");

    expect(result.name).toBe("carrot");
    expect(result.preparation).toBeNull();
  });

  it("treats whole string as name when comma is the first character", () => {
    const result = extractPreparation(", cubed");

    expect(result.name).toBe(", cubed");
    expect(result.preparation).toBeNull();
  });

  it("handles empty string", () => {
    const result = extractPreparation("");

    expect(result.name).toBe("");
    expect(result.preparation).toBeNull();
  });
});
