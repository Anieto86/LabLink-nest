import { Inject, Injectable } from "@nestjs/common";
import { eq, type InferInsertModel } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DB_CLIENT } from "src/infra/db/db.constants";
import * as schema from "src/infra/db/schema";

type NewUser = InferInsertModel<typeof schema.users>;
type UpdatableUser = Omit<InferInsertModel<typeof schema.users>, "id" | "createdAt" | "updatedAt">;

@Injectable()
export class UserRepo {
	constructor(@Inject(DB_CLIENT) private readonly db: NodePgDatabase<typeof schema>) {}

	async findById(id: number) {
		const [row] = await this.db.select().from(schema.users).where(eq(schema.users.id, id)).limit(1);
		return row ?? null;
	}

	async findByEmail(email: string) {
		const [row] = await this.db
			.select()
			.from(schema.users)
			.where(eq(schema.users.email, email))
			.limit(1);
		return row ?? null;
	}

	async create(newUser: NewUser) {
		const [row] = await this.db.insert(schema.users).values(newUser).returning();
		return row;
	}

	async deleteById(id: number) {
		const [row] = await this.db.delete(schema.users).where(eq(schema.users.id, id)).returning();
		return row ?? null;
	}

	async updateById(id: number, updateData: Partial<UpdatableUser>) {
		const [row] = await this.db
			.update(schema.users)
			.set(updateData)
			.where(eq(schema.users.id, id))
			.returning();
		return row ?? null;
	}
}
