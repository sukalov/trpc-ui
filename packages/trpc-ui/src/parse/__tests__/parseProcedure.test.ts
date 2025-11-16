import { parseTestRouter, parseTestRouterInputSchema, testMutationExpectedParseResult, testQueryExpectedParseResult, testTrpcInstance } from "@src/parse/__tests__/utils/router";
import { testSchemas } from "@src/parse/__tests__/utils/schemas";
import { ParsedProcedure, parseProcedure } from "@src/parse/parseProcedure";

import type { Procedure } from "@src/parse/routerType";
import { z, toJSONSchema } from "zod";

describe("Parse TRPC Procedure", () => {
  it("should parse the test query", () => {
    // IDK how to type this
    const testQuery = parseTestRouter.testQuery as unknown as Procedure;
    const parsedProcedure = parseProcedure(testQuery, ["testQuery"], {});
    expect(testQueryExpectedParseResult).toStrictEqual(parsedProcedure);
  });
  it("should parse the test mutation", () => {
    // IDK how to type this
    const testQuery = parseTestRouter.testMutation as unknown as Procedure;
    const parsedProcedure = parseProcedure(testQuery, ["testMutation"], {});
    expect(testMutationExpectedParseResult).toStrictEqual(parsedProcedure);
  });
  it("should parse the meta description if it exists", () => {
    const description = "It's a good description";
    const { testQuery } = testTrpcInstance.router({
      testQuery: testTrpcInstance.procedure
        .meta({ description })
        .input(parseTestRouterInputSchema)
        .query(() => "nope"),
    });
    const expected = {
      ...testQueryExpectedParseResult,
      extraData: {
        ...testQueryExpectedParseResult.extraData,
        description,
      },
    };

    const parsed = parseProcedure(
      testQuery as unknown as Procedure,
      ["testQuery"],
      {},
    );
    expect(parsed).toStrictEqual(expected);
  });
  it("should parse input descriptions if they exist for common types", () => {
    // good luck understanding this
    const description = "A description";
    // Filter out undefined and bigint schemas since Zod v4's toJSONSchema doesn't support them
    const testSchemasWithDescriptions = testSchemas
      .filter((_, i) => i !== 3 && i !== 5) // Skip undefined (3) and bigint (5) schemas
      .map((e, i) => ({
        ...e,
        schema: e.schema.describe(description + i),
      }));
    const inputSchema = z.object({
      ...Object.fromEntries(
        testSchemasWithDescriptions.map((e, i) => [i, e.schema]),
      ),
    });
    const expected: ParsedProcedure = {
      nodeType: "procedure",
      inputSchema: toJSONSchema(inputSchema),
      pathFromRootRouter: ["testQuery"],
      procedureType: "query",
      extraData: {
        parameterDescriptions: {
          ...Object.fromEntries(
            testSchemasWithDescriptions.map((_, i) => [i, description + i]),
          ),
        },
      },
      node: {
        type: "object",
        path: [],
        children: {
          ...Object.fromEntries(
            testSchemasWithDescriptions.map((e, i) => [i, e.parsed]),
          ),
        },
      },
    };
    const testRouter = testTrpcInstance.router({
      testQuery: testTrpcInstance.procedure
        .input(inputSchema)
        .query(() => "nothing"),
    });
    const parsed = parseProcedure(
      testRouter.testQuery as unknown as Procedure,
      ["testQuery"],
      {},
    );
    expect(parsed).toStrictEqual(expected);
  });
  it("should parse descriptions from nested objects with the appropriate path", () => {});
});
