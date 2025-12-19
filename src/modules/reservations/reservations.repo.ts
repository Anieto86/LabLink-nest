import { Inject, Injectable } from "@nestjs/common";
import type { InferInsertModel } from "drizzle-orm";
import { and, eq, gt, lt, ne } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DB_CLIENT } from "src/infra/db/db.constants";
import * as schema from "src/infra/db/schema";

type NewReservation = Omit<InferInsertModel<typeof schema.reservations>, "id" | "createdAt">;
type UpdatableReservation = Partial<NewReservation>;

@Injectable()
export class ReservationsRepo {
	constructor(@Inject(DB_CLIENT) private readonly db: NodePgDatabase<typeof schema>) {}

	async findAll() {
		return await this.db.select().from(schema.reservations);
	}

	async findById(id: number) {
		const [row] = await this.db
			.select()
			.from(schema.reservations)
			.where(eq(schema.reservations.id, id))
			.limit(1);
		return row ?? null;
	}

	async findByUser(userId: number) {
		return await this.db
			.select()
			.from(schema.reservations)
			.where(eq(schema.reservations.userId, userId));
	}

	async create(data: NewReservation) {
		const [newReservation] = await this.db.insert(schema.reservations).values(data).returning();
		return newReservation;
	}

	async update(id: number, data: UpdatableReservation) {
		const [updated] = await this.db
			.update(schema.reservations)
			.set(data)
			.where(eq(schema.reservations.id, id))
			.returning();
		return updated ?? null;
	}

	async delete(id: number) {
		const [deleted] = await this.db
			.delete(schema.reservations)
			.where(eq(schema.reservations.id, id))
			.returning();
		return deleted ?? null;
	}

	async findOverlapping(
		resourceId: number,
		reservationDate: string,
		startTime: string,
		endTime: string,
		excludeId?: number
	) {
		const conditions = [
			eq(schema.reservations.resourceId, resourceId),
			eq(schema.reservations.reservationDate, reservationDate),
			lt(schema.reservations.startTime, endTime),
			gt(schema.reservations.endTime, startTime),
		];

		if (excludeId !== undefined) {
			conditions.push(ne(schema.reservations.id, excludeId));
		}

		const [overlapping] = await this.db
			.select()
			.from(schema.reservations)
			.where(and(...conditions))
			.limit(1);

		return overlapping ?? null;
	}
}
