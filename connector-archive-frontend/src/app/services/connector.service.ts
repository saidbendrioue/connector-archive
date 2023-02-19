import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Connector } from 'src/app/models/connector.model';

@Injectable()
export class ConnectorService {

    BASE_URI = "localhost:8080/api/";

    constructor(private httpClient: HttpClient) { }

    getAll(): Observable<Connector[]> {
        return this.httpClient.get<Connector[]>(this.BASE_URI + "connectors");
      }

}