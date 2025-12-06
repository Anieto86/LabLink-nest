import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Inject,
	ParseIntPipe,
	Post,
	Query,
} from "@nestjs/common";
import { userCreateDto } from "./dtos/users.dtos";
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
}
