import { defaultReferences } from "@src/parse/input-mappers/defaultReferences";
import { parseZodDefaultDef } from "@src/parse/input-mappers/zod/parsers/parseZodDefaultDef";
import { toV3DefaultDef } from "@src/parse/input-mappers/zod/v4-compat";
import type { ParsedInputNode } from "@src/parse/parseNodeTypes";
import { z } from "zod";

describe("Parse ZodDefault", () => {
  it("should parse zod number with default as number", () => {
    const expected: ParsedInputNode = {
      type: "number",
      path: [],
    };
    const zodSchema = z.number().default(5);
    const parsed = parseZodDefaultDef(toV3DefaultDef(zodSchema._def), defaultReferences());
    expect(parsed).toStrictEqual(expected);
  });
});
