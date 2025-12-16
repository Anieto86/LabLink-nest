import { Module } from "@nestjs/common";
import { ResourcesController } from "./resources.controller";
import { ResourcesRepo } from "./resources.repo";
import { ResourcesService } from "./resources.service";

@Module({
	controllers: [ResourcesController],
	providers: [ResourcesService, ResourcesRepo],
})
export class ResourcesModule {}
