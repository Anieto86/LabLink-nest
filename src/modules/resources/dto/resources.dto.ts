import { createInsertSchema } from "drizzle-zod";
import { resources } from "src/infra/db/schema";
import { z } from "zod";

// Define allowed resource statuses
const resourceStatusEnum = z.enum(["available", "in_use", "maintenance", "retired"]);

const resourceInsertSchema = createInsertSchema(resources, {
	laboratoryId: z.number().int().positive(),
	type: z.string().min(2, "Type is required").max(100, "Type is too long"),
	name: z.string().min(2, "Name is required").max(255, "Name is too long"),
	status: resourceStatusEnum.default("available"),
	metadata: z.unknown().nullable().optional(), // Allow any valid JSON structure
});

// Create DTO (omit auto-generated fields)
export const createResourceDto = resourceInsertSchema.omit({
	id: true,
	createdAt: true,
});

// Update DTO (all optional, allows explicit null to clear values)
export const updateResourceDto = createResourceDto.partial();

// Read DTO (required fields but nullable where applicable to match actual API response structure)
export const resourceReadDto = z.object({
	id: z.number().int(),
	laboratoryId: z.number().int(),
	type: z.string(),
	name: z.string(),
	status: resourceStatusEnum,
	metadata: z.unknown().nullable(),
	createdAt: z.string().datetime(),
});

// Types
export type ResourceReadDto = z.infer<typeof resourceReadDto>;
export type UpdateResourceDto = z.infer<typeof updateResourceDto>;
export type CreateResourceDto = z.infer<typeof createResourceDto>;
