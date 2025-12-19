import type { InferSelectModel } from "drizzle-orm";
import type { formTemplates } from "src/infra/db/schema";
import type { FormTemplateRead } from "./entities/form-templates.entity";

type FormTemplateRow = InferSelectModel<typeof formTemplates>;

export const toFormTemplateRead = (row: FormTemplateRow): FormTemplateRead => ({
	id: row.id,
	name: row.name,
	description: row.description,
	structure: row.structure,
	createdBy: row.createdBy,
	createdAt: row.createdAt,
});
