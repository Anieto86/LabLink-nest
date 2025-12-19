import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { CreateFormTemplateDto, UpdateFormTemplateDto } from "./dto/form-templates.dto";
import { toFormTemplateRead } from "./form-templates.mapper";
import { FormTemplatesRepo } from "./form-templates.repo";

@Injectable()
export class FormTemplatesService {
	constructor(@Inject(FormTemplatesRepo) private readonly formTemplatesRepo: FormTemplatesRepo) {}

	//create

	async create(createFormTemplateDto: CreateFormTemplateDto) {
		try {
			const newTemplate = await this.formTemplatesRepo.create(createFormTemplateDto);
			return toFormTemplateRead(newTemplate);
		} catch (error: unknown) {
			if (
				typeof error === "object" &&
				error !== null &&
				"code" in error &&
				error.code === "23503"
			) {
				throw new ConflictException(
					`User with ID ${createFormTemplateDto.createdBy} does not exist`
				);
			}
			throw error;
		}
	}

	async findAll() {
		const templates = await this.formTemplatesRepo.findAll();
		return templates.map(toFormTemplateRead);
	}
	//findOne

	async findOne(id: number) {
		const template = await this.formTemplatesRepo.findById(id);
		if (!template) {
			throw new NotFoundException(`Form template with ID ${id} not found`);
		}
		return toFormTemplateRead(template);
	}

	//update

	async update(id: number, updateData: UpdateFormTemplateDto) {
		const updated = await this.formTemplatesRepo.update(id, updateData);
		if (!updated) {
			throw new NotFoundException(`Form template with ID ${id} not found`);
		}
		return toFormTemplateRead(updated);
	}

	//remove

	async remove(id: number) {
		const template = await this.formTemplatesRepo.delete(id);
		if (!template) {
			throw new NotFoundException(`Form template with ID ${id} not found`);
		}
		return toFormTemplateRead(template);
	}
}
