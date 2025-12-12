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
import { laboratories } from "../schema";

export const experiments = pgTable(
	"experiments",
	{
		id: serial().primaryKey().notNull(),
		name: varchar().notNull(),
		description: text(),
		startDate: date("start_date"),
		endDate: date("end_date"),
		laboratoryId: integer("laboratory_id"),
	},
	(table) => [
		index("ix_experiments_id").using("btree", table.id.asc().nullsLast().op("int4_ops")),
		foreignKey({
			columns: [table.laboratoryId],
			foreignColumns: [laboratories.id],
			name: "experiments_laboratory_id_fkey",
		}).onDelete("set null"),
	]
);
