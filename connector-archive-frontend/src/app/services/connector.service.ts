import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Connector } from '../models/connector.model';
import { API_BASE_URL } from '../constants/environement';


@Injectable({
  providedIn: 'root',
})
export class ConnectorService {

  constructor(private http: HttpClient) { }

  getConnectors(): Observable<Connector[]> {
    return this.http.get<Connector[]>(API_BASE_URL);
  }

  addConnector(connector: Connector): Observable<Connector> {
    return this.http.post<Connector>(API_BASE_URL, connector);
  }

  updateConnector(connector: Connector): Observable<Connector> {
    const url = `${API_BASE_URL}/${connector.id}`;
    return this.http.put<Connector>(url, connector);
  }

  deleteConnector(id: number): Observable<Connector> {
    const url = `${API_BASE_URL}/${id}`;
    return this.http.delete<Connector>(url);
  }
}
