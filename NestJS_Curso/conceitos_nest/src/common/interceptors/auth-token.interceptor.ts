import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthTokenInterceptor implements NestInterceptor {
  async intercept( context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token || token !== 'AquiSimVemOToken') {
      throw new UnauthorizedException('Usuário não autorizado');
    }
    console.log(`Intercepted request with token: ${token}`);
    
    return next.handle();
  }
}