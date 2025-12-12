import { Body, Controller, Post } from "@nestjs/common";
import type { AgentCommandPayload, AutomationAgentService } from "./automation-agent.service";

@Controller("agent")
export class AutomationAgentController {
	constructor(private readonly agentService: AutomationAgentService) {}

	@Post("execute")
	async execute(@Body() command: { action: string; payload?: AgentCommandPayload }) {
		return this.agentService.executeCommand(command.action, command.payload);
	}
}
