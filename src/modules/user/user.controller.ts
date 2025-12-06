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
import { userCreateDto, userUpdateDto } from "./dtos/users.dtos";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
	constructor(@Inject(UserService) private readonly userService: UserService) {}

	@Get("info")
	async getUserInfo(@Query("id", ParseIntPipe) id: number) {
		return this.userService.getUserInfo(id);
	}

	@Get("by-email")
	async getUserByEmail(@Query("email") email: string) {
		const emailResult = userCreateDto.shape.email.safeParse(email);
		if (!emailResult.success) {
			throw new BadRequestException(emailResult.error.flatten());
		}
		return this.userService.getUserByEmail(emailResult.data);
	}

	@Post("create")
	async createUser(@Body() body: unknown) {
		// Validate input with Zod
		const parseResult = userCreateDto.safeParse(body);
		if (!parseResult.success) {
			throw new BadRequestException(parseResult.error.flatten());
		}
		// Llama al servicio para crear el usuario
		const user = await this.userService.createUser(parseResult.data);
		return { message: "User created successfully", user };
	}

	@Delete(":id")
	async deleteUser(@Param("id", ParseIntPipe) id: number) {
		await this.userService.deleteUser(id);
		return { message: "User deleted successfully" };
	}

	@Put(":id")
	async updateUser(@Param("id", ParseIntPipe) id: number, @Body() body: unknown) {
		const parseResult = userUpdateDto.safeParse(body);
		if (!parseResult.success) {
			throw new BadRequestException(parseResult.error.flatten());
		}
		const user = await this.userService.updateUser(id, parseResult.data);
		return { message: "User updated successfully", user };
	}
}
