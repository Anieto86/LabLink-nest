import type { InferSelectModel } from "drizzle-orm";
import type { reservations } from "src/infra/db/schema";
import type { ReservationEntity } from "./entities/reservation.entity";

type ReservationRow = InferSelectModel<typeof reservations>;

export const toReservationRead = (reservation: ReservationRow): ReservationEntity => ({
	id: reservation.id,
	resourceId: reservation.resourceId,
	userId: reservation.userId,
	reservationDate: reservation.reservationDate,
	startTime: reservation.startTime,
	endTime: reservation.endTime,
	createdAt: reservation.createdAt,
});
