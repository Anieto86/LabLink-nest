import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateLaboratoryDto } from "./dto/create-laboratory.dto";
import { UpdateLaboratoryDto } from "./dto/update-laboratory.dto";
import { LaboratoryService } from "./laboratory.service";

@Controller("laboratory")
export class LaboratoryController {
	constructor(private readonly laboratoryService: LaboratoryService) {}

	@Post()
	create(@Body() createLaboratoryDto: CreateLaboratoryDto) {
		return this.laboratoryService.create(createLaboratoryDto);
	}

	@Get()
	findAll() {
		return this.laboratoryService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.laboratoryService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateLaboratoryDto: UpdateLaboratoryDto) {
		return this.laboratoryService.update(+id, updateLaboratoryDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.laboratoryService.remove(+id);
	}
}
