import type { InferSelectModel } from "drizzle-orm";
import type { equipment } from "../../infra/db/schema/equipment";
import type { EquipmentReadDto } from "./dto/create-equipment.dto";

// Ajusta los tipos según tu DTO real

type EquipmentRow = InferSelectModel<typeof equipment>;

export function toEquipmentReadDto(e: EquipmentRow): EquipmentReadDto {
	return {
		id: e.id,
		name: e.name,
		type: e.type,
		status: e.status,
    laboratoryId: e.laboratoryId,
		createdAt: e.createdAt?.toISOString() ?? new Date().toISOString(),
		updatedAt: e.updatedAt?.toISOString() ?? new Date().toISOString(),
	};
}
