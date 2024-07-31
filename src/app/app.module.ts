import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';
// import { FontAwesomeModule } from '~@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/cms/home/home.component';
import { ProjectsComponent } from './pages/cms/projects/projects.component';
import { NewsComponent } from './pages/cms/news/news.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './pages/cms/login/login.component';
import { DashboardComponent } from './pages/cms/dashboard/dashboard.component';
import { AddProjectComponent } from './pages/cms/add-project/add-project.component';
import { VacanciesComponent } from './pages/cms/vacancies/vacancies.component';
import { AddVacancyComponent } from './pages/cms/add-vacancy/add-vacancy.component';
import { AddNewsComponent } from './pages/cms/add-news/add-news.component';
import { AddSectionComponent } from './pages/cms/add-section/add-section.component';
import { SectionsComponent } from './pages/cms/sections/sections.component';
import { LoadingComponent } from './services/loading/loading.component';
import { ScrollToTopService } from './scroll-to-top.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { SubSectionComponent } from './pages/cms/sub-section/sub-section.component';
import { AddSubSectionComponent } from './pages/cms/add-sub-section/add-sub-section.component';
import { HomePageComponent } from './pages/web/home-page/home-page.component';
import { AddHomeComponent } from './pages/cms/add-home/add-home.component';
// import { DropzoneModule } from 'ngx-dropzone-wrapper';
// import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
// import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AddExpertiseComponent } from './pages/cms/add-expertise/add-expertise.component';
import { ExpertiseComponent } from './pages/web/expertise/expertise.component';
import { ButecAcademyComponent } from './pages/web/butec-academy/butec-academy.component';
import { ButecLifeComponent } from './pages/web/butec-life/butec-life.component';
import { NewsDetailsComponent } from './pages/web/news-details/news-details.component';
import { ListNewsComponent } from './pages/web/list-news/list-news.component';
import { ContactComponent } from './pages/web/contact/contact.component';
import { ExpertisesComponent } from './pages/cms/expertises/expertises.component';
import { HeaderComponent } from './pages/web/common/header/header.component';
import { FooterComponent } from './pages/web/common/footer/footer.component';
import { PositionsComponent } from './pages/web/positions/positions.component';
import { PositionDetailsComponent } from './pages/web/position-details/position-details.component';
import { PolicyComponent } from './pages/web/policy/policy.component';
import { ChatComponent } from './pages/web/chat/chat.component';
import { ProjectDetailsComponent } from './pages/web/project-details/project-details.component';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { LoadingInterceptor } from './loading.interceptor';
import { ListProjectsComponent } from './pages/web/list-projects/list-projects.component';
import { ApplyComponent } from './pages/web/apply/apply.component';
import { WhyChooseUsComponent } from './pages/web/why-choose-us/why-choose-us.component';
import { AnimatedNumberComponent } from './services/count-up/animated-number.component';
import { CountUpService } from './services/count-up/count-up.service';
import { ModalConfirmComponent } from './pages/cms/modal-confirm/modal-confirm.component';
import { ModalModule } from '@developer-partners/ngx-modal-dialog';
import { NgxEditorModule } from 'ngx-editor';
//import { NgSelect2Module } from 'ng-select2';
import { Select2Module } from 'ng-select2-component';
// import { ConfirmationDialogComponent } from './services/toastr/confirmation-dialog.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { StoryComponent } from './pages/web/story/story.component';
import { LeadershipComponent } from './pages/web/leadership/leadership.component';

export function HttpLoaderFactory(HttpClient: HttpClient){
  return new TranslateHttpLoader(HttpClient); 
}

@NgModule({
  declarations: [
    AppComponent,
    // ConfirmationDialogComponent,
    VacanciesComponent,
    AddVacancyComponent,
    AddNewsComponent,
    AddSectionComponent,
    SectionsComponent,
    LoadingComponent,
    AddProjectComponent,
    NewsComponent,
    ProjectsComponent,
    VacanciesComponent,
    SubSectionComponent,
    AddSubSectionComponent,
    HomePageComponent,
    HomeComponent,
    AddHomeComponent,
    AddExpertiseComponent,
    ExpertisesComponent,
    ExpertiseComponent,
    ButecAcademyComponent,
    ButecLifeComponent,
    ListNewsComponent,
    NewsDetailsComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    PositionsComponent,
    PositionDetailsComponent,
    PolicyComponent,
    ProjectDetailsComponent,
    ListProjectsComponent,
    ListNewsComponent,
    NewsDetailsComponent,
    ChatComponent,
    AnimatedNumberComponent,
    ApplyComponent,
    WhyChooseUsComponent,
    ModalConfirmComponent,
    StoryComponent,
    LeadershipComponent
  ],
  imports: [
    
    // ToastrModule.forRoot(),
    // FontAwesomeModule,
    RouterModule,
    AppRoutingModule,
    BrowserModule,
    CarouselModule,
    IonicModule.forRoot(),
    HttpClientModule,
    FormsModule,
    CommonModule,
    NgxDropzoneModule,
    ModalModule,

    ReactiveFormsModule,

    ToastrModule.forRoot({

      timeOut: 2000,

      positionClass: 'toast-top-right',

    }),
    BrowserAnimationsModule,
    NgxEditorModule,
    //NgSelect2Module
    Select2Module, 
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),

    // DropzoneModule

  ],
  providers: [
    // {
    //   provide: DROPZONE_CONFIG,
    //   useValue: DEFAULT_DROPZONE_CONFIG
    // }
    { provide : CountUpService },
    { provide : ScrollToTopService },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi:true}
  ],
  bootstrap: [AppComponent, ChatComponent],
})
export class AppModule {}
