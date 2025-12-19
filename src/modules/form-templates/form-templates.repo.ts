import { Inject, Injectable } from "@nestjs/common";
import type { InferInsertModel } from "drizzle-orm";
import { eq } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DB_CLIENT } from "src/infra/db/db.constants";
import * as schema from "src/infra/db/schema";

type NewFormTemplate = Omit<InferInsertModel<typeof schema.formTemplates>, "id" | "createdAt">;
type UpdatableFormTemplate = Partial<NewFormTemplate>;
type NewFormTemplateVersion = Omit<
	InferInsertModel<typeof schema.formTemplateVersions>,
	"id" | "modifiedAt"
>;

@Injectable()
export class FormTemplatesRepo {
	constructor(@Inject(DB_CLIENT) private readonly db: NodePgDatabase<typeof schema>) {}

	async findAll() {
		// Implementation for fetching all form templates
		return await this.db.select().from(schema.formTemplates);
	}

	async findById(id: number) {
		const [row] = await this.db
			.select()
			.from(schema.formTemplates)
			.where(eq(schema.formTemplates.id, id))
			.limit(1);
		return row ?? null;
	}

	async findByCreatedBy(userId: number) {
		return await this.db
			.select()
			.from(schema.formTemplates)
			.where(eq(schema.formTemplates.createdBy, userId));
	}

	async create(data: NewFormTemplate) {
		const [newFormTemplate] = await this.db.insert(schema.formTemplates).values(data).returning();
		return newFormTemplate;
	}

	async update(id: number, data: UpdatableFormTemplate) {
		const [updated] = await this.db
			.update(schema.formTemplates)
			.set(data) // Stable for updating a form template
			.where(eq(schema.formTemplates.id, id))
			.returning();
		return updated ?? null;
	}

	async delete(id: number) {
		const [deleted] = await this.db
			.delete(schema.formTemplates)
			.where(eq(schema.formTemplates.id, id))
			.returning();
		return deleted ?? null;
	}

	// ============= FORM TEMPLATE VERSIONS =============

	// async getLatestVersion(formTemplateId: number) {
	// 	// Implementation for fetching the latest version of a template
	// }

	// async getVersionById(versionId: number) {
	// 	// Implementation for fetching a specific version by ID
	// }

	// async getAllVersions(formTemplateId: number) {
	// 	// Implementation for fetching all versions of a template
	// }

	// async createVersion(data: NewFormTemplateVersion) {
	// 	// Implementation for creating a new template version
	// }
}
