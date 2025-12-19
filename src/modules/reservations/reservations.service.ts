import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import type {
	CreateReservationDto,
	ReservationReadDto,
	UpdateReservationDto,
} from "./dto/reservation.dto";
import { toReservationRead } from "./reservations.mapper";
import { ReservationsRepo } from "./reservations.repo";

@Injectable()
export class ReservationsService {
	constructor(@Inject(ReservationsRepo) private readonly reservationsRepo: ReservationsRepo) {}

	async create(createReservationDto: CreateReservationDto): Promise<ReservationReadDto> {
		await this.ensureNoOverlap(
			createReservationDto.resourceId,
			createReservationDto.reservationDate,
			createReservationDto.startTime,
			createReservationDto.endTime
		);

		try {
			const created = await this.reservationsRepo.create(createReservationDto);
			return toReservationRead(created);
		} catch (error: unknown) {
			this.handleDbError(error);
		}
	}

	async findAll(): Promise<ReservationReadDto[]> {
		const reservations = await this.reservationsRepo.findAll();
		return reservations.map((r) => toReservationRead(r));
	}

	async findById(id: number): Promise<ReservationReadDto> {
		const reservation = await this.reservationsRepo.findById(id);
		if (!reservation) {
			throw new NotFoundException(`Reservation with ID ${id} not found`);
		}
		return toReservationRead(reservation);
	}

	async findByUser(userId: number): Promise<ReservationReadDto[]> {
		const reservations = await this.reservationsRepo.findByUser(userId);
		return reservations.map((r) => toReservationRead(r));
	}

	async update(
		id: number,
		updateReservationDto: UpdateReservationDto
	): Promise<ReservationReadDto> {
		const current = await this.reservationsRepo.findById(id);
		if (!current) {
			throw new NotFoundException(`Reservation with ID ${id} not found`);
		}

		const next = {
			...current,
			...updateReservationDto,
		};

		await this.ensureNoOverlap(
			next.resourceId,
			next.reservationDate,
			next.startTime,
			next.endTime,
			id
		);

		try {
			const updated = await this.reservationsRepo.update(id, updateReservationDto);
			if (!updated) {
				throw new NotFoundException(`Reservation with ID ${id} not found`);
			}
			return toReservationRead(updated);
		} catch (error: unknown) {
			this.handleDbError(error);
		}
	}

	async remove(id: number): Promise<ReservationReadDto> {
		const deleted = await this.reservationsRepo.delete(id);
		if (!deleted) {
			throw new NotFoundException(`Reservation with ID ${id} not found`);
		}
		return toReservationRead(deleted);
	}

	private async ensureNoOverlap(
		resourceId: number,
		reservationDate: string,
		startTime: string,
		endTime: string,
		excludeId?: number
	) {
		const hasOverlap = await this.reservationsRepo.findOverlapping(
			resourceId,
			reservationDate,
			startTime,
			endTime,
			excludeId
		);
		if (hasOverlap) {
			throw new ConflictException(
				"Reservation overlaps with an existing booking for this resource."
			);
		}
	}

	private handleDbError(error: unknown): never {
		if (this.isPgError(error)) {
			if (error.code === "23505") {
				throw new ConflictException("Reservation already exists for the given resource and time.");
			}
			if (error.code === "23503") {
				throw new NotFoundException("Related resource or user not found.");
			}
		}
		throw error;
	}

	private isPgError(error: unknown): error is { code?: string } {
		return typeof error === "object" && error !== null && "code" in error;
	}
}
