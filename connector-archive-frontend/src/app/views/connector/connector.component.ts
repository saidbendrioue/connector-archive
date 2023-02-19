import { Component, OnInit } from '@angular/core';
import { Connector } from 'src/app/models/connector.model';
import { ConnectorService } from 'src/app/services/connector.service';

@Component({
    templateUrl: './connector.component.html',
    styleUrls: ['./connector.component.scss']
})
export class ConnectorComponent implements OnInit {

    connectors: Connector[] = [];

    constructor(private connectorService: ConnectorService) { }

    ngOnInit() {
        this.connectorService.getAll().subscribe(data => {
            this.connectors = data;
            console.log(data);
        } );
    }

}