// ./src/sanity/schemaTypes/index.ts
import type { SchemaTypeDefinition } from "sanity";
import { membersType } from "./members";
import { blockContentType } from "./blockContent";
import { articleType } from "./article";
import { teamType } from "./team";
import { titleType } from "./title";
import { publicationType } from "./publications";
import { researchType } from "./research";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [publicationType, researchType, blockContentType, articleType, teamType,membersType, titleType],
};