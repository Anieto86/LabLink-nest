import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { EquipmentModule } from './modules/equipment/equipment.module';
import { LaboratoryModule } from './module/laboratory/laboratory.module';


@Module({
	imports: [UserModule, EquipmentModule, LaboratoryModule],
})
export class AppModule {}
``
