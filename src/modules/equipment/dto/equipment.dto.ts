import { createInsertSchema } from "drizzle-zod";
import { equipment } from "src/infra/db/schema";
import { z } from "zod";

/** = EquipmentBase */
export const equipmentBaseDto = createInsertSchema(equipment, {
	name: (schema) => schema.min(2, "Name is required").max(100, "Name is too long"),
	type: (schema) => schema.max(100, "Type is too long").optional(),
}).pick({ name: true, type: true, laboratoryId: true, status: true });

export const createEquipmentDto = equipmentBaseDto;

export const equipmentReadDto = equipmentBaseDto.extend({
	laboratoryId: equipmentBaseDto.shape.laboratoryId.nullable(),
	id: z.number().int(),
	createdAt: z.string().datetime().nullable(), // ISO string for API contract
});

export const updateEquipmentDto = equipmentBaseDto.partial();

// types
export type EquipmentBase = z.infer<typeof equipmentBaseDto>;
export type CreateEquipmentDto = z.infer<typeof createEquipmentDto>;
export type EquipmentReadDto = z.infer<typeof equipmentReadDto>;
export type UpdateEquipmentDto = z.infer<typeof updateEquipmentDto>;
