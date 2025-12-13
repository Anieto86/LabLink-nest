import { Module } from "@nestjs/common";
import { AllExceptionsFilter } from "./filters/all-exceptions.filter";

/**
 * Common module exposing reusable filters. Pipes with runtime schemas (like Zod) should be
 * instantiated manually per-route (e.g., `new ZodValidationPipe(schema)`), so they are not
 * provided here to avoid DI resolution errors.
 */
@Module({
	providers: [AllExceptionsFilter],
	exports: [AllExceptionsFilter],
})
export class CommonModule {}
