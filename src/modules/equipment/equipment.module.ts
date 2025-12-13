import { Module } from "@nestjs/common";
import { EquipmentController } from "./equipment.controller";
import { EquipmentRepo } from "./equipment.repo";
import { EquipmentService } from "./equipment.service";

@Module({
	controllers: [EquipmentController],
	providers: [EquipmentService, EquipmentRepo],
	exports: [EquipmentService, EquipmentRepo],
})
export class EquipmentModule {}
