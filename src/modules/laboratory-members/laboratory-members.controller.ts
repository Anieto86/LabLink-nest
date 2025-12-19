import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import type {
	CreateLaboratoryMemberDto,
	UpdateLaboratoryMemberDto,
} from "./dto/laboratory-members.dto";
import type { LaboratoryMembersService } from "./laboratory-members.service";

@Controller("laboratory-members")
export class LaboratoryMembersController {
	constructor(private readonly laboratoryMembersService: LaboratoryMembersService) {}

	@Post()
	create(@Body() createLaboratoryMemberDto: CreateLaboratoryMemberDto) {
		return this.laboratoryMembersService.create(createLaboratoryMemberDto);
	}

	@Get()
	findAll() {
		return this.laboratoryMembersService.findAll();
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.laboratoryMembersService.findOne(id);
	}

	@Patch(":id")
	update(@Param("id", ParseIntPipe) id: number, @Body() updateData: UpdateLaboratoryMemberDto) {
		return this.laboratoryMembersService.update(id, updateData);
	}

	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.laboratoryMembersService.remove(id);
	}
}
