import { Module } from "@nestjs/common";
import { CommonModule } from "./common/common.module";
import { ConfigModule } from "./config/config.module";
import { DbModule } from "./infra/db/db.module";
import { AuthModule } from "./modules/auth/auth.module";
import { EquipmentModule } from "./modules/equipment/equipment.module";
import { ExperimentsModule } from "./modules/experiments/experiments.module";
import { LaboratoriesModule } from "./modules/laboratories/laboratories.module";
import { LaboratoryMembersModule } from "./modules/laboratory-members/laboratory-members.module";
import { ResourcesModule } from "./modules/resources/resources.module";
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
		LaboratoryMembersModule,
		ExperimentsModule,
		ResourcesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
