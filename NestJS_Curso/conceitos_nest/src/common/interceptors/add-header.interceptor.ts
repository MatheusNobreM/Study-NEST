import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AddHeaderInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
     next: CallHandler<any>
    ): Observable<any> | Promise<Observable<any>> {
    const response = context.switchToHttp().getResponse();
    console.log('AddHeaderInterceptor executado');

    response.setHeader('X-Custom-Header', 'O Valor do cabeçalho');
    return next.handle();
  }
}