import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';
import { EntitiesService } from 'src/app/services/entities/entities.service';
import { SectionEntitiesService } from 'src/app/services/section_entities/section-entities.service';
import { environment } from 'src/environments/environment.prod';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  homeItems: any;
  selectedProjects: any;
  image: any;
  title: any;
  subTitle: any;
  paragraph1: any;
  increment: any = 1;
  decrement: any = 0;
  imageUrl = environment.imageUrl;

  projectTitle: any;
  projectLocation: any;
  projectImage: any;
  languageId: any = '2';
  transitioning: boolean = false;

  constructor(
    public entitiesService: EntitiesService,
    public sectionEntitiesService: SectionEntitiesService,
    public common: CommonService,
    private cdref: ChangeDetectorRef,
    public translate: TranslateService
  ) {
    translate.onLangChange.subscribe((lang) => {
      if (lang.lang == 'french') {
        this.languageId = '3';
        this.GetSubSectionEntityById(23);
        this.GetSelectedHomeProjects(24);
      } else if (lang.lang == 'arabic') {
        this.languageId = '1';
        this.GetSubSectionEntityById(42);
        this.GetSelectedHomeProjects(43);
      } else {
        this.languageId = '2';
        this.GetSubSectionEntityById(4);
        this.GetSelectedHomeProjects(5);
      }
    });
  }

  ngOnInit(): void {
    if (this.translate.currentLang == 'french') {
      this.languageId = '3';
      this.GetSubSectionEntityById(23);
      this.GetSelectedHomeProjects(24);
    } else if (this.translate.currentLang == 'arabic') {
      this.languageId = '1';
      this.GetSubSectionEntityById(42);
      this.GetSelectedHomeProjects(43);
    } else {
      this.languageId = '2';
      this.GetSubSectionEntityById(4);
      this.GetSelectedHomeProjects(5);
    }
    this.autoSlide();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.common.navPosition.next('absolute');
      this.common.changeNavColor.next('');
    }, 50);
  }

  GetSubSectionEntityById(sectionId: any) {
    this.sectionEntitiesService
      .GetSectionEntityBySectionId(sectionId, this.languageId)
      .subscribe((data) => {
        this.homeItems = data;
        this.image = this.homeItems[0].Image;
        this.title = this.homeItems[0].Title;
        this.subTitle = this.homeItems[0].SubTitle;
        this.paragraph1 = this.homeItems[0].Paragraph1;
      });
  }

  GetSelectedHomeProjects(sectionId: any) {
    this.sectionEntitiesService
      .GetSectionEntityBySectionId(sectionId, this.languageId)
      .subscribe((data) => {
        this.selectedProjects = data;
        this.decrement = this.selectedProjects.length - 1;
        this.FirstSelectedProject();
      });
  }

  FirstSelectedProject() {
    if (this.selectedProjects[0] != null) {
      this.projectTitle = this.selectedProjects[0].Title;
      this.projectLocation = this.selectedProjects[0].Location;
      this.projectImage = this.imageUrl + this.selectedProjects[0].Image;
    }
  }

  GoForward(increment: any) {
    if (this.transitioning) return;
    this.transitioning = true;
    setTimeout(() => {
      for (let i = 1; i <= this.selectedProjects.length; i++) {
        if (increment == i && increment < this.selectedProjects.length) {
          this.projectTitle = this.selectedProjects[i].Title;
          this.projectLocation = this.selectedProjects[i].Location;
          this.projectImage = this.imageUrl + this.selectedProjects[i].Image;
          this.increment = increment + 1;
        }
        if (increment == this.selectedProjects.length) {
          this.projectTitle = this.selectedProjects[0].Title;
          this.projectLocation = this.selectedProjects[0].Location;
          this.projectImage = this.imageUrl + this.selectedProjects[0].Image;
          this.increment = 1;
        }
        this.decrement = this.increment;
      }
      this.transitioning = false;
    }, 500);
  }

  GoBackword(decrement: any) {
    if (this.transitioning) return;
    this.transitioning = true;
    setTimeout(() => {
      for (let i = this.selectedProjects.length - 1; i > 0; i--) {
        if (decrement == i && decrement > 0) {
          this.projectTitle = this.selectedProjects[i].Title;
          this.projectLocation = this.selectedProjects[i].Location;
          this.projectImage = this.imageUrl + this.selectedProjects[i].Image;
          this.decrement = decrement - 1;
        }
        if (decrement == 1) {
          this.projectTitle = this.selectedProjects[0].Title;
          this.projectLocation = this.selectedProjects[0].Location;
          this.projectImage = this.imageUrl + this.selectedProjects[0].Image;
          this.decrement = this.selectedProjects.length - 1;
          this.increment = this.decrement + 1;
        }
        this.increment = this.decrement;
      }
      this.transitioning = false;
    }, 500);
  }

  autoSlide() {
    setInterval(() => {
      this.GoForward(this.increment);
    }, 3000);
  }

  GoToPage(pageName: any) {
    this.common.GoToPage(pageName);
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 500,
    autoplayHoverPause: true,
    autoplaySpeed: 100,
    dotsSpeed: 300,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 300,
    navText: [],
    responsive: {
      0: {
        items: 1
      },
      134: {
        items: 2
      },
      268: {
        items: 3
      },
      402: {
        items: 4
      },
      536: {
        items: 5
      },
      670: {
        items: 6
      },
      804: {
        items: 7
      },
      940: {
        items: 8
      }
    },
    nav: true
  }
}
