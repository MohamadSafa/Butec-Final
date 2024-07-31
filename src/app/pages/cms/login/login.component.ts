import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  typeEmailX: any;
  typePasswordX: any;

  constructor(public router: Router, private common: CommonService) {}

  ngOnInit(): void {}

  GetHTMLValuesById() {
    this.typeEmailX = this.common.GetHTMLValueById('typeEmailX');
    this.typePasswordX = this.common.GetHTMLValueById('typePasswordX');
  }

  Login() {
    this.GetHTMLValuesById();
    if (this.typeEmailX === 'admin' && this.typePasswordX === 'admin') {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigateByUrl('/Dashboard');
      });
    }
  }
}
