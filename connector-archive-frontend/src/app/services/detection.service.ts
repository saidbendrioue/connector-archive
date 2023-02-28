import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../constants/environement';
import { Detection } from '../models/detection.model';

@Injectable({
  providedIn: 'root'
})
export class DetectionService {
  private apiUrl = API_BASE_URL + "/detections";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Detection[]> {
    return this.http.get<Detection[]>(this.apiUrl);
  }

  getById(id: number): Observable<Detection> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Detection>(url);
  }

  create(Detection: Detection): Observable<Detection> {
    return this.http.post<Detection>(this.apiUrl, Detection);
  }

  update(Detection: Detection): Observable<void> {
    const url = `${this.apiUrl}/${Detection.id}`;
    return this.http.put<void>(url, Detection);
  }

  delete(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
