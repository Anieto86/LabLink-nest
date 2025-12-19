import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import type { CreateResourceDto, UpdateResourceDto } from "./dto/resources.dto";
import { toResourceRead } from "./resources.mapper";
import { ResourcesRepo } from "./resources.repo";

@Injectable()
export class ResourcesService {
	constructor(@Inject(ResourcesRepo) private readonly resourcesRepo: ResourcesRepo) {}

	async create(createResourceDto: CreateResourceDto) {
		try {
			const newResource = await this.resourcesRepo.create(createResourceDto);
			return toResourceRead(newResource);
		} catch (error: unknown) {
			// Postgres foreign key violation (code 23503)
			if (
				typeof error === "object" &&
				error !== null &&
				"code" in error &&
				error.code === "23503"
			) {
				throw new BadRequestException(
					`Laboratory with ID ${createResourceDto.laboratoryId} does not exist`
				);
			}
			throw error;
		}
	}

	async findAll() {
		const resources = await this.resourcesRepo.findAll();
		return resources.map(toResourceRead);
	}

	async findOne(id: number) {
		const resource = await this.resourcesRepo.findById(id);
		if (!resource) {
			throw new NotFoundException(`Resource with ID ${id} not found`);
		}
		return toResourceRead(resource);
	}

	async update(id: number, updateResourceDto: UpdateResourceDto) {
		const updated = await this.resourcesRepo.update(id, updateResourceDto);
		if (!updated) {
			throw new NotFoundException(`Resource with ID ${id} not found`);
		}
		return toResourceRead(updated);
	}

	async remove(id: number) {
		const deleted = await this.resourcesRepo.delete(id);
		if (!deleted) {
			throw new NotFoundException(`Resource with ID ${id} not found`);
		}
		return toResourceRead(deleted);
	}
}
