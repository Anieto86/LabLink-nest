/**
 * UserService: Main service for user-related business logic.
 * Provides simple methods to retrieve user info by ID or email.
 */
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
	// User service methods would go here

	async getUserInfo(userId: number) {
		// Placeholder for user info retrieval logic
		return { id: userId, name: "John Doe", email: "john.doe@example.com" };
	}

	async getUserByEmail(email: string) {
		// Placeholder for user retrieval by email logic
		return { id: 1, name: "John Doe", email: email };
	}
}
