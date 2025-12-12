import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { createEquipmentDto, updateEquipmentDto } from "./dto/equipment.dto";
import type { EquipmentService } from "./equipment.service";

@ApiTags("equipment")
@Controller("equipment")
export class EquipmentController {
	constructor(private readonly equipmentService: EquipmentService) {}

	/**
	 * GET /equipment
	 * List all equipment
	 */
	@ApiOperation({ summary: "List all equipment" })
	@ApiResponse({ status: 200, description: "List of equipment returned." })
	@Get()
	async getAll() {
		return await this.equipmentService.getAllEquipment();
	}

	/**
	 * GET /equipment/:id
	 * Get equipment by id
	 */
	@ApiOperation({ summary: "Get equipment by id" })
	@ApiParam({ name: "id", type: Number })
	@ApiResponse({ status: 200, description: "Equipment found." })
	@Get(":id")
	async getById(@Param("id", ParseIntPipe) id: number) {
		return await this.equipmentService.getEquipmentById(id);
	}

	/**
	 * POST /equipment
	 * Create new equipment
	 */
	@ApiOperation({ summary: "Create new equipment" })
	@ApiBody({ type: Object })
	@ApiResponse({ status: 201, description: "Equipment created." })
	@Post()
	async create(@Body() body: unknown) {
		const parseResult = createEquipmentDto.safeParse(body);
		if (!parseResult.success) {
			throw new BadRequestException(parseResult.error.flatten());
		}
		return await this.equipmentService.createEquipment(parseResult.data);
	}

	/**
	 * PATCH /equipment/:id
	 * Update existing equipment
	 */
	@ApiOperation({ summary: "Update existing equipment" })
	@ApiParam({ name: "id", type: Number })
	@ApiBody({ type: Object })
	@ApiResponse({ status: 200, description: "Equipment updated." })
	@Patch(":id")
	async update(@Param("id", ParseIntPipe) id: number, @Body() body: unknown) {
		const parseResult = updateEquipmentDto.safeParse(body);
		if (!parseResult.success) {
			throw new BadRequestException(parseResult.error.flatten());
		}
		return await this.equipmentService.updateEquipment(id, parseResult.data);
	}

	/**
	 * Delete equipment by id
	 */
	@ApiOperation({ summary: "Delete equipment by id" })
	@ApiParam({ name: "id", type: Number })
	@ApiResponse({ status: 200, description: "Equipment deleted." })
	@Delete(":id")
	async delete(@Param("id", ParseIntPipe) id: number) {
		return await this.equipmentService.deleteEquipment(id);
	}
}
