import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import type {
	CreateLaboratoryMemberDto,
	UpdateLaboratoryMemberDto,
} from "./dto/laboratory-members.dto";
import { toLaboratoryMemberRead } from "./laboratory-members.mapper";
import { LaboratoryMembersRepo } from "./laboratory-members.repo";

@Injectable()
export class LaboratoryMembersService {
	constructor(
		@Inject(LaboratoryMembersRepo) private readonly laboratoryMembersRepo: LaboratoryMembersRepo
	) {}

	async create(createLaboratoryMemberDto: CreateLaboratoryMemberDto) {
		const newMember = await this.laboratoryMembersRepo.create(createLaboratoryMemberDto);
		return toLaboratoryMemberRead(newMember);
	}

	async findAll() {
		const members = await this.laboratoryMembersRepo.findAll();
		return members.map(toLaboratoryMemberRead);
	}

	async findOne(id: number) {
		const member = await this.laboratoryMembersRepo.findById(id);
		if (!member) {
			throw new NotFoundException(`Laboratory member with ID ${id} not found`);
		}
		return toLaboratoryMemberRead(member);
	}

	async update(id: number, updateData: UpdateLaboratoryMemberDto) {
		const updated = await this.laboratoryMembersRepo.update(id, updateData);
		if (!updated) {
			throw new NotFoundException(`Laboratory member with ID ${id} not found`);
		}
		return toLaboratoryMemberRead(updated);
	}

	async remove(id: number) {
		const deleted = await this.laboratoryMembersRepo.delete(id);
		if (!deleted) {
			throw new NotFoundException(`Laboratory member with ID ${id} not found`);
		}
		return toLaboratoryMemberRead(deleted);
	}
}
