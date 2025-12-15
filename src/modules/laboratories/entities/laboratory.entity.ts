export interface LaboratoryRead {
	id: number;
	name: string;
	location: string | null;
	capacity: number | null;
	createdAt: string;
}
