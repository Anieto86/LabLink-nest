import { createInsertSchema } from "drizzle-zod";
import { laboratoryMembers } from "src/infra/db/schema";
import { z } from "zod";

const laboratoryMemberBaseDto = createInsertSchema(laboratoryMembers, {
	laboratoryId: (schema) => schema.int().positive(),
	userId: (schema) => schema.int().positive(),
	role: (schema) => schema.min(2, "Role is required").max(100, "Role is too long"),
});

// Create DTO (omit server-managed fields)
export const createLaboratoryMemberDto = laboratoryMemberBaseDto.omit({
	id: true,
	createdAt: true,
});

// Update DTO (all optional)
export const updateLaboratoryMemberDto = createLaboratoryMemberDto.partial();

// Read DTO (explicit API shape)
export const laboratoryMemberReadDto = z.object({
	id: z.number().int(),
	laboratoryId: z.number().int(),
	userId: z.number().int(),
	role: z.string(),
	createdAt: z.string().datetime(),
});

// types
export type LaboratoryMemberReadDto = z.infer<typeof laboratoryMemberReadDto>;
export type UpdateLaboratoryMemberDto = z.infer<typeof updateLaboratoryMemberDto>;
export type CreateLaboratoryMemberDto = z.infer<typeof createLaboratoryMemberDto>;
