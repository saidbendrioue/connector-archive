import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Connector } from 'src/app/models/connector.model';
import { ConnectorService } from 'src/app/services/connector.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ProprietyDropDownService } from 'src/app/services/propriety-drop-down.service';

@Component({
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.scss'],
  selector: 'connector-component',
})
export class ConnectorComponent implements OnInit {
  showConnectorStepper: boolean = false;
  showConnectorImage: boolean = false;

  connectors: Connector[] = [];
  selectedConnectors: Connector[] = [];

  currentConnector: Connector = {};
  currentImage = {};

  constructor(
    private connectorService: ConnectorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.connectorService.getConnectors().subscribe((data) => {
      this.connectors = data;
      this.connectors.forEach((connector) => {
        connector.thumbnail = this._sanitizer.bypassSecurityTrustResourceUrl(
          `data:image/png;base64,${connector.thumbnail}`
        );
      });
    });
  }

  openNew() {
    this.currentConnector = {};
    this.showConnectorStepper = true;
  }

  deleteSelectedConnectors() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected connectors?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedConnectors
          .map((connector) => connector.id)
          .forEach((id) => {
            if (id) {
              this.connectorService.deleteConnector(id).subscribe();
            }
          });
        this.connectors = this.connectors.filter(
          (val) => !this.selectedConnectors.includes(val)
        );
        this.selectedConnectors = [];
        this.printSuccessMsg('Connector Deleted');
      },
    });
  }

  editConnector(connector: Connector) {
    this.currentConnector = { ...connector };
    this.showConnectorStepper = true;
  }

  deleteConnector(connector: Connector) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + connector.partNumber + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (connector.id) {
          this.connectorService.deleteConnector(connector.id).subscribe({
            next: () => {
              this.connectors = this.connectors.filter(
                (val) => val.id !== connector.id
              );
              this.currentConnector = {};
              this.printSuccessMsg('Connector Deleted');
            },
            error: () => this.printErrorMsg('An unkown error occured'),
          });
        }
      },
    });
  }

  printSuccessMsg(msg: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: msg,
      life: 3000,
    });
  }

  printErrorMsg(msg: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: msg,
      life: 3000,
    });
  }

  onThumbnailClick(imageName: string) {
    this.connectorService.getConnectorImage(imageName).subscribe({
      next: (blob: Blob) => {
        this.showConnectorImage = true;
        this.currentImage = this._sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(blob)
        );
      },
    });
  }
  addConnector(connector: Connector) {
    if(connector){
      connector.thumbnail = this._sanitizer.bypassSecurityTrustResourceUrl(
        `data:image/png;base64,${connector.thumbnail}`
      );
      this.connectors.push(connector);
    }
    this.showConnectorStepper = false;
  }
}
