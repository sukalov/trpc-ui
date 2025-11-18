import { zodSelectorFunction } from "@src/parse/input-mappers/zod/selector";
import type {
  ParseReferences,
  ParsedInputNode,
} from "@src/parse/parseNodeTypes";
import type { ZodPipeDef } from "../zod-types";

export function parseZodEffectsDef(
  def: ZodPipeDef,
  refs: ParseReferences,
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def as any, refs);
  return zodSelectorFunction(def.in._def, refs);
}
