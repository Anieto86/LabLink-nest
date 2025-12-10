import { equipmentStatus } from "src/infra/db/schema/enums";
import { z } from "zod";

/** = EquipmentBase */
export const equipmentBaseDto = z.object({
  name: z.string().min(2, "Name is required").max(100, "Name is too long"),
  type: z.string().max(100, "Type is too long").optional(),
  laboratoryId: z.number().int(),
  status: z.enum(equipmentStatus.enumValues).default("available"),
});

export const createEquipmentDto = equipmentBaseDto;

export const equipmentReadDto = equipmentBaseDto.extend({
  laboratoryId: equipmentBaseDto.shape.laboratoryId.nullable(),
  id: z.number().int(),
  createdAt: z.string().datetime().nullable(), // ISO string for API contract
  updatedAt: z.string().datetime().nullable(), // ISO string for API contract
});

export const updateEquipmentDto = equipmentBaseDto.partial();

// types
export type EquipmentBase = z.infer<typeof equipmentBaseDto>;
export type CreateEquipmentDto = z.infer<typeof createEquipmentDto>;
export type EquipmentReadDto = z.infer<typeof equipmentReadDto>;
export type UpdateEquipmentDto = z.infer<typeof updateEquipmentDto>;

