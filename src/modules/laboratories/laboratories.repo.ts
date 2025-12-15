import { Inject, Injectable } from "@nestjs/common";
import type { InferInsertModel } from "drizzle-orm";
import { eq } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DB_CLIENT } from "src/infra/db/db.constants";
import * as schema from "src/infra/db/schema";

type NewLaboratory = Omit<InferInsertModel<typeof schema.laboratories>, "id" | "createdAt">;
type UpdatableLaboratory = Partial<NewLaboratory>;

@Injectable()
export class LaboratoriesRepo {
	constructor(@Inject(DB_CLIENT) private readonly db: NodePgDatabase<typeof schema>) {}

	async findAll() {
		return await this.db.select().from(schema.laboratories);
	}

	async findById(id: number) {
		const [row] = await this.db
			.select()
			.from(schema.laboratories)
			.where(eq(schema.laboratories.id, id))
			.limit(1);
		return row ?? null;
	}

	async create(data: NewLaboratory) {
		const [newLaboratory] = await this.db.insert(schema.laboratories).values(data).returning();
		return newLaboratory;
	}

	async update(id: number, data: UpdatableLaboratory) {
		const [updated] = await this.db
			.update(schema.laboratories)
			.set(data)
			.where(eq(schema.laboratories.id, id))
			.returning();
		return updated ?? null;
	}

	async delete(id: number) {
		const [deleted] = await this.db
			.delete(schema.laboratories)
			.where(eq(schema.laboratories.id, id))
			.returning();
		return deleted ?? null;
	}
}
