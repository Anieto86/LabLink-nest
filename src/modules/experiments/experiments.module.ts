import { Module } from "@nestjs/common";
import { ExperimentsController } from "./experiments.controller";
import { ExperimentsRepo } from "./experiments.repo";
import { ExperimentsService } from "./experiments.service";

@Module({
	controllers: [ExperimentsController],
	providers: [ExperimentsService, ExperimentsRepo],
})
export class ExperimentsModule {}
