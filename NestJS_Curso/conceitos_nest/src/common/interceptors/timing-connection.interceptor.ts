import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class TimingConnectionInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
     next: CallHandler<any>
    ){
      const startTime = Date.now();
      console.log('TimingConnectionInterceptor executado');

    return next.handle().pipe(
      tap(() => {
        const endTime = Date.now();
        const durationTime = endTime - startTime; 
        console.log(`TimingConnectionInterceptor: ${durationTime}ms`);
      }),
    );
  }
}