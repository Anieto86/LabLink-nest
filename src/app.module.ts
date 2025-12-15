import { Module } from "@nestjs/common";
import { CommonModule } from "./common/common.module";
import { ConfigModule } from "./config/config.module";
import { DbModule } from "./infra/db/db.module";
import { AuthModule } from "./modules/auth/auth.module";
import { EquipmentModule } from "./modules/equipment/equipment.module";
import { LaboratoriesModule } from "./modules/laboratories/laboratories.module";
import { UserModule } from "./modules/user/user.module";

@Module({
	imports: [
		ConfigModule,
		DbModule,
		CommonModule,
		AuthModule,
		UserModule,
		EquipmentModule,
		LaboratoriesModule,
	],
})
export class AppModule {}
