import { Injectable } from "@nestjs/common";

// Define a safe type for the payload
export type AgentCommandPayload = Record<string, unknown> | undefined;

@Injectable()
export class AutomationAgentService {
	async executeCommand(action: string, payload?: AgentCommandPayload) {
		// Example: simple logic for demo
		switch (action) {
			case "create-test-equipment":
				// Here would go the real logic to create test equipment
				return { status: "ok", message: "Test equipment created", payload };
			default:
				return { status: "error", message: "Unrecognized action", action };
		}
	}
}
