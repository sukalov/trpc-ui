import { z } from "zod";
import type { ArrayNode, ObjectNode } from "../../../parseNodeTypes";
import { defaultReferences } from "../../defaultReferences";
import { parseZodArrayDef } from "../../zod/parsers/parseZodArrayDef";
import { parseZodObjectDef } from "../../zod/parsers/parseZodObjectDef";

describe("Parse Zod Array", () => {
  it("should parse a string array schema", () => {
    const expected: ArrayNode = {
      type: "array",
      childType: {
        type: "string",
        path: [],
      },
      path: [],
    };
    const schema = z.string().array();
    const parsed = parseZodArrayDef(schema.def as unknown as Parameters<typeof parseZodArrayDef>[0], defaultReferences());
    expect(parsed).toStrictEqual(expected);
  });

  it("should pass an empty array as the path for object-nested array childType", () => {
    const expected: ObjectNode = {
      type: "object",
      children: {
        childArray: {
          type: "array",
          path: ["childArray"],
          childType: {
            type: "string",
            path: [],
          },
        },
      },
      path: [],
    };
    const schema = z.object({
      childArray: z.string().array(),
    });
    const parsed = parseZodObjectDef(schema.def as unknown as Parameters<typeof parseZodObjectDef>[0], defaultReferences());
    expect(parsed).toStrictEqual(expected);
  });
});
