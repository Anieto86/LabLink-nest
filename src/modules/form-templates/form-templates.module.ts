import { Module } from "@nestjs/common";
import { DbModule } from "src/infra/db/db.module";
import { FormTemplatesController } from "./form-templates.controller";
import { FormTemplatesService } from "./form-templates.service";
import { FormTemplatesRepo } from "./form-templates.repo";

@Module({
	imports: [DbModule],
	controllers: [FormTemplatesController],
	providers: [FormTemplatesService, FormTemplatesRepo],
})
export class FormTemplatesModule {}
