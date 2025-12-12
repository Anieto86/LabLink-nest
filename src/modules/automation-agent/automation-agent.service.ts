import { Injectable } from "@nestjs/common";

// Define un tipo seguro para el payload
export type AgentCommandPayload = Record<string, unknown> | undefined;

@Injectable()
export class AutomationAgentService {
	async executeCommand(action: string, payload?: AgentCommandPayload) {
		// Ejemplo: lógica simple para demo
		switch (action) {
			case "create-test-equipment":
				// Aquí iría la lógica real para crear equipos de prueba
				return { status: "ok", message: "Equipos de prueba creados", payload };
			default:
				return { status: "error", message: "Acción no reconocida", action };
		}
	}
}
