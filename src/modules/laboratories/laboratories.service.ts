import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { CreateLaboratoryDto } from "./dto/create-laboratory.dto";
import type { UpdateLaboratoryDto } from "./dto/update-laboratory.dto";
import { toLaboratoryRead } from "./laboratory.mapper";
import { LaboratoryRepo } from "./laboratory.repo";

@Injectable()
export class LaboratoryService {
	constructor(@Inject(LaboratoryRepo) private readonly laboratoryRepo: LaboratoryRepo) {}

	async create(createLaboratoryDto: CreateLaboratoryDto) {
		const newLaboratory = await this.laboratoryRepo.create(createLaboratoryDto);
		return toLaboratoryRead(newLaboratory);
	}

	async findAll() {
		const laboratories = await this.laboratoryRepo.findAll();
		return laboratories.map(toLaboratoryRead);
	}

	async findOne(id: number) {
		const laboratory = await this.laboratoryRepo.findById(id);
		if (!laboratory) {
			throw new NotFoundException(`Laboratory with ID ${id} not found`);
		}
		return toLaboratoryRead(laboratory);
	}

	async update(id: number, updateLaboratoryDto: UpdateLaboratoryDto) {
		const updated = await this.laboratoryRepo.update(id, updateLaboratoryDto);
		if (!updated) {
			throw new NotFoundException(`Laboratory with ID ${id} not found`);
		}
		return toLaboratoryRead(updated);
	}

	async remove(id: number) {
		const deleted = await this.laboratoryRepo.delete(id);
		if (!deleted) {
			throw new NotFoundException(`Laboratory with ID ${id} not found`);
		}
		return toLaboratoryRead(deleted);
	}
}
