import type { InferSelectModel } from "drizzle-orm";
import type { experiments } from "src/infra/db/schema";
import type { ExperimentRead } from "./entities/experiment.entity";

type ExperimentRow = InferSelectModel<typeof experiments>;

export function toExperimentRead(row: ExperimentRow): ExperimentRead {
	return {
		id: row.id,
		name: row.name,
		description: row.description,
		startDate: row.startDate,
		endDate: row.endDate,
		laboratoryId: row.laboratoryId,
		createdAt: row.createdAt,
	};
}
