/**
 * User repository: Handles all database operations for the users table.
 * Provides methods to find users by ID or email.
 */
import { eq, type InferInsertModel } from "drizzle-orm";
import { db } from "../../infra/db/client";
import { user } from "../../infra/db/schema";

type NewUser = InferInsertModel<typeof user>;
type UpdatableUser = Omit<InferInsertModel<typeof user>, "id" | "createdAt" | "updatedAt">;

export const UserRepo = {
	findById: async (id: number) => {
			const [row] = await db.select().from(user).where(eq(user.id, id)).limit(1);
			console.log("findById result:", row);
			return row ?? null;
		},
	findByEmail: async (email: string) => {
		const [row] = await db.select().from(user).where(eq(user.email, email)).limit(1);
		return row ?? null;
	},

	create: async (newUser: NewUser) => {
		const [row] = await db.insert(user).values(newUser).returning();
		return row; // row.id is a bigserial autoincremented
	},

	deleteById: async (id: number) => {
		const [row] = await db.delete(user).where(eq(user.id, id)).returning();
		return row ?? null;
	},

	updateById: async (id: number, updateData: Partial<UpdatableUser>) => {
		const [row] = await db.update(user).set(updateData).where(eq(user.id, id)).returning();
		return row ?? null;
	},
};
