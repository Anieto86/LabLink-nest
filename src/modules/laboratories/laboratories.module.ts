import { Module } from "@nestjs/common";
import { LaboratoriesController } from "./laboratories.controller";
import { LaboratoriesRepo } from "./laboratories.repo";
import { LaboratoriesService } from "./laboratories.service";

@Module({
	controllers: [LaboratoriesController],
	providers: [LaboratoriesService, LaboratoriesRepo],
})
export class LaboratoriesModule {}
