import { Inject, Injectable } from "@nestjs/common";
import type { InferInsertModel } from "drizzle-orm";
import { eq } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DB_CLIENT } from "src/infra/db/db.constants";
import * as schema from "src/infra/db/schema";

type NewExperiment = Omit<InferInsertModel<typeof schema.experiments>, "id" | "createdAt">;

type UpdatableExperiment = Partial<NewExperiment>;

@Injectable()
export class ExperimentsRepo {
	constructor(@Inject(DB_CLIENT) private readonly db: NodePgDatabase<typeof schema>) {}

	async findAll() {
		return await this.db.select().from(schema.experiments);
	}

	async findById(id: number) {
		const [row] = await this.db
			.select()
			.from(schema.experiments)
			.where(eq(schema.experiments.id, id))
			.limit(1);
		return row ?? null;
	}

	async findByLaboratoryId(laboratoryId: number) {
		return await this.db
			.select()
			.from(schema.experiments)
			.where(eq(schema.experiments.laboratoryId, laboratoryId));
	}

	async create(data: NewExperiment) {
		const [newExperiment] = await this.db.insert(schema.experiments).values(data).returning();
		return newExperiment;
	}

	async update(id: number, data: UpdatableExperiment) {
		const [updated] = await this.db
			.update(schema.experiments)
			.set(data)
			.where(eq(schema.experiments.id, id))
			.returning();
		return updated ?? null;
	}

	async delete(id: number) {
		const [deleted] = await this.db
			.delete(schema.experiments)
			.where(eq(schema.experiments.id, id))
			.returning();
		return deleted ?? null;
	}
}
