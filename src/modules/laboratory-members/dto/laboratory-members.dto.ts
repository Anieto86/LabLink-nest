import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { laboratoryMembers } from "../../../infra/db/schema";

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

// Update DTO (all optional)
export const updateLaboratoryMemberDto = createLaboratoryMemberDto.partial();

// Read DTO (includes id and createdAt)
export const laboratoryMemberReadDto = createLaboratoryMemberDto.extend({
	id: z.number().int(),
	createdAt: z.string().datetime(), // ISO string for API contract
});

// types
export type LaboratoryMemberReadDto = z.infer<typeof laboratoryMemberReadDto>;
export type UpdateLaboratoryMemberDto = z.infer<typeof updateLaboratoryMemberDto>;
export type CreateLaboratoryMemberDto = z.infer<typeof createLaboratoryMemberDto>;