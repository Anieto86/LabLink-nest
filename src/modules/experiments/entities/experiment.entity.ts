export interface ExperimentRead {
	id: number;
	name: string;
	description: string | null;
	startDate: string | null;
	endDate: string | null;
	laboratoryId: number | null;
	createdAt: string;
}
