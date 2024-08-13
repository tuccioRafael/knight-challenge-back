import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    
    // Se a resposta de exceção for um array de mensagens
    const messages = Array.isArray(exceptionResponse['message']) ? exceptionResponse['message'] : [exceptionResponse['message']];
    
    response.status(status).json({
      statusCode: status,
      error: 'Unprocessable Entity',
      message: messages.join(', '), // Junta mensagens em uma única string
    });
  }
}
