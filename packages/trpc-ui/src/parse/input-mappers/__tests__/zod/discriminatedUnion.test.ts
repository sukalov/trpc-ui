import { z } from "zod";
import type { DiscriminatedUnionNode } from "../../../parseNodeTypes";
import { defaultReferences } from "../../defaultReferences";
import { parseZodDiscriminatedUnionDef } from "../../zod/parsers/parseZodDiscriminatedUnionDef";

describe("parseZodDiscriminatedUnionDef", () => {
  it("should parse a discriminated union def", () => {
    const expected: DiscriminatedUnionNode = {
      type: "discriminated-union",
      discriminatorName: "type",
      discriminatedUnionValues: ["a", "b"],
      discriminatedUnionChildrenMap: {
        a: {
          type: "object",
          path: [],
          children: {
            type: {
              type: "literal",
              path: ["type"],
              value: "a",
            },
          },
        },
        b: {
          type: "object",
          path: [],
          children: {
            type: {
              type: "literal",
              path: ["type"],
              value: "b",
            },
          },
        },
      },
      path: [],
    };
    const zodSchema = z.discriminatedUnion("type", [
      z.object({
        type: z.literal("a"),
      }),
      z.object({
        type: z.literal("b"),
      }),
    ]);
    const parsedZod = parseZodDiscriminatedUnionDef(
      zodSchema._def as any,
      defaultReferences(),
    );
    expect(parsedZod).toStrictEqual(expected);
  });
});
