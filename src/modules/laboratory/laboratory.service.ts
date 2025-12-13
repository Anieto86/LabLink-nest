import { Injectable, NotFoundException } from "@nestjs/common";
import type { CreateLaboratoryDto } from "./dto/create-laboratory.dto";
import type { UpdateLaboratoryDto } from "./dto/update-laboratory.dto";
import { toLaboratoryRead } from "./laboratory.mapper";
import { LaboratoryRepo } from "./laboratory.repo";

@Injectable()
export class LaboratoryService {
	async create(createLaboratoryDto: CreateLaboratoryDto) {
		const newLaboratory = await LaboratoryRepo.create(createLaboratoryDto);
		return toLaboratoryRead(newLaboratory);
	}

	async findAll() {
		const laboratories = await LaboratoryRepo.findAll();
		return laboratories.map(toLaboratoryRead);
	}

	async findOne(id: number) {
		const laboratory = await LaboratoryRepo.findById(id);
		if (!laboratory) {
			throw new NotFoundException(`Laboratory with ID ${id} not found`);
		}
		return toLaboratoryRead(laboratory);
	}

	async update(id: number, updateLaboratoryDto: UpdateLaboratoryDto) {
		const updated = await LaboratoryRepo.update(id, updateLaboratoryDto);
		if (!updated) {
			throw new NotFoundException(`Laboratory with ID ${id} not found`);
		}
		return toLaboratoryRead(updated);
	}

	async remove(id: number) {
		const deleted = await LaboratoryRepo.delete(id);
		if (!deleted) {
			throw new NotFoundException(`Laboratory with ID ${id} not found`);
		}
		return toLaboratoryRead(deleted);
	}
}
