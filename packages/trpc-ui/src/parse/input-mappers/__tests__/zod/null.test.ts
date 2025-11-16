import { defaultReferences } from "@src/parse/input-mappers/defaultReferences";
import { parseZodNullDef } from "@src/parse/input-mappers/zod/parsers/parseZodNullDef";
import type { LiteralNode } from "@src/parse/parseNodeTypes";
import { z } from "zod";

describe("Parse ZodNull", () => {
  it("should parse a zod nullable as a literal with value null", () => {
    const expected: LiteralNode = {
      type: "literal",
      value: null,
      path: [],
    };
    const schema = z.null();
    expect(parseZodNullDef(schema.def as unknown as Parameters<typeof parseZodNullDef>[0], defaultReferences())).toStrictEqual(
      expected,
    );
  });
});
