import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	ParseIntPipe,
	Patch,
	Post,
} from "@nestjs/common";
import type { CreateLaboratoryDto } from "./dto/create-laboratory.dto";
import type { UpdateLaboratoryDto } from "./dto/update-laboratory.dto";
import { LaboratoryService } from "./laboratory.service";

@Controller("laboratory")
export class LaboratoryController {
	constructor(@Inject(LaboratoryService) private readonly laboratoryService: LaboratoryService) {}

	@Post()
	create(@Body() createLaboratoryDto: CreateLaboratoryDto) {
		return this.laboratoryService.create(createLaboratoryDto);
	}

	@Get()
	findAll() {
		return this.laboratoryService.findAll();
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.laboratoryService.findOne(id);
	}

	@Patch(":id")
	update(@Param("id", ParseIntPipe) id: number, @Body() updateLaboratoryDto: UpdateLaboratoryDto) {
		return this.laboratoryService.update(id, updateLaboratoryDto);
	}

	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.laboratoryService.remove(id);
	}
}
