import { Module } from "@nestjs/common";
import { EquipmentModule } from "./modules/equipment/equipment.module";
import { LaboratoryModule } from "./modules/laboratory/laboratory.module";
import { UserModule } from "./modules/user/user.module";

@Module({
	imports: [UserModule, EquipmentModule, LaboratoryModule],
})
export class AppModule {}
