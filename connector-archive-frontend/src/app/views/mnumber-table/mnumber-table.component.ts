import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Connector } from 'src/app/models/connector.model';
import { Mnumber } from 'src/app/models/mnumber.model';

@Component({
  selector: 'app-mnumber-table',
  templateUrl: './mnumber-table.component.html',
})
export class MnumberTableComponent {
  newMnumber: boolean = false;
  @Input() connector: Connector = {};
  @Output() onChange = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  addMnumber() {
    this.connector.mnumbers = [
      { mnumber: '', description: '' },
      ...(this.connector?.mnumbers ?? []),
    ];
  }

  verifyAddedMnumber() {
    for (const mnumber of this.connector?.mnumbers ?? []) {
      if (!mnumber.mnumber || !mnumber.description) {
        return false;
      }
    }
    return true;
  }

  changeMnumber() {
    if (this.verifyAddedMnumber()) {
      this.onChange.emit(this.connector?.mnumbers);
    }
  }

  deleteMnumber(index: number) {
    this.connector?.mnumbers?.splice(index, 1);
    this.changeMnumber();
  }
}
