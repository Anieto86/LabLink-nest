import type { InferSelectModel } from "drizzle-orm";
import type { user } from "../../infra/db/schema/users";
import type { UserRead } from "./dto/users.dto";

type UserRow = InferSelectModel<typeof user>;

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
