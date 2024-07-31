import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  constructor(public common: CommonService, public router: Router) {}

  ngOnInit(): void {}
  GoToContactPage() {
    this.router.navigateByUrl('/Contact');
  }
}
