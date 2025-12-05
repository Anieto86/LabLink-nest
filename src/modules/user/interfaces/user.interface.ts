/**
 * Interface representing the internal User entity in the application.
 * Do not confuse with DTOs, which are used for data transfer in HTTP routes.
 *
 * Example usage:
 * const user: User = { id: 1, name: "John", email: "john@mail.com" };
 *
 * Fields:
 * - id: Unique identifier for the user in the database.
 * - name: Full name of the user.
 * - email: User's email address.
 */
export interface User {
	id: number;
	name: string;
	email: string;
	// Agrega aquí otros campos relevantes de tu entidad de usuario
}
