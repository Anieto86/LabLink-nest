import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Query,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { userCreateDto, userUpdateDto } from "./dto/users.dto";
import { UserService } from "./user.service";

@ApiTags("user")
@Controller("user")
export class UserController {
	constructor(@Inject(UserService) private readonly userService: UserService) {}

	/**
	 * GET /user/:id
	 * Get user by id
	 */
	@ApiOperation({ summary: "Get user by id" })
	@ApiParam({ name: "id", type: Number })
	@ApiResponse({ status: 200, description: "User found." })
	@Get(":id")
	async getById(@Param("id", ParseIntPipe) id: number) {
		return await this.userService.getUserInfo(id);
	}

	/**
	 * GET /user/by-email?email=...
	 * Get user by email
	 */
	@ApiOperation({ summary: "Get user by email" })
	@ApiQuery({ name: "email", type: String })
	@ApiResponse({ status: 200, description: "User found." })
	@Get("by-email")
	async getByEmail(@Query("email") email: string) {
		const emailResult = userCreateDto.shape.email.safeParse(email);
		if (!emailResult.success) {
			throw new BadRequestException(emailResult.error.flatten());
		}
		return this.userService.getUserByEmail(emailResult.data);
	}

	/**
	 * POST /user
	 * Create new user
	 */
	@ApiOperation({ summary: "Create new user" })
	@ApiBody({ type: Object })
	@ApiResponse({ status: 201, description: "User created." })
	@Post()
	async create(@Body() body: unknown) {
		const parseResult = userCreateDto.safeParse(body);
		if (!parseResult.success) {
			throw new BadRequestException(parseResult.error.flatten());
		}
		const user = await this.userService.createUser(parseResult.data);
		return { message: "User created successfully", user };
	}

	/**
	 * DELETE /user/:id
	 * Delete user by id
	 */
	@Delete(":id")
	async delete(@Param("id", ParseIntPipe) id: number) {
		await this.userService.deleteUser(id);
		return { message: "User deleted successfully" };
	}

	/**
	 * PUT /user/:id
	 * Update user by id
	 */
	@Put(":id")
	async update(@Param("id", ParseIntPipe) id: number, @Body() body: unknown) {
		const parseResult = userUpdateDto.safeParse(body);
		if (!parseResult.success) {
			throw new BadRequestException(parseResult.error.flatten());
		}
		const user = await this.userService.updateUser(id, parseResult.data);
		return { message: "User updated successfully", user };
	}
}
