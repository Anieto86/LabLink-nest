import { Module } from "@nestjs/common";
import { LaboratoryMembersController } from "./laboratory-members.controller";
import { LaboratoryMembersRepo } from "./laboratory-members.repo";
import { LaboratoryMembersService } from "./laboratory-members.service";

@Module({
	controllers: [LaboratoryMembersController],
	providers: [LaboratoryMembersService, LaboratoryMembersRepo],
})
export class LaboratoryMembersModule {}
