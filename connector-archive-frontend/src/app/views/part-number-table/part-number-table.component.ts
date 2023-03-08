import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Connector } from 'src/app/models/connector.model';

@Component({
  selector: 'app-part-number-table',
  templateUrl: './part-number-table.component.html',
})
export class PartNumberTableComponent {
  newCustomerPartNumber: boolean = false;
  @Input() connector: Connector = {};
  @Output() onChange = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  addCustomerPartNumber() {
    this.connector.customerPartNumbers = [
      { customerName: '', customerPartNumber: '', description: '' },
      ...(this.connector?.customerPartNumbers ?? []),
    ];
  }

  verifyAddedCustomerPartNumber() {
    for (const customerPartNumber of this.connector?.customerPartNumbers ??
      []) {
      if (
        !customerPartNumber.customerName ||
        !customerPartNumber.customerPartNumber
      ) {
        return false;
      }
    }
    return true;
  }

  changeCustomerPartNumber() {
    if (this.verifyAddedCustomerPartNumber()) {
      this.onChange.emit(this.connector?.customerPartNumbers);
    }
  }

  deleteCustomerPartNumber(index: number) {
    this.connector?.customerPartNumbers?.splice(index, 1);
    this.changeCustomerPartNumber();
  }
}
