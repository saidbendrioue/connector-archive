import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../constants/environement';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private apiUrl = API_BASE_URL + '/files';

  constructor(private http: HttpClient) {}

  uploadFile(files: any[], path: string): Observable<any> {
    const formData = new FormData();
    for (var file of files) {
      formData.append('files', file);
    }
    formData.append('path', path);
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  getFile(path: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}`,{ responseType: 'blob',params : {
      path : path
    } });
  }
}
