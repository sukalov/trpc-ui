import { zodSelectorFunction } from "@src/parse/input-mappers/zod/selector";
import type {
  ParseReferences,
  ParsedInputNode,
} from "@src/parse/parseNodeTypes";
import type { ZodNullableDef } from "zod/v3";
import { castToZodDefWithType } from "../zod-types";

export function parseZodNullableDef(
  def: ZodNullableDef,
  refs: ParseReferences,
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return zodSelectorFunction(castToZodDefWithType(def.innerType._def), refs);
}
