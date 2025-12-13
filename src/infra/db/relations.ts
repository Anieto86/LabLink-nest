import { relations } from "drizzle-orm/relations";
import {
	auditLogs,
	equipment,
	experimentRecordFiles,
	experimentRecords,
	experimentStatusHistory,
	experiments,
	formTemplates,
	formTemplateVersions,
	laboratories,
	laboratoryMembers,
	reservations,
	resources,
	users,
} from "./schema";

export const equipmentRelations = relations(equipment, ({ one }) => ({
	laboratory: one(laboratories, {
		fields: [equipment.laboratoryId],
		references: [laboratories.id],
	}),
}));

export const laboratoriesRelations = relations(laboratories, ({ many }) => ({
	equipment: many(equipment),
	experiments: many(experiments),
	laboratoryMembers: many(laboratoryMembers),
	resources: many(resources),
}));

export const experimentsRelations = relations(experiments, ({ one, many }) => ({
	laboratory: one(laboratories, {
		fields: [experiments.laboratoryId],
		references: [laboratories.id],
	}),
	experimentRecords: many(experimentRecords),
	experimentStatusHistories: many(experimentStatusHistory),
}));

export const formTemplateVersionsRelations = relations(formTemplateVersions, ({ one, many }) => ({
	formTemplate: one(formTemplates, {
		fields: [formTemplateVersions.formTemplateId],
		references: [formTemplates.id],
	}),
	experimentRecords: many(experimentRecords),
}));

export const formTemplatesRelations = relations(formTemplates, ({ one, many }) => ({
	formTemplateVersions: many(formTemplateVersions),
	user: one(users, {
		fields: [formTemplates.createdBy],
		references: [users.id],
	}),
}));

export const usersRelations = relations(users, ({ many }) => ({
	formTemplates: many(formTemplates),
	experimentRecords: many(experimentRecords),
	laboratoryMembers: many(laboratoryMembers),
	experimentStatusHistories: many(experimentStatusHistory),
	auditLogs: many(auditLogs),
	reservations: many(reservations),
}));

export const experimentRecordsRelations = relations(experimentRecords, ({ one, many }) => ({
	experiment: one(experiments, {
		fields: [experimentRecords.experimentId],
		references: [experiments.id],
	}),
	formTemplateVersion: one(formTemplateVersions, {
		fields: [experimentRecords.formTemplateVersionId],
		references: [formTemplateVersions.id],
	}),
	user: one(users, {
		fields: [experimentRecords.userId],
		references: [users.id],
	}),
	experimentRecordFiles: many(experimentRecordFiles),
}));

export const laboratoryMembersRelations = relations(laboratoryMembers, ({ one }) => ({
	laboratory: one(laboratories, {
		fields: [laboratoryMembers.laboratoryId],
		references: [laboratories.id],
	}),
	user: one(users, {
		fields: [laboratoryMembers.userId],
		references: [users.id],
	}),
}));

export const experimentRecordFilesRelations = relations(experimentRecordFiles, ({ one }) => ({
	experimentRecord: one(experimentRecords, {
		fields: [experimentRecordFiles.experimentRecordId],
		references: [experimentRecords.id],
	}),
}));

export const experimentStatusHistoryRelations = relations(experimentStatusHistory, ({ one }) => ({
	experiment: one(experiments, {
		fields: [experimentStatusHistory.experimentId],
		references: [experiments.id],
	}),
	user: one(users, {
		fields: [experimentStatusHistory.changedBy],
		references: [users.id],
	}),
}));

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
	user: one(users, {
		fields: [auditLogs.userId],
		references: [users.id],
	}),
}));

export const resourcesRelations = relations(resources, ({ one, many }) => ({
	laboratory: one(laboratories, {
		fields: [resources.laboratoryId],
		references: [laboratories.id],
	}),
	reservations: many(reservations),
}));

export const reservationsRelations = relations(reservations, ({ one }) => ({
	resource: one(resources, {
		fields: [reservations.resourceId],
		references: [resources.id],
	}),
	user: one(users, {
		fields: [reservations.userId],
		references: [users.id],
	}),
}));
