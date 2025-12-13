import { ApiProperty } from "@nestjs/swagger";
import { userRole } from "../../../infra/db/schema";

export class CreateUserDtoSwagger {
	@ApiProperty({ minLength: 2, maxLength: 50, description: "Full name" })
	name!: string;

	@ApiProperty({ enum: userRole.enumValues, description: "Access role" })
	role!: (typeof userRole.enumValues)[number];

	@ApiProperty({ format: "email", description: "Unique email address" })
	email!: string;

	@ApiProperty({ minLength: 8, maxLength: 100, description: "Plain password (hashed server-side)" })
	password!: string;
}

export class UpdateUserDtoSwagger {
	@ApiProperty({ required: false, minLength: 2, maxLength: 50, description: "Full name" })
	name?: string;

	@ApiProperty({ required: false, enum: userRole.enumValues, description: "Access role" })
	role?: (typeof userRole.enumValues)[number];

	@ApiProperty({ required: false, format: "email", description: "Unique email address" })
	email?: string;

	@ApiProperty({ required: false, description: "Active/inactive flag" })
	isActive?: boolean;

	@ApiProperty({
		required: false,
		minLength: 8,
		maxLength: 100,
		description: "Plain password (hashed server-side)",
	})
	password?: string;
}

export class UserLoginDtoSwagger {
	@ApiProperty({ format: "email", description: "User email" })
	email!: string;

	@ApiProperty({ description: "User password" })
	password!: string;
}

export class UserReadDtoSwagger {
	@ApiProperty({ type: Number, description: "User ID" })
	id!: number;

	@ApiProperty({ minLength: 2, maxLength: 50, description: "Full name" })
	name!: string;

	@ApiProperty({ enum: userRole.enumValues, description: "Access role" })
	role!: (typeof userRole.enumValues)[number];

	@ApiProperty({ format: "email", description: "Unique email address" })
	email!: string;

	@ApiProperty({ description: "Active/inactive flag" })
	isActive!: boolean;

	@ApiProperty({
		type: String,
		format: "date-time",
		nullable: true,
		description: "Creation timestamp",
	})
	createdAt!: string | null;
}

export class UserCreateResponseSwagger {
	@ApiProperty({ description: "Operation result message" })
	message!: string;

	@ApiProperty({ type: UserReadDtoSwagger })
	user!: UserReadDtoSwagger;
}

export class UserUpdateResponseSwagger {
	@ApiProperty({ description: "Operation result message" })
	message!: string;

	@ApiProperty({ type: UserReadDtoSwagger })
	user!: UserReadDtoSwagger;
}

export class UserDeleteResponseSwagger {
	@ApiProperty({ description: "Operation result message" })
	message!: string;
}

export class UserListResponseSwagger {
	@ApiProperty({ type: [UserReadDtoSwagger] })
	items!: UserReadDtoSwagger[];

	@ApiProperty({ type: Number })
	total!: number;

	@ApiProperty({ type: Number })
	page!: number;

	@ApiProperty({ type: Number })
	pageSize!: number;
}
