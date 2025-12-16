// Shape returned to API consumers for laboratory membership records
export interface LaboratoryMemberRead {
	id: number;
	laboratoryId: number;
	userId: number;
	role: string;
	createdAt: string;
}
