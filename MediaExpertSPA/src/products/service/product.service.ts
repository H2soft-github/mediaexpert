import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from './models/product';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService
{
  constructor(private http: HttpClient) {
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.webApi}api/Products/${id}`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.webApi}api/Products`);
  }

  postProduct(product: Product): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json');
    return this.http.post(`${environment.webApi}api/Products`, product, {headers});
  }

  putProduct(product: Product): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json');
    return this.http.put(`${environment.webApi}api/Products/${product.id}`, product, {headers});
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${environment.webApi}api/Products/${id}`);
  }
}
