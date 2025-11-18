import { nodePropertiesFromRef } from "@src/parse/utils";
import type { ZodObject } from "zod";
import type {
  DiscriminatedUnionNode,
  ParseFunction,
} from "../../../parseNodeTypes";
import { zodSelectorFunction } from "../selector";

import type { ZodDiscriminatedUnionDef } from "../zod-types";


function makeDefConsistent(def: any): {
  typeName: "ZodDiscriminatedUnion";
  discriminator: string;
  options: Map<string, ZodObject<any>>;
} {
  const d = def as any;
  const discriminator = d.discriminator;
  const options = d.optionsMap || new Map(d.options.map((opt: any) => [opt._def.discriminator, opt]));
  return {
    typeName: "ZodDiscriminatedUnion",
    discriminator: discriminator,
    options: options,
  };
}

export const parseZodDiscriminatedUnionDef: ParseFunction<
  ZodDiscriminatedUnionDef,
  DiscriminatedUnionNode
> = (def, refs) => {
  const defConsistent = makeDefConsistent(def);
  const entries = Array.from(defConsistent.options.entries());
  const nodeEntries = entries.map(([discriminatorValue, zodObj]) => [
    discriminatorValue,
    zodSelectorFunction((zodObj as any)._def as any, refs),
  ]);

  const nodesMap = Object.fromEntries(nodeEntries);
  refs.addDataFunctions.addDescriptionIfExists(def as any, refs);
  return {
    type: "discriminated-union",
    discriminatedUnionValues: entries.map(([n]) => n),
    discriminatedUnionChildrenMap: nodesMap,
    discriminatorName: (def as any).discriminator,
    ...nodePropertiesFromRef(refs),
  };
};
