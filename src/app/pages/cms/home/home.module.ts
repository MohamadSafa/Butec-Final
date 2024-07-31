import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [BrowserModule, RouterModule, IonicModule.forRoot()],
})
export class HomeModule {}
