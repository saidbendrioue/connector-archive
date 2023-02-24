import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Connector } from '../models/connector.model';
import { API_BASE_URL } from '../constants/environement';

@Injectable({
  providedIn: 'root',
})
export class ConnectorService {
  constructor(private http: HttpClient) {}

  getConnectors(): Observable<Connector[]> {
    return this.http.get<Connector[]>(`${API_BASE_URL}/connectors`);
  }

  addConnector(connector: Connector, file: any): Observable<Connector> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('connector', JSON.stringify(connector));
    return this.http.post(`${API_BASE_URL}/connectors`, formData);
  }

  updateConnector(connector: Connector): Observable<Connector> {
    const url = `${API_BASE_URL}/connectors/${connector.id}`;
    return this.http.put<Connector>(url, connector);
  }

  deleteConnector(id: number): Observable<Connector> {
    const url = `${API_BASE_URL}/connectors/${id}`;
    return this.http.delete<Connector>(url);
  }
}
