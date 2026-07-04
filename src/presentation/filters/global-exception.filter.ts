import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainError } from '../../domain/exceptions/domain.error';
import { NotFoundError } from '../../domain/exceptions/not-found.error';
import { ConflictError } from '../../domain/exceptions/conflict.error';
import { BusinessRuleError } from '../../domain/exceptions/business-rule.error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';
    let errorCode = 'INTERNAL_ERROR';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message = typeof exceptionResponse === 'string' ? exceptionResponse : (exceptionResponse as any).message || exception.message;
      errorCode = 'HTTP_EXCEPTION';
    } else if (exception instanceof DomainError) {
      if (exception instanceof NotFoundError) {
        status = HttpStatus.NOT_FOUND;
        errorCode = 'NOT_FOUND';
      } else if (exception instanceof ConflictError) {
        status = HttpStatus.CONFLICT;
        errorCode = 'CONFLICT';
      } else if (exception instanceof BusinessRuleError) {
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        errorCode = 'BUSINESS_RULE_VIOLATION';
      } else {
        status = HttpStatus.BAD_REQUEST;
        errorCode = 'DOMAIN_ERROR';
      }
      message = exception.message;
    }

    // Log estructurado conforme definido em ARCHITECTURE.md
    if (status >= 500) {
      this.logger.error(`[${request.method}] ${request.url} - ${status} - ${exception instanceof Error ? exception.message : 'Unknown Error'}`, exception instanceof Error ? exception.stack : '');
    } else {
      this.logger.warn(`[${request.method}] ${request.url} - ${status} - ${message}`);
    }

    response.status(status).json({
      statusCode: status,
      errorCode,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
