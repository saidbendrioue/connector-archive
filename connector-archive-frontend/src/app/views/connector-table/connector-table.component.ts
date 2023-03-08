import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Connector } from 'src/app/models/connector.model';
import { ConnectorService } from 'src/app/services/connector.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ProprietyDropDownService } from 'src/app/services/propriety-drop-down.service';
import { Detection } from 'src/app/models/detection.model';
import { Mnumber } from 'src/app/models/mnumber.model';
import { Doc } from 'src/app/models/doc.model';
import { ROOT_FOLDER } from 'src/app/constants/environement';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  templateUrl: './connector-table.component.html',
  styleUrls: ['./connector-table.component.scss'],
  selector: 'connector-table.component',
})
export class ConnectorComponent implements OnInit {
  showConnectorStepper: boolean = false;
  showConnectorImage: boolean = false;

  connectors: Connector[] = [];
  selectedConnectors: Connector[] = [];

  currentConnector: Connector = {};
  currentImage = {};
  connectorDetailsArray: any[] = [];

  constructor(
    private _connectorService: ConnectorService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService,
    private _sanitizer: DomSanitizer,
    private _fileUploadService: FileUploadService
  ) {}

  ngOnInit() {
    this._connectorService.getConnectors().subscribe((data) => {
      this.connectors = data;
      this.connectors.forEach((connector) => {
        connector.thumbnail = this._sanitizer.bypassSecurityTrustResourceUrl(
          `data:image/png;base64,${connector.thumbnail}`
        );
      });
      if (this.connectors[0]) {
        this.onRowClick(this.connectors[0]);
      }
    });
  }

  openNew() {
    this.currentConnector = {};
    this.showConnectorStepper = true;
  }

  deleteSelectedConnectors() {
    this._confirmationService.confirm({
      message: 'Are you sure you want to delete the selected connectors?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedConnectors
          .map((connector) => connector.id)
          .forEach((id) => {
            if (id) {
              this._connectorService.deleteConnector(id).subscribe();
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
    this._confirmationService.confirm({
      message: 'Are you sure you want to delete ' + connector.partNumber + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (connector.id) {
          this._connectorService.deleteConnector(connector.id).subscribe({
            next: () => {
              this.connectors = this.connectors.filter(
                (val) => val.id !== connector.id
              );
              this.currentConnector = {};
              this.printSuccessMsg('Connector Deleted');
            },
            error: this.printErrorMsg,
          });
        }
      },
    });
  }

  printSuccessMsg(msg: string) {
    this._messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: msg,
      life: 3000,
    });
  }

  printErrorMsg() {
    this._messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'An unkown error occured',
      life: 3000,
    });
  }

  addConnector(connector: Connector) {
    if(connector){
      const index = this.findIndexById(connector?.id ?? -1);
      connector.thumbnail = this._sanitizer.bypassSecurityTrustResourceUrl(
        `data:image/png;base64,${connector?.thumbnail}`
      );
      if (index > -1) {
        this.connectors[index] = { ...connector };
      } else {
        this.connectors.push(connector);
      }
      this.onRowClick(connector);
    }
    this.showConnectorStepper = false;
  }

  onRowClick(connector: Connector) {
    this.connectorDetailsArray = [];
    this.currentConnector = connector;
    this.connectorDetailsArray.push({
      field: 'Part Number',
      value: `${connector.partNumber}`,
    });
    this.connectorDetailsArray.push({
      field: 'Color',
      value: `${connector.color}`,
    });
    this.connectorDetailsArray.push({
      field: 'Cavity Number',
      value: `${connector.cavitiesNumber}`,
    });
    this.connectorDetailsArray.push({
      field: 'Leak',
      value: `${connector.leak}`,
    });
    this.connectorDetailsArray.push({
      field: 'Gender',
      value: `${connector.gender}`,
    });

    this._fileUploadService
      .getFile(`${ROOT_FOLDER}/${connector.id}/${connector.image}`)
      .subscribe({
        next: (blob: Blob) => {
          this.currentImage = this._sanitizer.bypassSecurityTrustUrl(
            URL.createObjectURL(blob)
          );
        },
      });
  }

  updateDetections(detections: Detection[]) {
    this.currentConnector.detections = detections;
    this.updateConnector();
  }

  updateMnumbers(mnumbers: Mnumber[]) {
    this.currentConnector.mnumbers = mnumbers;
    this.updateConnector();
  }
  updateDocuments(documents: Doc[]) {
    this.currentConnector.documents = documents;
    this.updateConnector();
  }

  updateConnector() {
    this.currentConnector.thumbnail = null;
    this._connectorService
      .updateConnector(this.currentConnector, null)
      .subscribe({
        next: (connector) => {
          connector.thumbnail = this._sanitizer.bypassSecurityTrustResourceUrl(
            `data:image/png;base64,${connector.thumbnail}`
          );
          this.currentConnector = { ...connector };
          this.printSuccessMsg('Connector Updated');
        },
        error: this.printErrorMsg,
      });
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
}
