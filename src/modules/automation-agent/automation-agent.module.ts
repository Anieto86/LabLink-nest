import { Module } from "@nestjs/common";
import { AutomationAgentController } from "./automation-agent.controller";
import { AutomationAgentService } from "./automation-agent.service";

@Module({
	controllers: [AutomationAgentController],
	providers: [AutomationAgentService],
})
export class AutomationAgentModule {}
