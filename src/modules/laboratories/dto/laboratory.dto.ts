import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { laboratories } from "../../../infra/db/schema";

// Base schema from Drizzle with column-aware validations
const laboratoryBaseDto = createInsertSchema(laboratories, {
	name: (schema) => schema.min(1, "Name is required").max(255),
	location: (schema) => schema.max(500).optional(),
	capacity: (schema) => schema.int().positive().optional(),
});

// Create DTO (omit server-managed fields)
export const createLaboratoryDto = laboratoryBaseDto.omit({
	id: true,
	createdAt: true,
});

// Update DTO (all optional)
export const updateLaboratoryDto = createLaboratoryDto.partial();

// Read DTO (explicit API shape)
export const laboratoryReadDto = z.object({
	id: z.number().int(),
	name: z.string(),
	location: z.string().optional().nullable(),
	capacity: z.number().int().optional().nullable(),
	createdAt: z.string().datetime(),
});

export type UpdateLaboratoryDto = z.infer<typeof updateLaboratoryDto>;
export type CreateLaboratoryDto = z.infer<typeof createLaboratoryDto>;
