import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

//Questo filtro cattura qualsiasi eccezione in uscita dal back end, diretto verso il fornt end e ne controlla il suo type. In caso no nfosse gestito, e quindi autogenerato dal nestjs e quindi contenten probabilemtne inf osensibili, esso lo filtra e lo trasforma in une rrore più strutturato (personalizzato). Va inserito come middleware nel main.ts
@Catch() //decorator marcatore di filtro degli exception! 
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    
    let status: number;
    let message: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      // Estrai il messaggio direttamente se è una stringa, altrimenti se è un oggetto con 'message'
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && 'message' in exceptionResponse) {
        message = (exceptionResponse as any).message;
      } else {
        message = 'An error occurred'; // Messaggio generico se non trovato
      }
    } else {
      // Gestisci errori non HTTP con un messaggio generico
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message, // Aggiungi solo il messaggio
    });
  }
}