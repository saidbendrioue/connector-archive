import { Component, OnInit } from '@angular/core';
import { Connector } from 'src/app/models/connector.model';
import { ConnectorService } from 'src/app/services/connector.service';

@Component({
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.scss'],
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
})
export class ConnectorComponent implements OnInit {
  connector: Connector = {};
  connectors: Connector[] = [];
  selectedConnectors: Connector[] = [];
  connectorsForDelete : Connector[] = [];
  connectorDialog = false;

  constructor(private connectorService: ConnectorService) {}

  ngOnInit() {
    this.connectorService.getAllConnectors().subscribe((data) => {
      this.connectors = data;
      console.log(data);
    });
  }


  createConnector() {
    this.connectorService.createConnector(this.connector).subscribe((data) => {
      this.connector = data;
    });
  }

  deleteConnector(id:number) {
    this.connectorService.deleteConnector(id).subscribe();
  }

  updateConnector() {
    this.connectorService.updateConnector(this.connector).subscribe((data) => {
      this.connector = data;
    });
  }

}
