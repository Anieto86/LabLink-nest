import type { InferSelectModel } from "drizzle-orm";
import type { users } from "../../infra/db/schema";
import type { UserRead } from "./dto/users.dto";

type UserRow = InferSelectModel<typeof users>;

export function toUserRead(u: UserRow): UserRead {
	if (u.role == null) {
		throw new Error("User role cannot be null");
	}
	return {
		id: u.id,
		name: u.name,
		role: u.role as UserRead["role"],
		email: u.email,
		isActive: u.isActive,
		createdAt: u.createdAt ?? new Date().toISOString(),
	};
}
