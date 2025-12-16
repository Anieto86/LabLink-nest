import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { experiments } from "../../../infra/db/schema";

const experimentInsertSchema = createInsertSchema(experiments, {
	name: z.string().min(2, "Name is required").max(255, "Name is too long"),
	description: z.string().max(1000, "Description is too long").optional(),
	startDate: z.string().date().optional(),
	endDate: z.string().date().optional(),
	laboratoryId: z.number().int().positive().optional(),
});

// Create DTO (omit auto-generated fields)
export const createExperimentDto = experimentInsertSchema.omit({
	id: true,
	createdAt: true,
});

// Update DTO (all optional)
export const updateExperimentDto = createExperimentDto.partial();

// Read DTO (includes id and createdAt)
export const experimentReadDto = createExperimentDto.extend({
	id: z.number().int(),
	createdAt: z.string().datetime(), // ISO string for API contract
});

// Types
export type ExperimentReadDto = z.infer<typeof experimentReadDto>;
export type UpdateExperimentDto = z.infer<typeof updateExperimentDto>;
export type CreateExperimentDto = z.infer<typeof createExperimentDto>;
