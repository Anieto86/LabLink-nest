import {
	date,
	foreignKey,
	index,
	integer,
	pgTable,
	serial,
	text,
	varchar,
} from "drizzle-orm/pg-core";
import { laboratories } from "../schema/laboratories";

export const storage = pgTable(
	"storage",
	{
		id: serial().primaryKey().notNull(),
		name: varchar().notNull(),
		type: text(),
		quantity: integer("quantity"),
		unit: varchar(),
		location: varchar(),
		expirationDate: date("expiration_date"),
		laboratoryId: integer("laboratory_id"),
	},
	(table) => [
		index("ix_storage_id").using("btree", table.id.asc().nullsLast().op("int4_ops")),
		foreignKey({
			columns: [table.laboratoryId],
			foreignColumns: [laboratories.id], // Adjust if you have the laboratories schema imported
			name: "storage_laboratory_id_fkey",
		}).onDelete("set null"),
	]
);
