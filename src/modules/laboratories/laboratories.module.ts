import { Module } from "@nestjs/common";
import { LaboratoriesController } from "./laboratories.controller";
import { LaboratoryRepo } from "./laboratories.repo";
import { LaboratoriesService } from "./laboratories.service";

@Module({
	controllers: [LaboratoriesController],
	providers: [LaboratoriesService, LaboratoryRepo],
})
export class LaboratoriesModule {}
