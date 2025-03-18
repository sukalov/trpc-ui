import { CollapsableSection } from "@src/react-app/components/CollapsableSection";

import React from "react";

import { Form } from "./Form";

import type { Router, Procedure } from "@src/parseV2/types";

export function Container({ item }: { item: Router | Procedure }) {
  if (item.type === "router") {
    return Object.entries(item.children).map(([_key, routerOrProcedure]) => (
      <CollapsableSection
        fullPath={routerOrProcedure.path}
        titleElement={item.path.toString()}
        sectionType={"router"}
        isRoot={false}
      >
        <div className="space-y-1 border-l-grey-400 p-1">
          <Container item={routerOrProcedure} />
        </div>
      </CollapsableSection>
    ));
  }
  return (
    <CollapsableSection
      fullPath={item.path}
      sectionType={item.type}
      isRoot={false}
      titleElement={item.path.toString()}
    >
      <Form procedure={item} />
    </CollapsableSection>
  );
}
