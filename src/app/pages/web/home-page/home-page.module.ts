import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomePageComponent } from './home-page.component';

@NgModule({
  declarations: [HomePageComponent],
  imports: [BrowserModule, RouterModule, IonicModule.forRoot()],
})
export class HomePageModule {}
