import { createInsertSchema } from "drizzle-zod";
import { experiments } from "src/infra/db/schema";
import { z } from "zod";

// Base schema from Drizzle with column-aware validations
const experimentBaseDto = createInsertSchema(experiments, {
	name: (schema) => schema.min(2, "Name is required").max(255, "Name is too long"),
	description: (schema) => schema.max(1000, "Description is too long").nullable().optional(),
	startDate: (schema) => schema.nullable().optional(),
	endDate: (schema) => schema.nullable().optional(),
	laboratoryId: (schema) => schema.int().positive().nullable().optional(),
}).refine(
	(data) => {
		if (data.startDate && data.endDate) {
			return new Date(data.endDate) >= new Date(data.startDate);
		}
		return true;
	},
	{ message: "End date must be greater than or equal to start date", path: ["endDate"] }
);

// Create DTO (omit server-managed fields)
export const createExperimentDto = experimentBaseDto.omit({
	id: true,
	createdAt: true,
});

// Update DTO (all optional)
export const updateExperimentDto = createExperimentDto.partial().refine(
	(data) => {
		if (data.startDate && data.endDate) {
			return new Date(data.endDate) >= new Date(data.startDate);
		}
		return true;
	},
	{ message: "End date must be greater than or equal to start date", path: ["endDate"] }
);

// Read DTO (explicit API shape)
export const experimentReadDto = z.object({
	id: z.number().int(),
	name: z.string(),
	description: z.string().nullable(),
	startDate: z.string().nullable(),
	endDate: z.string().nullable(),
	laboratoryId: z.number().int().nullable(),
	createdAt: z.string().datetime(),
});

// Types
export type ExperimentReadDto = z.infer<typeof experimentReadDto>;
export type UpdateExperimentDto = z.infer<typeof updateExperimentDto>;
export type CreateExperimentDto = z.infer<typeof createExperimentDto>;
