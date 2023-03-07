import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService, MenuItem } from 'primeng/api';
import { Connector } from 'src/app/models/connector.model';
import { Detection } from 'src/app/models/detection.model';
import { Mnumber } from 'src/app/models/mnumber.model';
import { ProprietyDropDown } from 'src/app/models/propriety-dropdown.model';
import { ConnectorService } from 'src/app/services/connector.service';
import { ProprietyDropDownService } from 'src/app/services/propriety-drop-down.service';

@Component({
  selector: 'app-connector-stepper',
  templateUrl: './connector-stepper.component.html',
})
export class ConnectorStepperComponent implements OnInit {
  @Input() visibility: boolean = false;
  @Input() currentConnector: Connector = {};
  submitted: boolean = false;
  currentImage = {};
  pdpValues: ProprietyDropDown[] = [];
  items: MenuItem[] = [
    { label: 'Connector details' },
    { label: 'Detections' },
    { label: 'Mnumbers' },
    { label: 'Customers PartNumbers' },
    { label: 'Documents' },
    { label: 'Done' },
  ];
  activeIndex: number = 0;
  editMode: boolean = false;
  newDetection: boolean = false;

  @Output() onCloseEvent = new EventEmitter<Connector>();

  constructor(
    private _connectorService: ConnectorService,
    private _messageService: MessageService,
    private _sanitizer: DomSanitizer,
    private _proprietyDropDownService: ProprietyDropDownService
  ) {}

  ngOnInit() {
    this._proprietyDropDownService.getAll().subscribe({
      next: (data) => {
        this.pdpValues = data;
      },
      error: (e) => {
        alert(e?.error);
      },
    });
    this.editMode = this.currentConnector.id ? true : false;
  }

  createConnector() {
    this.currentConnector.detections = this.currentConnector.detections ?? [];
    this.currentConnector.mnumbers = this.currentConnector.mnumbers ?? [];
    this.currentConnector.documents = this.currentConnector.documents ?? [];
    this.currentConnector.customerPartNumbers =
      this.currentConnector.customerPartNumbers ?? [];

    this._connectorService
      .addConnector(this.currentConnector, this.currentImage)
      .subscribe({
        next: (connector) => {
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
    this._connectorService
      .updateConnector(this.currentConnector, this.currentImage)
      .subscribe({
        next: (connector) => {
          this.onCloseEvent.emit(connector);
          this.printSuccessMsg('Connector Updated');
        },
        error: () => {
          this.printErrorMsg('Unknown Error Occured');
        },
      });
  }

  myUploader(event: any) {
    this.currentImage = event.files[0];
  }

  printSuccessMsg(msg: string) {
    this._messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: msg,
      life: 3000,
    });
  }

  printErrorMsg(msg: string) {
    this._messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: msg,
      life: 3000,
    });
  }

  nextStep() {
    if (this.activeIndex === 4) {
      this.saveConnector();
    }
    this.activeIndex++;
  }

  previousStep() {
    if (this.activeIndex === 0) {
      this.onCloseEvent.emit();
    } else {
      this.activeIndex--;
    }
  }

  onDetectionStepClose(detections: Detection[]) {
    this.currentConnector.detections = detections;
  }

  onMnumberStepClose(mnumbers: Mnumber[]) {
    this.currentConnector.mnumbers = mnumbers;
  }

  getConnectorColors() {
    return this.pdpValues.filter((item) => item.type == 'connector_color');
  }
  getConnectorTypes() {
    return this.pdpValues.filter((item) => item.type == 'connector_type');
  }
}
