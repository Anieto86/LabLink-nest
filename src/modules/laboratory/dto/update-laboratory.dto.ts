import type { z } from "zod";
import { createLaboratoryDto } from "./create-laboratory.dto";

// DTO para actualización (todos los campos opcionales)
export const updateLaboratoryDto = createLaboratoryDto.partial();

export type UpdateLaboratoryDto = z.infer<typeof updateLaboratoryDto>;
