import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  constructor(public common: CommonService) {}

  ngOnInit(): void {}

  GoToPage(pageName: any) {
    this.common.GoToPage(pageName);
  }
}
