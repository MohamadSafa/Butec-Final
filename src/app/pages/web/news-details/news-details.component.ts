import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { EntitiesService } from 'src/app/services/entities/entities.service';
import { SectionEntitiesService } from 'src/app/services/section_entities/section-entities.service';
import { environment } from 'src/environments/environment.prod';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css'],
})
export class NewsDetailsComponent {
  imageUrl = environment.imageUrl;
  newsList: any;
  newsId: any;
  newsTitle: any;
  subTitle: any;
  summary: any;
  description: any;
  languageId: any = '2';
  savedEntityId: any;
  attachmentsList: any = [];
  image: any;
  location: any;
  otherNews: any;
  newsDate: any;
  constructor(
    public entitiesService: EntitiesService,
    public sectionEntitiesService: SectionEntitiesService,
    public common: CommonService,
    public router: Router,
    private cdref: ChangeDetectorRef,
    private route: ActivatedRoute,
    private _location: Location,
    private translate: TranslateService,
  ) {
    translate.onLangChange.subscribe((lang) => {
      this.newsId = this.route.snapshot.queryParams['entityId'];
      if (lang.lang == 'french') {
        this.languageId = '3';
        this.EntityByreferenceId(this.languageId);
        this.GetOtherNews(41);
      } else if (lang.lang == 'arabic') {
        this.languageId = '1';
        this.EntityByreferenceId(this.languageId);
        this.GetOtherNews(60);
      } else {
        this.languageId = '2';
        //this.EntityByreferenceId(this.languageId);
        this.GetNewsById();
        this.GetOtherNews(22);
      }
    });
  }

  ngOnInit(): void {
    this.newsId = this.route.snapshot.queryParams['entityId'];
    if (this.translate.currentLang == 'french') {
      this.languageId = '3';
    } else if (this.translate.currentLang == 'arabic') {
      this.languageId = '1';
    } else {
      this.languageId = '2';
    }
    this.GetNewsById();
    this.GetOtherNews(22);
  }

  GetNewsById() {
    if (this.newsId != null) {
      this.GetAttachments(this.newsId);
      this.entitiesService.EntityById(this.newsId).subscribe((data) => {
        this.newsList = data;
        this.FillNews(this.newsList)
      });
    }
  }

  FillNews(newsList: any) {
    this.languageId = newsList.LanguageId;
    this.image = this.imageUrl + newsList.Image;
    this.newsTitle = newsList.Title;
    this.newsDate = newsList.CustomDate;
    this.location = newsList.Location;
    this.subTitle = newsList.Paragraph1;
    this.summary = newsList.Paragraph2;
    this.description = newsList.Paragraph3;
  }


  GetAttachments(entityId: any) {
    this.entitiesService.GetAttachments(entityId).subscribe((data) => {
      this.attachmentsList = data;
    });
  }

  // ngAfterContentChecked() {
    
  //   setTimeout(() => {
  //     this.common.navPosition.next('sticky');
  //   }, 10);
    
  //     this.common.changeNavColor.next('black');
  
  //   // setTimeout(() => {
  //     this.cdref.detectChanges();
  //   // }, 20);
    
  // }

  ngAfterViewInit() {
    setTimeout(() => {
      this.common.navPosition.next('sticky');
      this.common.changeNavColor.next('black');
    }, 50)
  }

  GetOtherNews(sectionId: any) {
    this.sectionEntitiesService
      .GetSectionEntityBySectionId(sectionId, this.languageId)
      .subscribe((data) => {
        this.otherNews = data;
      });
  }

  GoToNewsDetailsPage(entityId: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl('/News-Details?entityId=' + entityId);
    });
  }
  
  GoBack() {
    this._location.back();
  }

  EntityByreferenceId(languageId: any) {
    this.entitiesService
      .EntityByreferenceId(this.newsId, languageId)
      .subscribe((data) => {
        this.newsList = data;
        console.log('entity newsList', this.newsList);
        this.FillNews(this.newsList);
      });
  }
}
