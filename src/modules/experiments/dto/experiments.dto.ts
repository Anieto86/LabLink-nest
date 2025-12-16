import { createInsertSchema } from "drizzle-zod";
import { experiments } from "src/infra/db/schema";
import { z } from "zod";

const experimentInsertSchema = createInsertSchema(experiments, {
	name: z.string().min(2, "Name is required").max(255, "Name is too long"),
	description: z.string().max(1000, "Description is too long").nullable().optional(),
	startDate: z.string().date().nullable().optional(),
	endDate: z.string().date().nullable().optional(),
	laboratoryId: z.number().int().positive().nullable().optional(),
}).refine(
	(data) => {
		if (data.startDate && data.endDate) {
			return new Date(data.endDate) >= new Date(data.startDate);
		}
		return true;
	},
	{ message: "End date must be greater than or equal to start date", path: ["endDate"] }
);

// Create DTO (omit auto-generated fields)
export const createExperimentDto = experimentInsertSchema.omit({
	id: true,
	createdAt: true,
});

// Update DTO (all optional, allows explicit null to clear values)
export const updateExperimentDto = createExperimentDto.partial().refine(
	(data) => {
		if (data.startDate && data.endDate) {
			return new Date(data.endDate) >= new Date(data.startDate);
		}
		return true;
	},
	{ message: "End date must be greater than or equal to start date", path: ["endDate"] }
);

// Read DTO (required fields but nullable where applicable to match actual API response structure)
export const experimentReadDto = z.object({
	id: z.number().int(),
	name: z.string(),
	description: z.string().nullable(),
	startDate: z.string().date().nullable(),
	endDate: z.string().date().nullable(),
	laboratoryId: z.number().int().nullable(),
	createdAt: z.string().datetime(),
});

// Types
export type ExperimentReadDto = z.infer<typeof experimentReadDto>;
export type UpdateExperimentDto = z.infer<typeof updateExperimentDto>;
export type CreateExperimentDto = z.infer<typeof createExperimentDto>;
