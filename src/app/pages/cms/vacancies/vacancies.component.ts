import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.css'],
})
export class VacanciesComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  AddVacancy() {
    this.router.navigateByUrl('/Dashboard/Add-Vacancy');
  }
}
