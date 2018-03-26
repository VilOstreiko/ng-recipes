import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import * as env from '../../../environments/environment';

export class HttpInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modifiedReq = req.clone({
      url: this.modifyUrl(req.url)
    });
    return next.handle(modifiedReq);
  }

  private modifyUrl(collection: string): string {
    return `${env.environment.apiUrl}${collection}`;
  }
}
