/**
 * UserService: Main service for user-related business logic.
 * Provides simple methods to retrieve user info by ID or email.
 */
import { Injectable, NotFoundException } from "@nestjs/common";
import { hashPassword } from "../../infra/security/hash";
import type { UserCreate } from "./dtos/users.dtos";
import { toUserRead } from "./user.mapper";
import { UsersRepo } from "./user.repo";
@Injectable()
export class UserService {
	async getUserInfo(userId: number) {
		const user = await UsersRepo.findById(userId);
		if (!user) {
			throw new NotFoundException("User not found");
		}
		return toUserRead(user);
	}

	async getUserByEmail(email: string) {
		const user = await UsersRepo.findByEmail(email);
		if (!user) throw new NotFoundException("User not found");
		return toUserRead(user);
	}

	async createUser({ password, ...rest }: UserCreate) {
		const passwordHash = await hashPassword(password);
		const user = await UsersRepo.create({ ...rest, passwordHash });
		return toUserRead(user);
	}

	async deleteUser(userId: number) {
		const userDeleted = await UsersRepo.deleteById(userId);
		if (!userDeleted) throw new NotFoundException("User not found");
		return { id: userDeleted.id };
	}
}
