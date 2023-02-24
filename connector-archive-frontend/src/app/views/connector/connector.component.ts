import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Connector } from 'src/app/models/connector.model';
import { ConnectorService } from 'src/app/services/connector.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.scss'],
  selector: 'connector-component',
})
export class ConnectorComponent implements OnInit {
  connectorDialog: boolean = false;

  connectors: Connector[] = [];

  connector: Connector = {};

  selectedConnectors: Connector[] = [];

  submitted: boolean = false;

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
          'data:image/png;base64,' + connector.thumbnail
        );
      });
    });
  }

  openNew() {
    this.connector = {};
    this.submitted = false;
    this.connectorDialog = true;
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
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Connectors Deleted',
          life: 3000,
        });
      },
    });
  }

  editConnector(connector: Connector) {
    this.connector = { ...connector };
    this.connectorDialog = true;
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
              this.connector = {};
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Connector Deleted',
                life: 3000,
              });
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'An unkown error occured',
                life: 3000,
              });
            },
          });
        }
      },
    });
  }

  hideDialog() {
    this.connectorDialog = false;
    this.submitted = false;
  }

  saveConnector() {
    this.submitted = true;

    if (this.connector.id) {
      this.connectors[this.findIndexById(this.connector.id)] = this.connector;
      this.connector.updateDate = new Date();
      this.connectorService.updateConnector(this.connector).subscribe({
        next: () => {
          this.printSuccessMsg('Connector Updated');
        },
        error: () => {},
      });
    } else {
      this.connector.id = 0;
      this.connector.image = 'connector-placeholder.svg';
      this.connector.creationDate = new Date();
      this.connector.updateDate = new Date();
      this.connectorService
        .addConnector(this.connector, this.currentImage)
        .subscribe({
          next: (connector) => {
            connector.thumbnail = this._sanitizer.bypassSecurityTrustResourceUrl(
              'data:image/png;base64,' + connector.thumbnail
            );
            this.connectors.push(connector);
            this.printSuccessMsg('Connector Created');
          },
          error: () => {
            this.printErrorMsg('Unknown Error Occured');
          },
        });
    }

    this.connectorDialog = false;
    this.connector = {};
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.connectors.length; i++) {
      if (this.connectors[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  myUploader(event: any) {
    this.currentImage = event.files[0];
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
}
