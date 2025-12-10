import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { EquipmentModule } from './modules/equipment/equipment.module';


@Module({
	imports: [UserModule, EquipmentModule],
})
export class AppModule {}
