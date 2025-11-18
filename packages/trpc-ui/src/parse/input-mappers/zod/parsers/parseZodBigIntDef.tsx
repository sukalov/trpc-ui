import type {
  ParseReferences,
  ParsedInputNode,
} from "@src/parse/parseNodeTypes";
import { nodePropertiesFromRef } from "@src/parse/utils";
import type { ZodBigIntDef } from "../zod-types";

export function parseZodBigIntDef(
  def: ZodBigIntDef,
  refs: ParseReferences,
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def as any, refs);
  return {
    type: "number",
    ...nodePropertiesFromRef(refs),
  };
}
