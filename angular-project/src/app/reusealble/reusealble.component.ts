import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-reusealble',
  templateUrl: './reusealble.component.html',
  styleUrls: ['./reusealble.component.css'],
})
export class ReusealbleComponent implements OnInit {
  constructor() {}
  @Input() item: { name: string; email: string } = { name: '', email: '' };
  ngOnInit(): void {}
}
