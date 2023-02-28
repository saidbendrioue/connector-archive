import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService, MenuItem } from 'primeng/api';
import { Connector } from 'src/app/models/connector.model';
import { Detection } from 'src/app/models/detection.model';
import { ConnectorService } from 'src/app/services/connector.service';
import { ProprietyDropDownService } from 'src/app/services/propriety-drop-down.service';

@Component({
  selector: 'app-connector-stepper',
  templateUrl: './connector-stepper.component.html',
  styleUrls: ['./connector-stepper.component.scss'],
})
export class ConnectorStepperComponent implements OnInit {
  @Input() visibility: boolean = false;
  @Input() currentConnector: Connector = {};
  submitted: boolean = false;
  currentImage = {};
  pdpValues: any[] = [];
  items: MenuItem[] = [
    { label: 'Connector details' },
    { label: 'Detections' },
    { label: 'Documents' },
    { label: 'Done' },
  ];
  activeIndex: number = 0;
  editMode: boolean = false;
  newDetection: boolean = false;

  @Output() onCloseEvent = new EventEmitter<Connector>();

  constructor(
    private connectorService: ConnectorService,
    private messageService: MessageService,
    private _sanitizer: DomSanitizer,
    private proprietyDropDownService: ProprietyDropDownService
  ) {}

  ngOnInit() {
    this.proprietyDropDownService.getAll().subscribe({
      next: (data) => {
        this.pdpValues = data.map((e) => e.value);
      },
      error: (e) => {
        alert(e?.error);
      },
    });
    this.editMode = this.currentConnector.id ? true : false;
  }

  createConnector() {
    if (!this.currentConnector.detections) {
      this.currentConnector.detections = [];
    }
    this.connectorService
      .addConnector(this.currentConnector, this.currentImage)
      .subscribe({
        next: (connector) => {
          this.addPdpValueIfNotExist(connector);
          this.onCloseEvent.emit(connector);
        },
        error: () => {
          this.printErrorMsg('Unknown Error Occured');
        },
      });
  }

  saveConnector() {
    if (!this.currentConnector.id) {
      this.createConnector();
    } else {
      this.updateConnector();
    }
    this.visibility = false;
  }

  updateConnector() {
    this.currentConnector.thumbnail = null;
    this.connectorService
      .updateConnector(this.currentConnector, this.currentImage)
      .subscribe({
        next: (connector) => {
          connector.thumbnail = this._sanitizer.bypassSecurityTrustResourceUrl(
            `data:image/png;base64,${connector.thumbnail}`
          );
          this.addPdpValueIfNotExist(connector);
          this.onCloseEvent.emit(connector);
          this.printSuccessMsg('Connector Updated');
        },
        error: () => {
          this.printErrorMsg('Unknown Error Occured');
        },
      });
    this.onCloseEvent.emit(this.currentConnector);
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

  addPdpValueIfNotExist(connector: Connector) {
    if (this.pdpValues.indexOf(connector.color) == -1) {
      this.proprietyDropDownService
        .create({ type: 'color', value: connector.color })
        .subscribe({
          next: (pdp) => {
            this.printSuccessMsg('Connector Created');
          },
          error: (e) => {
            this.printErrorMsg('Unknown Error Occured');
          },
        });
    }
  }
  nextStep() {
    if (this.activeIndex === 1) {
      this.saveConnector();
    }
    this.activeIndex++;
  }
  previousStep() {
    this.activeIndex--;
  }

  onDetectionStepClose($event: Detection[]) {
    this.currentConnector.detections = $event;
  }
}
