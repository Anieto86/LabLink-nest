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
import type { CreateExperimentDto, UpdateExperimentDto } from "./dto/experiments.dto";
import { ExperimentsService } from "./experiments.service";

@Controller("experiments")
export class ExperimentsController {
	constructor(
		@Inject(ExperimentsService)
		private readonly experimentsService: ExperimentsService
	) {}

	@Post()
	create(@Body() createExperimentDto: CreateExperimentDto) {
		return this.experimentsService.create(createExperimentDto);
	}

	@Get()
	findAll() {
		return this.experimentsService.findAll();
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.experimentsService.findOne(id);
	}

	@Patch(":id")
	update(@Param("id", ParseIntPipe) id: number, @Body() updateData: UpdateExperimentDto) {
		return this.experimentsService.update(id, updateData);
	}

	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.experimentsService.remove(id);
	}
}
