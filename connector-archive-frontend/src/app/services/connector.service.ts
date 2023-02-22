import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Connector } from 'src/app/models/connector.model';

@Injectable()
export class ConnectorService {
  apiUrl = 'http://localhost:8080/api/connectors';

  constructor(private http: HttpClient) {}

  getAllConnectors(): Observable<Connector[]> {
    return this.http.get<Connector[]>(this.apiUrl);
  }

  getConnector(id: number): Observable<Connector> {
    return this.http.get<Connector>(`${this.apiUrl}/${id}`);
  }

  createConnector(connector: Connector): Observable<Connector> {
    return this.http.post<Connector>(this.apiUrl, connector);
  }

  updateConnector(connector: Connector): Observable<Connector> {
    return this.http.put<Connector>(`${this.apiUrl}/${connector.id}`, connector);
  }

  deleteConnector(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
