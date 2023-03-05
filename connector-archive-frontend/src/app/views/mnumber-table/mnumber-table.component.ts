import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Mnumber } from 'src/app/models/mnumber.model';

@Component({
  selector: 'app-mnumber-table',
  templateUrl: './mnumber-table.component.html'
})
export class MnumberTableComponent {

  newMnumber: boolean = false;
  @Input() mnumbers: Mnumber[] = [];
  @Output() onCloseEvent = new EventEmitter<Mnumber[]>();

  constructor() {}

  ngOnInit(): void {}

  addMnumber() {
    this.mnumbers = [
      { mnumber: '...', description: '...' },
      ...this.mnumbers,
    ];
  }

  changeMnumber() {
    this.onCloseEvent.emit(this.mnumbers);
  }

  deleteMnumber(index: number) {
    this.mnumbers.splice(index, 1);
    this.changeMnumber();
  }
}
