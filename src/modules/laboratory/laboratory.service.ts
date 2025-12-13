import { Injectable } from "@nestjs/common";
import type { CreateLaboratoryDto } from "./dto/create-laboratory.dto";
import type { UpdateLaboratoryDto } from "./dto/update-laboratory.dto";

@Injectable()
export class LaboratoryService {
	create(_createLaboratoryDto: CreateLaboratoryDto) {
		return "This action adds a new laboratory";
	}

	findAll() {
		return `This action returns all laboratory`;
	}

	findOne(id: number) {
		return `This action returns a #${id} laboratory`;
	}

	update(id: number, _updateLaboratoryDto: UpdateLaboratoryDto) {
		return `This action updates a #${id} laboratory`;
	}

	remove(id: number) {
		return `This action removes a #${id} laboratory`;
	}
}
