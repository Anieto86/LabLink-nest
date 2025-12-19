import { createInsertSchema } from "drizzle-zod";
import { reservations } from "src/infra/db/schema";
import { z } from "zod";

// Base schema from Drizzle with column-aware validations
const reservationInsertSchema = createInsertSchema(reservations, {
	resourceId: (schema) => schema.int().positive(),
	userId: (schema) => schema.int().positive(),
	reservationDate: (schema) =>
		schema.regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
	startTime: (schema) => schema.regex(/^\d{2}:\d{2}:\d{2}$/, "Invalid time format (HH:mm:ss)"),
	endTime: (schema) => schema.regex(/^\d{2}:\d{2}:\d{2}$/, "Invalid time format (HH:mm:ss)"),
});

// Create DTO (omit server-managed fields)
export const createReservationDto = reservationInsertSchema.omit({
	id: true,
	createdAt: true,
});

// Update DTO (all optional)
export const updateReservationDto = createReservationDto.partial();

// Read DTO (explicit API shape)
export const reservationReadDto = z.object({
	id: z.number().int(),
	resourceId: z.number().int(),
	userId: z.number().int(),
	reservationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
	startTime: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
	endTime: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
	createdAt: z.string().datetime(),
});

// Types
export type ReservationReadDto = z.infer<typeof reservationReadDto>;
export type CreateReservationDto = z.infer<typeof createReservationDto>;
export type UpdateReservationDto = z.infer<typeof updateReservationDto>;
