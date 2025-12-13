import {
	type ArgumentsHost,
	Catch,
	type ExceptionFilter,
	HttpException,
	HttpStatus,
} from "@nestjs/common";

/**
 * Basic exception filter to normalize error responses.
 * Not registered globally by default; import and bind where needed.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();

		const status =
			exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
		const message =
			exception instanceof HttpException ? exception.getResponse() : String(exception);

		response.status(status).json({
			statusCode: status,
			path: request.url,
			message,
		});
	}
}
