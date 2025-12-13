import { Inject, Injectable } from "@nestjs/common";
import { eq, type InferInsertModel } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DB_CLIENT } from "src/infra/db/db.constants";
import * as schema from "src/infra/db/schema";

type NewEquipment = InferInsertModel<typeof schema.equipment>;
type UpdatableEquipment = Omit<
	InferInsertModel<typeof schema.equipment>,
	"id" | "createdAt" | "updatedAt"
>;

@Injectable()
export class EquipmentRepo {
	constructor(
		@Inject(DB_CLIENT)
		private readonly db: NodePgDatabase<typeof schema>
	) {}

	async findById(id: number) {
		const [row] = await this.db
			.select()
			.from(schema.equipment)
			.where(eq(schema.equipment.id, id))
			.limit(1);
		return row ?? null;
	}

	async findAll() {
		return await this.db.select().from(schema.equipment);
	}

	async create(newEquipment: NewEquipment) {
		const [row] = await this.db.insert(schema.equipment).values(newEquipment).returning();
		return row;
	}

	async updateById(id: number, updateData: Partial<UpdatableEquipment>) {
		const [row] = await this.db
			.update(schema.equipment)
			.set(updateData)
			.where(eq(schema.equipment.id, id))
			.returning();
		return row ?? null;
	}

	async deleteById(id: number) {
		const [row] = await this.db
			.delete(schema.equipment)
			.where(eq(schema.equipment.id, id))
			.returning();
		return row ?? null;
	}
}
