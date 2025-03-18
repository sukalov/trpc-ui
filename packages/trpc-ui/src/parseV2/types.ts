import type { JSONSchema7Type } from "json-schema";

/**
 * Type representing the validator types supported by the parser
 */
export type ValidatorType = "zod" | "valibot" | "arktype" | "unknown" | "mixed";

/**
 * Base type for common properties shared by routers and procedures
 */
export type BaseNodeType = {
  path: string[];
};

/**
 * Type representing metadata that can be attached to a procedure
 */
export type ProcedureMeta = Record<string, any>;

/**
 * Type representing any procedure (query or mutation)
 */
export type Procedure = BaseNodeType & {
  type: "mutation" | "query";
  meta: ProcedureMeta;
  validator: ValidatorType;
  schema?: JSONSchema7Type;
};

/**
 * Type for a tRPC router
 */
export type Router = BaseNodeType & {
  type: "router";
  children: ParsedTRPCRouter;
};

/**
 * Type representing the output of the parseTRPCRouter function
 */
export type ParsedTRPCRouter = Record<string, Router | Procedure>;
