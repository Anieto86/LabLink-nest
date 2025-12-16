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
import type { CreateLaboratoryDto, UpdateLaboratoryDto } from "./dto/laboratory.dto";
import { LaboratoriesService } from "./laboratories.service";

@Controller("laboratories")
export class LaboratoriesController {
	constructor(
		@Inject(LaboratoriesService) private readonly laboratoriesService: LaboratoriesService
	) {}

	@Post()
	create(@Body() createLaboratoryDto: CreateLaboratoryDto) {
		return this.laboratoriesService.create(createLaboratoryDto);
	}

	@Get()
	findAll() {
		return this.laboratoriesService.findAll();
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.laboratoriesService.findOne(id);
	}

	@Patch(":id")
	update(@Param("id", ParseIntPipe) id: number, @Body() updateLaboratoryDto: UpdateLaboratoryDto) {
		return this.laboratoriesService.update(id, updateLaboratoryDto);
	}

	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.laboratoriesService.remove(id);
	}
}
