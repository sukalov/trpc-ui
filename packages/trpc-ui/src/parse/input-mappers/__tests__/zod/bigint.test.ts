import { z } from "zod";
import type { NumberNode } from "../../../parseNodeTypes";
import { defaultReferences } from "../../defaultReferences";
import { parseZodBigIntDef } from "../../zod/parsers/parseZodBigIntDef";

describe("Zod BigInt", () => {
  it("should parse a big end as a number node", () => {
    const expected: NumberNode = {
      type: "number",
      path: [],
    };
    const schema = z.bigint();
    const parsed = parseZodBigIntDef(schema.def as unknown as Parameters<typeof parseZodBigIntDef>[0], defaultReferences());
    expect(parsed).toStrictEqual(expected);
  });
});
