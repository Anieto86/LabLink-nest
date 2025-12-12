import { foreignKey, index, integer, json, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { formTemplates } from "./formTemplates";
import { user } from "./users";

export const experimentRecords = pgTable(
	"experiment_records",
	{
		id: serial().primaryKey().notNull(),
		formId: integer("form_id"),
		userId: integer("user_id").notNull(),
		data: json().notNull(),
		createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
	},
	(table) => [
		index("ix_experiment_records_id").using("btree", table.id.asc().nullsLast().op("int4_ops")),
		// Import formTemplates and users tables at the top of this file:
		// import { formTemplates } from "./formTemplates";
		// import { users } from "./users";
		foreignKey({
			columns: [table.formId],
			foreignColumns: [formTemplates.id], // Reference the primary key of formTemplates
			name: "experiment_records_form_id_fkey",
		}),
		foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id], // Reference the primary key of user
			name: "experiment_records_user_id_fkey",
		}).onDelete("cascade"),
	]
);
