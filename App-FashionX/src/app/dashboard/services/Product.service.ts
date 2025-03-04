// services/product.service.ts
// order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../model/product.model';
import { ProductDetail } from '../../model/productDetail.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductDetails(productId: number): Observable<ProductDetail[]> {
    return this.http.get<ProductDetail[]>(
      `${this.apiUrl}/${productId}/details`
    );
  }

  searchProducts(params: any): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/search`, { params });
  }

  uploadImage(file: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ imageUrl: string }>(
      `${this.apiUrl}/upload-image`,
      formData
    );
  }

  // ✅ Thêm phương thức này vào ProductService
  createProduct(productData: Product, productVariants: any[]): Observable<any> {
    const payload = { ...productData, variants: productVariants };
    return this.http.post<any>(this.apiUrl, payload);
  }
}
