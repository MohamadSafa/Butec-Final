import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/services/common/common.service';
import { EntitiesService } from 'src/app/services/entities/entities.service';
import { SectionEntitiesService } from 'src/app/services/section_entities/section-entities.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css'],
})
export class ListNewsComponent {
  max: any = 8;
  newsList: any;
  newsListLength: any;
  imageUrl = environment.imageUrl;
  languageId: any = '2';
  constructor(
    public entitiesService: EntitiesService,
    public sectionEntitiesService: SectionEntitiesService,
    public common: CommonService,
    public router: Router,
    private cdref: ChangeDetectorRef,
    private translate: TranslateService
  ) {
    translate.onLangChange.subscribe((lang) => {
      if (lang.lang == 'french') {
        this.languageId = '3';
      } else if (lang.lang == 'arabic') {
        this.languageId = '1';
      } else {
        this.languageId = '2';
      }
      this.GetNewsList(5);
    });
  }


  ngOnInit(): void {
    if (this.translate.currentLang == 'french') {
      this.languageId = '3';
    } else if (this.translate.currentLang == 'arabic') {
      this.languageId = '1';
    } else {
      this.languageId = '2';
    }
    this.GetNewsList(5);

  }

  GetNewsList(categoryId: any) {
    this.entitiesService.EntitiesByCategoryId(categoryId, this.languageId).subscribe((data) => {
      this.newsList = data;
      this.newsListLength = this.newsList.length;
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

  GoToNewsDetails(entityId: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl('/News-Details?entityId=' + entityId);
    });
  }

  toggle(): void {
    if(this.newsListLength != this.max)
      {
        this.max = this.max + 8;
      } else {
        this.max = 8;
      }
    
  }
}
