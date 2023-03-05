import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-tag',
  templateUrl: './color-tag.component.html',
  styleUrls: ['./color-tag.component.scss'],
})
export class ColorTagComponent {
  @Input() color: string = 'red';

}
