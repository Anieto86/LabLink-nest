import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	NotFoundException,
	Param,
	ParseIntPipe,
	Patch,
	Post,
} from "@nestjs/common";
import type { CreateReservationDto, UpdateReservationDto } from "./dto/reservation.dto";

import { ReservationsService } from "./reservations.service";

@Controller("reservations")
export class ReservationController {
	constructor(
		@Inject(ReservationsService) private readonly reservationService: ReservationsService
	) {}

	@Post()
	create(@Body() createReservationDto: CreateReservationDto) {
		return this.reservationService.create(createReservationDto);
	}

	@Get()
	findAll() {
		return this.reservationService.findAll();
	}

	@Get(":id")
	async findOne(@Param("id", ParseIntPipe) id: number) {
		const reservation = await this.reservationService.findById(id);
		if (!reservation) {
			throw new NotFoundException(`Reservation with ID ${id} not found`);
		}
		return reservation;
	}

	@Get("user/:userId")
	findByUser(@Param("userId", ParseIntPipe) userId: number) {
		return this.reservationService.findByUser(userId);
	}

	@Patch(":id")
	update(
		@Param("id", ParseIntPipe) id: number,
		@Body() updateReservationDto: UpdateReservationDto
	) {
		return this.reservationService.update(id, updateReservationDto);
	}

	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.reservationService.remove(id);
	}
}
