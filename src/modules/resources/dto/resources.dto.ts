import { createInsertSchema } from "drizzle-zod";
import { resources } from "src/infra/db/schema";
import { z } from "zod";

const ALLOWED_RESOURCE_STATUSES = ["available", "in_use", "maintenance", "retired"] as const;

// Base schema from Drizzle with column-aware validations
const resourceInsertSchema = createInsertSchema(resources, {
	laboratoryId: (schema) => schema.int().positive(),
	type: (schema) => schema.min(2, "Type is required").max(100, "Type is too long"),
	name: (schema) => schema.min(2, "Name is required").max(255, "Name is too long"),
	status: (schema) => schema.refine((v) => ALLOWED_RESOURCE_STATUSES.includes(v as any), "Invalid status"),
	metadata: (schema) => schema.nullable().optional(), // Accept any JSON structure
});

// Create DTO (omit server-managed fields)
export const createResourceDto = resourceInsertSchema.omit({
	id: true,
	createdAt: true,
});

// Update DTO (all optional)
export const updateResourceDto = createResourceDto.partial();

// Read DTO (explicit API shape)
export const resourceReadDto = z.object({
	id: z.number().int(),
	laboratoryId: z.number().int(),
	type: z.string(),
	name: z.string(),
	status: z.enum(ALLOWED_RESOURCE_STATUSES),
	metadata: z.unknown().nullable(),
	createdAt: z.string().datetime(),
});

// Types
export type ResourceReadDto = z.infer<typeof resourceReadDto>;
export type UpdateResourceDto = z.infer<typeof updateResourceDto>;
export type CreateResourceDto = z.infer<typeof createResourceDto>;
