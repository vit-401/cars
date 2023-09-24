import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string | object;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    } else if (exception instanceof Error) {
      // For standard JavaScript errors.
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = { message: exception.message };
    } else {
      // For all unexpected errors.
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = { message: 'Internal server error' };
    }

    // Log the exception to the console or a file.
    this.logger.error(
      `HTTP Exception: ${message} \n Request: ${request.method} ${request.url} \n Stack: ${exception instanceof Error ? exception.stack : null}`
    );

    response.status(status).json({
      statusCode: status,
      ...(typeof message === 'object' ? message : { message }),
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
