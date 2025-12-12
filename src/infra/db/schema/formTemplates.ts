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

// Ajustado para reflejar la estructura real de la base de datos según introspección
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
		// Asegúrate de importar el esquema de users y usar la columna correcta
		foreignKey({
			columns: [table.createdBy],
			foreignColumns: [
				// Importa y usa la columna id de la tabla users
				// Asegúrate de importar { users } desde el schema correspondiente arriba
				user.id,
			],
			name: "form_templates_created_by_fkey",
		}).onDelete("set null"),
	]
);
