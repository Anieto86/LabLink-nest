import { Module } from "@nestjs/common";
import { ReservationController } from "./reservation.controller";
import { ReservationsRepo } from "./reservations.repo";
import { ReservationsService } from "./reservations.service";

@Module({
	controllers: [ReservationController],
	providers: [ReservationsService, ReservationsRepo],
	exports: [ReservationsService, ReservationsRepo],
})
export class ReservationsModule {}
