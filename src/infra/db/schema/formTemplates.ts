import {
	boolean,
	foreignKey,
	index,
	integer,
	json,
	pgTable,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { user } from "../schema";

// Adjusted to reflect the real database structure according to introspection
export const formTemplates = pgTable(
	"form_templates",
	{
		id: serial().primaryKey().notNull(),
		name: varchar().notNull(),
		description: varchar().notNull(),
		structure: json().notNull(),
		createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
		isCustom: boolean("is_custom"),
		createdBy: integer("created_by"),
	},
	(table) => [
		index("ix_form_templates_id").using("btree", table.id.asc().nullsLast().op("int4_ops")),
		// Make sure to import the users schema and use the correct column
		foreignKey({
			columns: [table.createdBy],
			foreignColumns: [
				// Import and use the id column from the users table
				// Make sure to import { user } from the corresponding schema above
				user.id,
			],
			name: "form_templates_created_by_fkey",
		}).onDelete("set null"),
	]
);
