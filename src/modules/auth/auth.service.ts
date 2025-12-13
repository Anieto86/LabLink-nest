import { Injectable } from "@nestjs/common";

interface LoginPayload {
	email: string;
	password: string;
}

@Injectable()
export class AuthService {
	async login(_payload: LoginPayload) {
		// TODO: replace with real JWT issuance
		return { accessToken: "todo-implement-jwt" };
	}
}
