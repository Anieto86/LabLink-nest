/**
 * User repository: Handles all database operations for the users table.
 * Provides methods to find users by ID or email.
 */
import { eq, type InferInsertModel } from "drizzle-orm";
import { db } from "../../infra/db/client";
import { users } from "../../infra/db/schema";

type NewUser = InferInsertModel<typeof users>;

export const UsersRepo = {
	findById: async (id: number) => {
		const [row] = await db.select().from(users).where(eq(users.id, id)).limit(1);
		return row ?? null;
	},
	findByEmail: async (email: string) => {
		const [row] = await db.select().from(users).where(eq(users.email, email)).limit(1);
		return row ?? null;
	},

	create: async (user: NewUser) => {
		const [row] = await db.insert(users).values(user).returning();
		return row; // row.id is a bigserial autoincremented
	},

	deleteById: async (id: number) => {
		const [row] = await db.delete(users).where(eq(users.id, id)).returning();
		return row ?? null;
	},
};
