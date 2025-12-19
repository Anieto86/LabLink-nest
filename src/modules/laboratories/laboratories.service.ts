import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { CreateLaboratoryDto, UpdateLaboratoryDto } from "./dto/laboratory.dto";
import { toLaboratoryRead } from "./laboratories.mapper";
import { LaboratoryRepo } from "./laboratories.repo";

@Injectable()
export class LaboratoriesService {
	constructor(@Inject(LaboratoryRepo) private readonly laboratoriesRepo: LaboratoryRepo) {}

	async create(createLaboratoryDto: CreateLaboratoryDto) {
		const newLaboratory = await this.laboratoriesRepo.create(createLaboratoryDto);
		return toLaboratoryRead(newLaboratory);
	}

	async findAll() {
		const laboratories = await this.laboratoriesRepo.findAll();
		return laboratories.map(toLaboratoryRead);
	}

	async findOne(id: number) {
		const laboratory = await this.laboratoriesRepo.findById(id);
		if (!laboratory) {
			throw new NotFoundException(`Laboratory with ID ${id} not found`);
		}
		return toLaboratoryRead(laboratory);
	}

	async update(id: number, updateLaboratoryDto: UpdateLaboratoryDto) {
		const updated = await this.laboratoriesRepo.update(id, updateLaboratoryDto);
		if (!updated) {
			throw new NotFoundException(`Laboratory with ID ${id} not found`);
		}
		return toLaboratoryRead(updated);
	}

	async remove(id: number) {
		const deleted = await this.laboratoriesRepo.delete(id);
		if (!deleted) {
			throw new NotFoundException(`Laboratory with ID ${id} not found`);
		}
		return toLaboratoryRead(deleted);
	}
}
