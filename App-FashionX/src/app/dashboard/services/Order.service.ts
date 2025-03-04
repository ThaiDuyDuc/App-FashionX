// services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../model/order.model';
import { Payment } from '../../model/payment.model';

// services/order.service.ts
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'api/orders';

  constructor(private http: HttpClient) {}

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  getPendingOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/pending`);
  }

  completeOrder(orderId: number, payment: Payment): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${orderId}/complete`, payment);
  }
}
