import type { Procedure } from "@src/parseV2/types";
import { JsonForms } from "@jsonforms/react";
import React from "react";

import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";

import { useState } from "react";

export function Form({ procedure }: { procedure: Procedure }) {
  const [data, setData] = useState<object>({});
  if (!procedure.schema) {
    return "No Schema";
  }

  return (
    <JsonForms
      schema={procedure.schema}
      data={data}
      renderers={materialRenderers}
      cells={materialCells}
      onChange={({ data }) => setData(data)}
    />
  );
}
