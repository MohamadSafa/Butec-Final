import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from '../home/home.component';
import { ProjectsComponent } from '../projects/projects.component';
import { NewsComponent } from '../news/news.component';

const routes: Routes = [
  {
    path: 'Dashboard',
    component: DashboardComponent,
  },
  // {
  //   path: '',
  //   component: HomeComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
