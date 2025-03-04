// style.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Style } from '../../model/style.model';

@Injectable({
  providedIn: 'root',
})
export class StyleService {
  private apiUrl = 'http://localhost:3000/Style';

  constructor(private http: HttpClient) {}

  getStyles(): Observable<Style[]> {
    return this.http.get<Style[]>(this.apiUrl);
  }

  getStyle(id: number): Observable<Style> {
    return this.http.get<Style>(`${this.apiUrl}/${id}`);
  }

  createStyle(style: Partial<Style>): Observable<Style> {
    return this.http.post<Style>(this.apiUrl, style);
  }

  updateStyle(id: number, style: Partial<Style>): Observable<Style> {
    return this.http.put<Style>(`${this.apiUrl}/${id}`, style);
  }

  deleteStyle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
