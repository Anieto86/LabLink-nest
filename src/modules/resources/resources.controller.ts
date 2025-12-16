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
import type { CreateResourceDto, UpdateResourceDto } from "./dto/resources.dto";
import { ResourcesService } from "./resources.service";

@Controller("resources")
export class ResourcesController {
	constructor(
		@Inject(ResourcesService)
		private readonly resourcesService: ResourcesService
	) {}

	@Post()
	create(@Body() createResourceDto: CreateResourceDto) {
		return this.resourcesService.create(createResourceDto);
	}

	@Get()
	findAll() {
		return this.resourcesService.findAll();
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.resourcesService.findOne(id);
	}

	@Patch(":id")
	update(@Param("id", ParseIntPipe) id: number, @Body() updateData: UpdateResourceDto) {
		return this.resourcesService.update(id, updateData);
	}

	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.resourcesService.remove(id);
	}
}
