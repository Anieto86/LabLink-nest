import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { laboratories } from "../../../infra/db/schema";

// Schema base de Drizzle
const laboratoryInsertSchema = createInsertSchema(laboratories, {
	name: z.string().min(1, "Name is required").max(255),
	location: z.string().max(500).optional(),
	capacity: z.number().int().positive().optional(),
});

// DTO para creación (omitir id y createdAt autogenerados)
export const createLaboratoryDto = laboratoryInsertSchema.omit({
	id: true,
	createdAt: true,
});

export type CreateLaboratoryDto = z.infer<typeof createLaboratoryDto>;
