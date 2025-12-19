export interface FormTemplateRead {
	id: number;
	name: string;
	description: string | null;
	structure: unknown;
	createdBy: number | null;
	createdAt: string;
}
