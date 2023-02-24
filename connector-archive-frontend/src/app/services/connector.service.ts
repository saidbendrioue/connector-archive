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
    connector.id = 0;
    connector.creationDate = new Date();
    connector.updateDate = new Date();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('connector', JSON.stringify(connector));

    return this.http.post(`${API_BASE_URL}/connectors`, formData);
  }

  updateConnector(connector: Connector, image: any): Observable<Connector> {
    connector.updateDate = new Date();
    const formData = new FormData();
    formData.append('file', image);
    formData.append('connector', JSON.stringify(connector));
    return this.http.put<Connector>(
      `${API_BASE_URL}/connectors/${connector.id}`,
      formData
    );
  }

  deleteConnector(id: number): Observable<Connector> {
    return this.http.delete<Connector>(`${API_BASE_URL}/connectors/${id}`);
  }
}
