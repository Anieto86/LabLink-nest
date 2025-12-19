import { Injectable, NotFoundException } from "@nestjs/common";
import type { CreateExperimentDto, UpdateExperimentDto } from "./dto/experiments.dto";
import { toExperimentRead } from "./experiments.mapper";
import type { ExperimentsRepo } from "./experiments.repo";

@Injectable()
export class ExperimentsService {
	constructor(private readonly experimentsRepo: ExperimentsRepo) {}

	async create(createExperimentDto: CreateExperimentDto) {
		const newExperiment = await this.experimentsRepo.create(createExperimentDto);
		return toExperimentRead(newExperiment);
	}

	async findAll() {
		const experiments = await this.experimentsRepo.findAll();
		return experiments.map(toExperimentRead);
	}

	async findOne(id: number) {
		const experiment = await this.experimentsRepo.findById(id);
		if (!experiment) {
			throw new NotFoundException(`Experiment with ID ${id} not found`);
		}
		return toExperimentRead(experiment);
	}

	async update(id: number, updateExperimentDto: UpdateExperimentDto) {
		const updated = await this.experimentsRepo.update(id, updateExperimentDto);
		if (!updated) {
			throw new NotFoundException(`Experiment with ID ${id} not found`);
		}
		return toExperimentRead(updated);
	}

	async remove(id: number) {
		const deleted = await this.experimentsRepo.delete(id);
		if (!deleted) {
			throw new NotFoundException(`Experiment with ID ${id} not found`);
		}
		return toExperimentRead(deleted);
	}
}
