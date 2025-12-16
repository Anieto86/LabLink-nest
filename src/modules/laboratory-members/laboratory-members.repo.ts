import { Inject, Injectable } from "@nestjs/common";
import type { InferInsertModel } from "drizzle-orm";
import { eq } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DB_CLIENT } from "src/infra/db/db.constants";
import * as schema from "src/infra/db/schema";

type NewLaboratoryMember = Omit<
	InferInsertModel<typeof schema.laboratoryMembers>,
	"id" | "createdAt"
>;

type UpdatableLaboratoryMember = Partial<NewLaboratoryMember>;

@Injectable()
export class LaboratoryMembersRepo {
	constructor(@Inject(DB_CLIENT) private readonly db: NodePgDatabase<typeof schema>) {}

	async findAll() {
		return await this.db.select().from(schema.laboratoryMembers);
	}

	async findById(id: number) {
		const [row] = await this.db
			.select()
			.from(schema.laboratoryMembers)
			.where(eq(schema.laboratoryMembers.id, id))
			.limit(1);
		return row ?? null;
	}

	async findByLaboratoryId(laboratoryId: number) {
		return await this.db
			.select()
			.from(schema.laboratoryMembers)
			.where(eq(schema.laboratoryMembers.laboratoryId, laboratoryId));
	}

	async findByUserId(userId: number) {
		return await this.db
			.select()
			.from(schema.laboratoryMembers)
			.where(eq(schema.laboratoryMembers.userId, userId));
	}

	async create(data: NewLaboratoryMember) {
		const [newLaboratoryMember] = await this.db
			.insert(schema.laboratoryMembers)
			.values(data)
			.returning();
		return newLaboratoryMember;
	}

	async update(id: number, data: UpdatableLaboratoryMember) {
		const [updated] = await this.db
			.update(schema.laboratoryMembers)
			.set(data)
			.where(eq(schema.laboratoryMembers.id, id))
			.returning();
		return updated ?? null;
	}

	async delete(id: number) {
		const [deleted] = await this.db
			.delete(schema.laboratoryMembers)
			.where(eq(schema.laboratoryMembers.id, id))
			.returning();
		return deleted ?? null;
	}
}
