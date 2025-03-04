// services/voucher.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Voucher } from '../../model/voucher.model';
import { Order } from '../../model/order.model';

@Injectable({
  providedIn: 'root',
})
export class VoucherService {
  private apiUrl = 'http://localhost:3000/vouchers';

  constructor(private http: HttpClient) {}

  getActiveVouchers(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(`${this.apiUrl}/active`);
  }

  applyVoucher(orderId: number, voucherId: number): Observable<Order> {
    return this.http.post<Order>(
      `${this.apiUrl}/${voucherId}/apply/${orderId}`,
      {}
    );
  }
  getVoucherById(voucherId: number): Observable<Voucher> {
    return this.http.get<Voucher>(`${this.apiUrl}/${voucherId}`);
  }
}
