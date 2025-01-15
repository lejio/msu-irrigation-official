// ./src/sanity/schemaTypes/index.ts
import type { SchemaTypeDefinition } from "sanity";
import { authorType } from "./author";
import { blockContentType } from "./blockContent";
import { articleType } from "./article";
import { membersType } from "./members";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [authorType, blockContentType, articleType, membersType],
};