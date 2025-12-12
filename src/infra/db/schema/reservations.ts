import { date, foreignKey, index, integer, pgTable, serial, time } from "drizzle-orm/pg-core";
import { user } from "./users";
import { laboratories } from "./laboratories";
import { equipments } from "drizzle/migrations/schema";

export const reservations = pgTable(
	"reservations",
	{
		id: serial().primaryKey().notNull(),
		laboratoryId: integer("laboratory_id"),
		equipmentId: integer("equipment_id"),
		userId: integer("user_id"),
		reservationDate: date("reservation_date"),
		startTime: time("start_time"),
		endTime: time("end_time"),
	},
	(table) => [
		index("ix_reservations_id").using("btree", table.id.asc().nullsLast().op("int4_ops")),
		foreignKey({
			columns: [table.laboratoryId],
			foreignColumns: [laboratories.id], // Ajusta si tienes el schema de laboratories importado
			name: "reservations_laboratory_id_fkey",
		}).onDelete("set null"),
		foreignKey({
			columns: [table.equipmentId],
			foreignColumns: [equipments.id], // Ajusta si tienes el schema de equipment importado
			name: "reservations_equipment_id_fkey",
		}).onDelete("set null"),
		foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id], // Ajusta si tienes el schema de users importado
			name: "reservations_user_id_fkey",
		}).onDelete("set null"),
	]
);
