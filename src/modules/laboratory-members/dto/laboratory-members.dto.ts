import { createInsertSchema } from "drizzle-zod";
import { laboratoryMembers } from "src/infra/db/schema";
import { z } from "zod";

const laboratoryMemberInsertSchema = createInsertSchema(laboratoryMembers, {
	laboratoryId: z.number().int().positive(),
	userId: z.number().int().positive(),
	role: z.string().min(2, "Role is required").max(100, "Role is too long"),
});

// Create DTO (omit auto-generated fields)
export const createLaboratoryMemberDto = laboratoryMemberInsertSchema.omit({
	id: true,
	createdAt: true,
});

// Update DTO (all optional, allows explicit null to clear values)
export const updateLaboratoryMemberDto = createLaboratoryMemberDto.partial();

// Read DTO (required fields but nullable where applicable to match actual API response structure)
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
