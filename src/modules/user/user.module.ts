import { Module } from "@nestjs/common";
import { DbModule } from "src/infra/db/db.module";
import { UserController } from "./user.controller";
import { UserRepo } from "./user.repo";
import { UserService } from "./user.service";

@Module({
	imports: [DbModule],
	controllers: [UserController],
	providers: [UserService, UserRepo],
})
export class UserModule {}
