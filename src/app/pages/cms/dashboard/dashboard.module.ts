import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DashboardComponent],
  imports: [BrowserModule, RouterModule, CommonModule, IonicModule.forRoot()],
})
export class DashboardModule {}
