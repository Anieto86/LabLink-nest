import type { InferInsertModel } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { db } from "../../infra/db/client";
import { laboratories } from "../../infra/db/schema";

type NewLaboratory = Omit<InferInsertModel<typeof laboratories>, "id" | "createdAt">;
type UpdatableLaboratory = Partial<NewLaboratory>;

export const LaboratoryRepo = {
	findAll: async () => {
		return await db.select().from(laboratories);
	},

	findById: async (id: number) => {
		const [row] = await db.select().from(laboratories).where(eq(laboratories.id, id)).limit(1);
		return row ?? null;
	},

	create: async (data: NewLaboratory) => {
		const [newLaboratory] = await db.insert(laboratories).values(data).returning();
		return newLaboratory;
	},

	update: async (id: number, data: UpdatableLaboratory) => {
		const [updated] = await db
			.update(laboratories)
			.set(data)
			.where(eq(laboratories.id, id))
			.returning();
		return updated ?? null;
	},

	delete: async (id: number) => {
		const [deleted] = await db.delete(laboratories).where(eq(laboratories.id, id)).returning();
		return deleted ?? null;
	},
};
