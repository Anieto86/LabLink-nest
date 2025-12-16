import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { laboratories } from "../../../infra/db/schema";

// Base schema from Drizzle with validations
const laboratoryInsertSchema = createInsertSchema(laboratories, {
	name: z.string().min(1, "Name is required").max(255),
	location: z.string().max(500).optional(),
	capacity: z.number().int().positive().optional(),
});

// Create DTO (omit auto-generated fields)
export const createLaboratoryDto = laboratoryInsertSchema.omit({
	id: true,
	createdAt: true,
});

// Update DTO (all optional)
export const updateLaboratoryDto = createLaboratoryDto.partial();

// Read DTO (includes id and createdAt)
export const laboratoryReadDto = createLaboratoryDto.extend({
	id: z.number().int(),
	createdAt: z.string().datetime(), // ISO string for API contract
});

export type UpdateLaboratoryDto = z.infer<typeof updateLaboratoryDto>;
export type CreateLaboratoryDto = z.infer<typeof createLaboratoryDto>;
