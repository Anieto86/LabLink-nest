import type { InferSelectModel } from "drizzle-orm";
import type { resources } from "src/infra/db/schema";
import type { ResourceRead } from "src/modules/resources/entities/resource.entity";

type ResourceRow = InferSelectModel<typeof resources>;

export function toResourceRead(row: ResourceRow): ResourceRead {
	return {
		id: row.id,
		laboratoryId: row.laboratoryId,
		type: row.type,
		name: row.name,
		status: row.status as "available" | "in_use" | "maintenance" | "retired",
		metadata: row.metadata ?? null,
		createdAt: row.createdAt,
	};
}
