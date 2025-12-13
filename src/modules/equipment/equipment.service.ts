import { Injectable, NotFoundException } from "@nestjs/common";
import type { CreateEquipmentDto, UpdateEquipmentDto } from "./dto/equipment.dto";
import { toEquipmentReadDto } from "./equipment.mapper";
import { EquipmentRepo } from "./equipment.repo";

@Injectable()
export class EquipmentService {
	async getAllEquipment() {
		const equipments = await EquipmentRepo.findAll();
		return equipments.map(toEquipmentReadDto);
	}

	async getEquipmentById(id: number) {
		const equipment = await EquipmentRepo.findById(id);
		if (!equipment) throw new NotFoundException("Equipment not found");
		return toEquipmentReadDto(equipment);
	}

	async createEquipment(data: CreateEquipmentDto) {
		const equipment = await EquipmentRepo.create(data);
		return toEquipmentReadDto(equipment);
	}

	async updateEquipment(id: number, data: UpdateEquipmentDto) {
		const equipment = await EquipmentRepo.updateById(id, data);
		if (!equipment) throw new NotFoundException("Equipment not found");
		return toEquipmentReadDto(equipment);
	}

	async deleteEquipment(id: number) {
		const equipment = await EquipmentRepo.deleteById(id);
		if (!equipment) throw new NotFoundException("Equipment not found");
		return { id: equipment.id };
	}
}
