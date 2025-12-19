import { createInsertSchema } from "drizzle-zod";
import { formTemplates } from "src/infra/db/schema";
import { z } from "zod";

// Base insert schema derived from Drizzle with overrides
const formTemplateBaseDto = createInsertSchema(formTemplates, {
	name: (schema) => schema.min(1, "Name is required").max(255),
	description: (schema) => schema.max(2000).nullable().optional(),
	structure: (schema) => schema, // Accept any JSON structure
	createdBy: (schema) => schema.int().positive().optional(),
});

// Create DTO: exclude server-managed fields
export const createFormTemplateDto = formTemplateBaseDto.omit({
	id: true,
	createdAt: true,
	// createdBy: true,
});

// Update DTO: partial of create
export const updateFormTemplateDto = createFormTemplateDto.partial();

// Read DTO: explicit shape for API response
export const formTemplateReadDto = z.object({
	id: z.number().int(),
	name: z.string(),
	description: z.string().nullable(),
	structure: z.unknown(),
	createdBy: z.number().int().nullable(),
	createdAt: z.string().datetime(),
});

// types
export type FormTemplateReadDto = z.infer<typeof formTemplateReadDto>;
export type UpdateFormTemplateDto = z.infer<typeof updateFormTemplateDto>;
export type CreateFormTemplateDto = z.infer<typeof createFormTemplateDto>;
