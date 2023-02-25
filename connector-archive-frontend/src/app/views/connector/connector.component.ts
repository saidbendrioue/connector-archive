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
  connectorDialog: boolean = false;

  connectors: Connector[] = [];

  connector: Connector = {};

  selectedConnectors: Connector[] = [];

  submitted: boolean = false;

  showConnectorImage: boolean = false;

  currentImage = {};

  pdpValues: any[] = [];

  constructor(
    private connectorService: ConnectorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _sanitizer: DomSanitizer,
    private proprietyDropDownService: ProprietyDropDownService
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
    this.proprietyDropDownService.getAll().subscribe({
      next: (data) => {
        this.pdpValues = data.map((e) => e.value);
      },
      error: (e) => {
        alert(e?.error);
      },
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
        this.printSuccessMsg('Connector Deleted');
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
              this.printSuccessMsg('Connector Deleted');
            },
            error: () => this.printErrorMsg('An unkown error occured'),
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

    if (!this.connector.id) {
      this.connectorService
        .addConnector(this.connector, this.currentImage)
        .subscribe({
          next: (connector) => {
            connector.thumbnail =
              this._sanitizer.bypassSecurityTrustResourceUrl(
                `data:image/png;base64,${connector.thumbnail}`
              );
            this.printSuccessMsg('Connector Created');
            this.connectors.push(connector);
            this.addPdpValueIfNotExist(connector);
          },
          error: () => {
            this.printErrorMsg('Unknown Error Occured');
          },
        });
    } else {
      this.connector.thumbnail = null;
      this.connectorService
        .updateConnector(this.connector, this.currentImage)
        .subscribe({
          next: (connector) => {
            this.printSuccessMsg('Connector Updated');
            if (connector.id) {
              connector.thumbnail =
                this._sanitizer.bypassSecurityTrustResourceUrl(
                  `data:image/png;base64,${connector.thumbnail}`
                );
              this.connectors[this.findIndexById(connector.id)] = connector;
            }
            this.addPdpValueIfNotExist(connector);
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

  addPdpValueIfNotExist(connector : Connector) {
    if (this.pdpValues.indexOf(connector.color) == -1) {
      this.proprietyDropDownService
        .create({ type: 'color', value: connector.color })
        .subscribe({
          next: (pdp) => {
            this.pdpValues.push(pdp.value);
          },
          error: (e) => {
            this.printErrorMsg('Unknown Error Occured');
          },
        });
    }
  }
}
