/**
 * UserService: Main service for user-related business logic.
 * Provides simple methods to retrieve user info by ID or email.
 */
import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { hashPassword } from "../../infra/security/hash";
import type { UserCreate, UserUpdate } from "./dto/users.dto";
import { toUserRead } from "./user.mapper";
import { UserRepo } from "./user.repo";

@Injectable()
export class UserService {
	constructor(@Inject(UserRepo) private readonly userRepo: UserRepo) {}

	async getUserInfo(userId: number) {
		const user = await this.userRepo.findById(userId);
		if (!user) {
			throw new NotFoundException("User not found");
		}
		return toUserRead(user);
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepo.findByEmail(email);
		if (!user) throw new NotFoundException("User not found");
		return toUserRead(user);
	}

	async createUser({ password, ...rest }: UserCreate) {
		const passwordHash = await hashPassword(password);

		try {
			const user = await this.userRepo.create({ ...rest, passwordHash });
			return toUserRead(user);
		} catch (error: unknown) {
			if (isUniqueViolationError(error)) {
				throw new ConflictException("Email already in use");
			}
			throw error;
		}
	}

	async deleteUser(userId: number) {
		const userDeleted = await this.userRepo.deleteById(userId);
		if (!userDeleted) throw new NotFoundException("User not found");
		return { id: userDeleted.id };
	}

	async updateUser(id: number, updateData: UserUpdate) {
		const existing = await this.userRepo.findById(id);
		if (!existing) {
			throw new NotFoundException("User not found");
		}

		const updatePayload: {
			name?: string;
			email?: string;
			role?: UserUpdate["role"];
			isActive?: boolean;
			passwordHash?: string;
		} = {};

		if (updateData.name !== undefined) updatePayload.name = updateData.name;
		if (updateData.email !== undefined) updatePayload.email = updateData.email;
		if (updateData.role !== undefined) updatePayload.role = updateData.role;
		if (updateData.isActive !== undefined) updatePayload.isActive = updateData.isActive;
		if (updateData.password) {
			updatePayload.passwordHash = await hashPassword(updateData.password);
		}

		if (Object.keys(updatePayload).length === 0) {
			return toUserRead(existing); // nothing to update
		}

		try {
			const updated = await this.userRepo.updateById(id, updatePayload);
			if (!updated) throw new NotFoundException("User not found");
			return toUserRead(updated);
		} catch (err) {
			if (isUniqueViolationError(err)) throw new ConflictException("Email already in use");
			throw err;
		}
	}
}

function isUniqueViolationError(error: unknown): boolean {
	return (
		typeof error === "object" &&
		error !== null &&
		"code" in error &&
		(error as { code?: string }).code === "23505"
	);
}
