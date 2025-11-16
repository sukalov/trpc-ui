import type {
  JSON7SchemaType,
  ProcedureType,
  TrpcPanelExtraOptions,
} from "./parseRouter";
import {
  type Procedure,
  isMutationDef,
  isQueryDef,
  isSubscriptionDef,
} from "./routerType";

import type {
  AddDataFunctions,
  ParseReferences,
  ParsedInputNode,
} from "@src/parse/parseNodeTypes";
import { type ZodObject, z, toJSONSchema } from "zod";
import { zodSelectorFunction } from "./input-mappers/zod/selector";
import { castToZodDefWithType } from "./input-mappers/zod/zod-types";

export type ProcedureExtraData = {
  parameterDescriptions: { [path: string]: string };
  description?: string;
};

export type ParsedProcedure = {
  inputSchema: JSON7SchemaType;
  node: ParsedInputNode;
  nodeType: "procedure";
  procedureType: ProcedureType;
  pathFromRootRouter: string[];
  extraData: ProcedureExtraData;
};

type SupportedInputType = "zod";

const inputParserMap = {
  zod: (zodObject: ZodObject<any>, refs: ParseReferences) => {
    return zodSelectorFunction(castToZodDefWithType(zodObject.def), refs);
  },
};

function inputType(_: unknown): SupportedInputType | "unsupported" {
  return "zod";
}

type NodeAndInputSchemaFromInputs =
  | {
      node: ParsedInputNode;
      schema: JSON7SchemaType;
      parseInputResult: "success";
    }
  | {
      parseInputResult: "failure";
    };

const emptyZodObject = z.object({});
function nodeAndInputSchemaFromInputs(
  inputs: unknown[],
  _routerPath: string[],
  options: TrpcPanelExtraOptions,
  addDataFunctions: AddDataFunctions,
): NodeAndInputSchemaFromInputs {
  if (!inputs.length) {
    return {
      parseInputResult: "success",
      schema: toJSONSchema(emptyZodObject),
      node: inputParserMap.zod(emptyZodObject, {
        path: [],
        options,
        addDataFunctions,
      }),
    };
  }

  let input = inputs[0];
  if (inputs.length < 1) {
    return { parseInputResult: "failure" };
  }

  if (inputs.length > 1) {
    const allInputsAreZodObjects = inputs.every(
      (input) => input instanceof z.ZodObject,
    );
    if (!allInputsAreZodObjects) {
      return { parseInputResult: "failure" };
    }

    input = inputs.reduce(
      (acc, input: z.ZodObject<any>) => (acc as z.ZodObject<any>).merge(input),
      emptyZodObject,
    );
  }

  const iType = inputType(input);
  if (iType === "unsupported") {
    return { parseInputResult: "failure" };
  }

  return {
    parseInputResult: "success",
    schema: toJSONSchema(input as any),
    node: zodSelectorFunction(castToZodDefWithType((input as any).def), {
      path: [],
      options,
      addDataFunctions,
    }),
  };
}

export function parseProcedure(
  procedure: Procedure,
  path: string[],
  options: TrpcPanelExtraOptions,
): ParsedProcedure | null {
  const { _def } = procedure;
  const { inputs } = _def;
  const parseExtraData: ProcedureExtraData = {
    parameterDescriptions: {},
  };
  const nodeAndInput = nodeAndInputSchemaFromInputs(inputs, path, options, {
    addDescriptionIfExists: (def, refs) => {
      if (def.description) {
        parseExtraData.parameterDescriptions[refs.path.join(".")] =
          def.description;
      }
    },
  });
  if (nodeAndInput.parseInputResult === "failure") {
    return null;
  }

  const t = (() => {
    if (isQueryDef(_def)) return "query";
    if (isMutationDef(_def)) return "mutation";
    if (isSubscriptionDef(_def)) return "subscription";
    return null;
  })();

  if (!t) {
    return null;
  }

  return {
    inputSchema: nodeAndInput.schema,
    node: nodeAndInput.node,
    nodeType: "procedure",
    procedureType: t,
    pathFromRootRouter: path,
    extraData: {
      ...parseExtraData,
      ...(procedure._def.meta?.description && {
        description: procedure._def.meta.description,
      }),
    },
  };
}
