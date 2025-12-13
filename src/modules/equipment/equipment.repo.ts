import { eq, type InferInsertModel } from "drizzle-orm";
import { db } from "src/infra/db/client";
import { equipment } from "src/infra/db/schema";

type NewEquipment = InferInsertModel<typeof equipment>;
type UpdatableEquipment = Omit<
	InferInsertModel<typeof equipment>,
	"id" | "createdAt" | "updatedAt"
>;

export const EquipmentRepo = {
	findById: async (id: number) => {
		const [row] = await db.select().from(equipment).where(eq(equipment.id, id)).limit(1);
		return row ?? null;
	},

	findAll: async () => {
		return await db.select().from(equipment);
	},

	create: async (newEquipment: NewEquipment) => {
		const [row] = await db.insert(equipment).values(newEquipment).returning();
		return row;
	},

	updateById: async (id: number, updateData: Partial<UpdatableEquipment>) => {
		const [row] = await db
			.update(equipment)
			.set(updateData)
			.where(eq(equipment.id, id))
			.returning();
		return row ?? null;
	},

	deleteById: async (id: number) => {
		const [row] = await db.delete(equipment).where(eq(equipment.id, id)).returning();
		return row ?? null;
	},
};
