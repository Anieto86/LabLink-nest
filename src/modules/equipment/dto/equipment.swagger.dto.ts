import { ApiProperty } from "@nestjs/swagger";
import { equipmentStatus } from "src/infra/db/schema";

export class CreateEquipmentDtoSwagger {
	@ApiProperty({ minLength: 2, maxLength: 100, description: "Human-friendly equipment name" })
	name!: string;

	@ApiProperty({ required: false, maxLength: 100, description: "Optional equipment type/model" })
	type?: string;

	@ApiProperty({ type: Number, description: "Associated laboratory ID" })
	laboratoryId!: number;

	@ApiProperty({
		enum: equipmentStatus.enumValues,
		default: "available",
		description: "Operational status",
	})
	status!: (typeof equipmentStatus.enumValues)[number];
}

export class UpdateEquipmentDtoSwagger {
	@ApiProperty({
		required: false,
		minLength: 2,
		maxLength: 100,
		description: "Human-friendly equipment name",
	})
	name?: string;

	@ApiProperty({ required: false, maxLength: 100, description: "Optional equipment type/model" })
	type?: string;

	@ApiProperty({ required: false, type: Number, description: "Associated laboratory ID" })
	laboratoryId?: number;

	@ApiProperty({
		required: false,
		enum: equipmentStatus.enumValues,
		description: "Operational status",
	})
	status?: (typeof equipmentStatus.enumValues)[number];
}

export class EquipmentReadDtoSwagger {
	@ApiProperty({ type: Number, description: "Equipment ID" })
	id!: number;

	@ApiProperty({ minLength: 2, maxLength: 100, description: "Human-friendly equipment name" })
	name!: string;

	@ApiProperty({ required: false, maxLength: 100, description: "Optional equipment type/model" })
	type?: string | null;

	@ApiProperty({ type: Number, nullable: true, description: "Associated laboratory ID (nullable)" })
	laboratoryId!: number | null;

	@ApiProperty({ enum: equipmentStatus.enumValues, description: "Operational status" })
	status!: (typeof equipmentStatus.enumValues)[number];

	@ApiProperty({
		type: String,
		format: "date-time",
		nullable: true,
		description: "Creation timestamp",
	})
	createdAt!: string | null;

	@ApiProperty({
		type: String,
		format: "date-time",
		nullable: true,
		description: "Update timestamp",
	})
	updatedAt!: string | null;
}

export class EquipmentDeleteResponseSwagger {
	@ApiProperty({ description: "Operation result message" })
	message!: string;
}

export class EquipmentListResponseSwagger {
	@ApiProperty({ type: [EquipmentReadDtoSwagger] })
	items!: EquipmentReadDtoSwagger[];

	@ApiProperty({ type: Number })
	total!: number;

	@ApiProperty({ type: Number })
	page!: number;

	@ApiProperty({ type: Number })
	pageSize!: number;
}
