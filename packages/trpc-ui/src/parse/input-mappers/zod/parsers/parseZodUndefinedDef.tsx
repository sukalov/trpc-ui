import type {
  ParseReferences,
  ParsedInputNode,
} from "@src/parse/parseNodeTypes";
import { nodePropertiesFromRef } from "@src/parse/utils";
import type { ZodUndefinedDef } from "../zod-types";

export function parseZodUndefinedDef(
  def: ZodUndefinedDef,
  refs: ParseReferences,
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def as any, refs);
  return {
    type: "literal",
    value: undefined,
    ...nodePropertiesFromRef(refs),
  };
}
