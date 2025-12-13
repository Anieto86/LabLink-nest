import { Module } from "@nestjs/common";
import { LaboratoryController } from "./laboratory.controller";
import { LaboratoryRepo } from "./laboratory.repo";
import { LaboratoryService } from "./laboratory.service";

@Module({
	controllers: [LaboratoryController],
	providers: [LaboratoryService, LaboratoryRepo],
})
export class LaboratoryModule {}
