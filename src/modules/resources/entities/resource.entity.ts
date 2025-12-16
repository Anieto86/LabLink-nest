export interface ResourceRead {
	id: number;
	laboratoryId: number;
	type: string;
	name: string;
	status: "available" | "in_use" | "maintenance" | "retired";
	metadata: unknown | null;
	createdAt: string;
}
