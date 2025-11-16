import { nodePropertiesFromRef } from "@src/parse/utils";
import type { ZodUnionDef } from "zod/v3";
import type {
  LiteralNode,
  ParseFunction,
  UnionNode,
} from "../../../parseNodeTypes";
import { zodSelectorFunction } from "../selector";
import { castToZodDefWithType } from "../zod-types";

export const parseZodUnionDef: ParseFunction<ZodUnionDef, UnionNode> = (
  def,
  refs,
) => {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return {
    type: "union",
    values: def.options.map(
      (o) => zodSelectorFunction(castToZodDefWithType(o._def), { ...refs, path: [] }) as LiteralNode,
    ),
    ...nodePropertiesFromRef(refs),
  };
};
