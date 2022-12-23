import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiEndPoint: string = "https://localhost:7127/";

  constructor(private http: HttpClient) {
  
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  getAllProducts(request: any): Observable<any> {

    return this.http.get<any>(this.apiEndPoint + 'api/Products', { params: request }).pipe(
      map(this.extractData));
  }
}
