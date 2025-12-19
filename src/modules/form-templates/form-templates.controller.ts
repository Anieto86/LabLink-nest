import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import type { CreateFormTemplateDto, UpdateFormTemplateDto } from "./dto/form-templates.dto";
import type { FormTemplatesService } from "./form-templates.service";

@Controller("form-templates")
export class FormTemplatesController {
	constructor(private readonly formTemplatesService: FormTemplatesService) {}
	@Post()
	create(@Body() createFormTemplateDto: CreateFormTemplateDto) {
		return this.formTemplatesService.create(createFormTemplateDto);
	}

	@Get()
	findAll() {
		return this.formTemplatesService.findAll();
	}
	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.formTemplatesService.findOne(id);
	}

	@Patch(":id")
	update(@Param("id", ParseIntPipe) id: number, @Body() updateData: UpdateFormTemplateDto) {
		return this.formTemplatesService.update(id, updateData);
	}

	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.formTemplatesService.remove(id);
	}
}
