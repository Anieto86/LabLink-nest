import { Inject, Injectable } from "@nestjs/common";
import type { InferInsertModel } from "drizzle-orm";
import { eq } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DB_CLIENT } from "src/infra/db/db.constants";
import * as schema from "src/infra/db/schema";

type NewResource = Omit<InferInsertModel<typeof schema.resources>, "id" | "createdAt">;

type UpdatableResource = Partial<NewResource>;

@Injectable()
export class ResourcesRepo {
	constructor(@Inject(DB_CLIENT) private readonly db: NodePgDatabase<typeof schema>) {}

	async findAll() {
		return await this.db.select().from(schema.resources);
	}

	async findById(id: number) {
		const [row] = await this.db
			.select()
			.from(schema.resources)
			.where(eq(schema.resources.id, id))
			.limit(1);
		return row ?? null;
	}

	async findByLaboratoryId(laboratoryId: number) {
		return await this.db
			.select()
			.from(schema.resources)
			.where(eq(schema.resources.laboratoryId, laboratoryId));
	}

	async findByType(type: string) {
		return await this.db.select().from(schema.resources).where(eq(schema.resources.type, type));
	}

	async create(data: NewResource) {
		const [newResource] = await this.db.insert(schema.resources).values(data).returning();
		return newResource;
	}

	async update(id: number, data: UpdatableResource) {
		const [updated] = await this.db
			.update(schema.resources)
			.set(data)
			.where(eq(schema.resources.id, id))
			.returning();
		return updated ?? null;
	}

	async delete(id: number) {
		const [deleted] = await this.db
			.delete(schema.resources)
			.where(eq(schema.resources.id, id))
			.returning();
		return deleted ?? null;
	}
}
