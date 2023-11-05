import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() message: string | undefined;
  @Input() type: 'error' | 'warning' | 'information' | undefined;
  constructor() { }

  ngOnInit(): void {
  }

  public getMsgClass(): string {
    switch (this.type){
      case 'error': return 'alert-danger';
      case 'warning': return 'alert-warning';
      case 'information': return 'alert-info';
      default: return '';
    }
  }

}
