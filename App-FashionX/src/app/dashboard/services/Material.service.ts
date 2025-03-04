import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from '../../model/material.model';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  private apiUrl = 'http://localhost:3000/Materials'; // Thay đổi thành URL API thực tế của bạn

  constructor(private http: HttpClient) {}

  // Lấy danh sách tất cả vật liệu
  getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(this.apiUrl);
  }

  // Lấy chi tiết vật liệu theo ID
  getMaterialById(id: number): Observable<Material> {
    return this.http.get<Material>(`${this.apiUrl}/${id}`);
  }

  // Tạo mới một vật liệu
  createMaterial(material: Material): Observable<Material> {
    return this.http.post<Material>(this.apiUrl, material);
  }

  // Cập nhật vật liệu
  updateMaterial(material: Material): Observable<Material> {
    return this.http.put<Material>(`${this.apiUrl}/${material.id}`, material);
  }

  // Xóa vật liệu
  deleteMaterial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
