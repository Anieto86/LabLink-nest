import type { InferSelectModel } from "drizzle-orm";
import type { equipment } from "../../infra/db/schema/equipment";
import type { EquipmentReadDto } from "./dto/equipment.dto";


// Ajusta los tipos segun tu DTO real

type EquipmentRow = InferSelectModel<typeof equipment>;

export function toEquipmentReadDto(e: EquipmentRow): EquipmentReadDto {
	if (e.status == null) {
		throw new Error("Equipment status cannot be null");
	}
	return {
		id: e.id,
		name: e.name,
		type: e.type ?? undefined,
		laboratoryId: e.laboratoryId,
		status: e.status,
		createdAt: e.createdAt ? e.createdAt.toISOString() : null,
		updatedAt: e.updatedAt ? e.updatedAt.toISOString() : null,
	};
}
