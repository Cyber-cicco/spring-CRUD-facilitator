import {Component, Input} from '@angular/core';

@Component({
  selector: 'test-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss']
})

export class TableauComponent {

  @Input() items:Map<string, string>[] = []


}
