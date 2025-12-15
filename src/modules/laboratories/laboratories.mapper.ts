import type { InferSelectModel } from "drizzle-orm";
import type { laboratories } from "../../infra/db/schema";
import type { LaboratoryRead } from "./entities/laboratory.entity";

type LaboratoryRow = InferSelectModel<typeof laboratories>;

export const toLaboratoryRead = (row: LaboratoryRow): LaboratoryRead => ({
	id: row.id,
	name: row.name,
	location: row.location,
	capacity: row.capacity,
	createdAt: row.createdAt,
});
