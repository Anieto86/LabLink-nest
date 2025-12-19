import { Injectable } from "@nestjs/common";
import type { FormTemplatesRepo } from "./form-templates.repo";

@Injectable()
export class FormTemplatesService {
	constructor(private readonly formTemplatesRepo: FormTemplatesRepo) {}
}
