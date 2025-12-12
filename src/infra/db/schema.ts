/**
 * LabLink Database Schema - Main export file
 *
 * This file serves as the central export point for all database schemas.
 * Individual table definitions are organized in the schema/ folder for better modularity.
 *
 * Structure:
 * - schema/enums.ts - Database enums (equipmentStatus, userRole, etc.)
 * - schema/users.ts - User accounts and authentication
 * - schema/laboratories.ts - Laboratory facilities management
 * - schema/equipment.ts - Equipment and instruments tracking
 * - schema/refreshTokens.ts - JWT refresh token management
 */

// Re-export all schemas from modular files

export * from "./schema/enums";
export * from "./schema/equipment";
export * from "./schema/experimentRecords";
export * from "./schema/experiments";
export * from "./schema/formTemplates";
export * from "./schema/formTemplateVersions";
export * from "./schema/laboratories";
export * from "./schema/reservations";
export * from "./schema/storage";
export * from "./schema/users";
