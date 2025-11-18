import { zodSelectorFunction } from "@src/parse/input-mappers/zod/selector";
import type {
  ParseReferences,
  ParsedInputNode,
} from "@src/parse/parseNodeTypes";
import type { ZodPromiseDef } from "../zod-types";

export function parseZodPromiseDef(
  def: ZodPromiseDef,
  refs: ParseReferences,
): ParsedInputNode {
  const d = def as any;
  const type = d.type || d.element;
  const childType = zodSelectorFunction(type._def, { ...refs, path: [] });
  refs.addDataFunctions.addDescriptionIfExists(def as any, refs);
  return childType;
}
