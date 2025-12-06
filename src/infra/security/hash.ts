import bcrypt from "bcrypt";

const DEFAULT_SALT_ROUNDS = 10;

function getSaltRounds(): number {
	const value = process.env.SALT_ROUNDS;
	if (value === undefined) return DEFAULT_SALT_ROUNDS;
	const parsed = Number(value);
	if (!Number.isInteger(parsed) || parsed <= 0) {
		throw new Error("Invalid SALT_ROUNDS env (must be a positive integer)");
	}
	return parsed;
}

export async function hashPassword(password: string): Promise<string> {
	const saltRounds = getSaltRounds();
	return bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
	return bcrypt.compare(password, hash);
}
