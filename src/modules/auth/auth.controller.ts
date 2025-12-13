import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";

class LoginDto {
	email!: string;
	password!: string;
}

@ApiTags("auth")
@Controller("auth")
export class AuthController {
	constructor(@Inject(AuthService) private readonly authService: AuthService) {}

	@ApiOperation({ summary: "Authenticate user (placeholder)" })
	@ApiBody({ type: LoginDto })
	@Post("login")
	async login(@Body() body: LoginDto) {
		return this.authService.login(body);
	}
}
