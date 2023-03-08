import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Connector } from 'src/app/models/connector.model';
import { ProprietyDropDownService } from 'src/app/services/propriety-drop-down.service';

@Component({
  selector: 'app-detections-table',
  templateUrl: './detections-table.component.html',
})
export class DetectionTableComponent implements OnInit {
  newDetection: boolean = false;
  @Input() connector: Connector = {};
  @Output() onChange = new EventEmitter();
  pdpValues: any[] = [];

  constructor(
    private proprietyDropDownService: ProprietyDropDownService
  ) {}

  ngOnInit(): void {
    this.proprietyDropDownService.getAll().subscribe({
      next: (data) => {
        this.pdpValues = data.map((e) => e.value);
      },
      error: (e) => {
        alert(e?.error);
      },
    });
  }

  addDetection() {
    this.connector.detections = [
      { name: '', color: '', description: '' },
      ...(this.connector?.detections ?? []),
    ];
  }

  verifyAddedDetection() {
    for (const detection of this.connector?.detections ?? []) {
      if (!detection.name || !detection.color) {
        return false;
      }
    }
    return true;
  }

  changeDetection() {
    if (this.verifyAddedDetection()) {
      this.onChange.emit(this.connector?.detections);
    }
  }

  deleteDetection(index: number) {
    this.connector?.detections?.splice(index, 1);
    this.changeDetection();
  }
}
