import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Size } from '../../model/size.model';

@Injectable({
  providedIn: 'root',
})
export class SizeService {
  private apiUrl = 'http://localhost:3000/sizes'; // Thay đổi thành URL API thực tế của bạn

  constructor(private http: HttpClient) {}

  // Lấy danh sách các size
  getSizes(): Observable<Size[]> {
    return this.http.get<Size[]>(this.apiUrl);
  }

  // Lấy chi tiết một size theo id
  getSizeById(id: number): Observable<Size> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Size>(url);
  }

  // Tạo mới một size
  createSize(size: Size): Observable<Size> {
    return this.http.post<Size>(this.apiUrl, size);
  }

  // Cập nhật thông tin một size
  updateSize(size: Size): Observable<Size> {
    const url = `${this.apiUrl}/${size.id}`;
    return this.http.put<Size>(url, size);
  }

  // Xóa một size
  deleteSize(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
