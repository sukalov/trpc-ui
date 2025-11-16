import { z } from "zod";

import type { ParsedInputNode } from "../../../parseNodeTypes";
import { defaultReferences } from "../../defaultReferences";
import { zodSelectorFunction } from "../../zod/selector";
import { castToZodDefWithType } from "../../zod/zod-types";

describe("Parsed ZodBranded", () => {
  it("should parse branded nodes as their base zod type", () => {
    const testCases: {
      node: ParsedInputNode;
      zodType: ReturnType<typeof z.number> | ReturnType<typeof z.string>;
    }[] = [
      {
        node: {
          type: "number",
          path: [],
        },
        zodType: z.number().brand("number"),
      },
      {
        node: {
          type: "string",
          path: [],
        },
        zodType: z.string().brand("string"),
      },
    ];
    for (const testCase of testCases) {
      // In Zod v4, branded types don't have a separate def structure
      // They're just the underlying type, so we parse them directly
      const parsed = zodSelectorFunction(
        castToZodDefWithType((testCase.zodType as { _def: unknown })._def),
        defaultReferences(),
      );
      expect(parsed).toStrictEqual(testCase.node);
    }
  });
});
