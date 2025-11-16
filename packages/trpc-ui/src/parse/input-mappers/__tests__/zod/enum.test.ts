import { defaultReferences } from "@src/parse/input-mappers/defaultReferences";
import { parseZodEnumDef } from "@src/parse/input-mappers/zod/parsers/parseZodEnumDef";
import { toV3EnumDef } from "@src/parse/input-mappers/zod/v4-compat";
import type { EnumNode } from "@src/parse/parseNodeTypes";
import { z } from "zod";

describe("Parse ZodEnum", () => {
  it("should parse a zod enum", () => {
    const expected: EnumNode = {
      type: "enum",
      enumValues: ["one", "two", "three"],
      path: [],
    };
    const parsed = parseZodEnumDef(
      toV3EnumDef(z.enum(["one", "two", "three"])._def),
      defaultReferences(),
    );
    expect(expected).toStrictEqual(parsed);
  });
});
