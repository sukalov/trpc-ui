import { CollapsableSection } from "@src/react-app/components/CollapsableSection";

import React from "react";

import { Form } from "./Form";

import type { Router, Procedure } from "@src/parseV2/types";

export function Container({ item }: { item: Router | Procedure }) {
  if (item.type === "router") {
    return (
      <CollapsableSection
        fullPath={item.path}
        titleElement={item.path.at(-1)}
        sectionType={"router"}
        isRoot={false}
      >
        <div className="space-y-1 border-l-grey-400 p-1">
          {Object.entries(item.children).map(([_key, routerOrProcedure]) => {
            return <Container item={routerOrProcedure} />;
          })}
        </div>
      </CollapsableSection>
    );
  }
  return (
    <CollapsableSection
      fullPath={item.path}
      sectionType={item.type}
      isRoot={false}
      titleElement={item.path.at(-1)}
    >
      <Form procedure={item} />
    </CollapsableSection>
  );
}
