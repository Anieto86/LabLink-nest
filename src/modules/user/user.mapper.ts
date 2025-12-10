import type { InferSelectModel } from "drizzle-orm";
import type { users } from "../../infra/db/schema/users";
import type { UserRead } from "./dto/users.dtos";

type UserRow = InferSelectModel<typeof users>;

export function toUserRead(u: UserRow): UserRead {
	if (u.role == null) {
		throw new Error("User role cannot be null");
	}
	return {
		id: u.id,
		name: u.name,
		role: u.role,
		email: u.email,
		isActive: u.isActive,
		createdAt: u.createdAt?.toISOString() ?? new Date().toISOString(),
	};
}
