import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDetail } from '../../model/productDetail.model';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailService {
  private apiUrl = 'http://localhost:3000/productDetails'; // Cập nhật URL API

  constructor(private http: HttpClient) {}

  getProductDetails(): Observable<ProductDetail[]> {
    return this.http.get<ProductDetail[]>(this.apiUrl);
  }
}
