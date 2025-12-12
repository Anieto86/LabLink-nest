import {
	bigint,
	bigserial,
	foreignKey,
	index,
	json,
	pgTable,
	timestamp,
} from "drizzle-orm/pg-core";
import { formTemplates } from "./formTemplates";

export const formVersions = pgTable(
	"form_versions",
	{
		id: bigserial({ mode: "bigint" }).primaryKey().notNull(),
		formId: bigint("form_id", { mode: "number" }).notNull(),
		previousStructure: json("previous_structure").notNull(),
		modifiedAt: timestamp("modified_at", { mode: "string" }).defaultNow(),
	},
	(table) => [
		index("ix_form_versions_id").using("btree", table.id.asc().nullsLast().op("int8_ops")),
		foreignKey({
			columns: [table.formId],
			foreignColumns: [formTemplates.id],
			name: "form_versions_form_id_fkey",
		}).onDelete("cascade"),
	]
);
