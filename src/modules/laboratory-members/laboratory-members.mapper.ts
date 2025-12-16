import type { InferSelectModel } from "drizzle-orm";
import type { laboratoryMembers } from "src/infra/db/schema";
import type { LaboratoryMemberRead } from "src/modules/laboratory-members/entities/laboratory-member.entity";

type LaboratoryMemberRow = InferSelectModel<typeof laboratoryMembers>;

export const toLaboratoryMemberRead = (row: LaboratoryMemberRow): LaboratoryMemberRead => ({
	id: row.id,
	laboratoryId: row.laboratoryId,
	role: row.role,
	userId: row.userId,
	createdAt: row.createdAt,
});
