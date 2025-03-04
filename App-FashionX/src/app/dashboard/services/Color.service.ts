import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Color } from '../../model/color.model';
@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private apiUrl = 'http://localhost:3000/Colors'; // Thay đổi thành URL API thực tế của bạn

  constructor(private http: HttpClient) {}

  // Lấy danh sách tất cả các màu
  getColors(): Observable<Color[]> {
    return this.http.get<Color[]>(this.apiUrl);
  }

  // Lấy chi tiết màu theo ID
  getColorById(id: number): Observable<Color> {
    return this.http.get<Color>(`${this.apiUrl}/${id}`);
  }

  // Tạo mới một màu
  createColor(color: Color): Observable<Color> {
    return this.http.post<Color>(this.apiUrl, color);
  }

  // Cập nhật màu
  updateColor(color: Color): Observable<Color> {
    return this.http.put<Color>(`${this.apiUrl}/${color.id}`, color);
  }

  // Xóa màu
  deleteColor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
