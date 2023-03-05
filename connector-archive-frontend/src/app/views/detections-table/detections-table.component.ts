import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Detection } from 'src/app/models/detection.model';

@Component({
  selector: 'app-detections-table',
  templateUrl: './detections-table.component.html'
})
export class DetectionTableComponent implements OnInit {
  newDetection: boolean = false;
  @Input() detections: Detection[] = [];
  @Output() onCloseEvent = new EventEmitter<Detection[]>();

  constructor() {}

  ngOnInit(): void {}

  addDetection() {
    this.detections = [
      { name: '', color: '', description: '' },
      ...this.detections,
    ];
  }

  changeDetection() {
    this.onCloseEvent.emit(this.detections);
  }

  deleteDetection(index: number) {
    this.detections.splice(index, 1);
    this.changeDetection();
  }
}
