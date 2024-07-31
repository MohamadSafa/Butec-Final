import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/services/common/common.service';
import { EntitiesService } from 'src/app/services/entities/entities.service';
import { SectionEntitiesService } from 'src/app/services/section_entities/section-entities.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-expertise',
  templateUrl: './expertise.component.html',
  styleUrls: ['./expertise.component.css'],
})
export class ExpertiseComponent implements OnInit {
  expertisesBoxes: any;
  expertiseId: any;
  sectionProjectId: any;
  expertiseItems: any;
  expertiseProjects: any;
  image: any;
  mobileImage: any;
  title: any;
  categoryId: any;
  paragraph1: any;
  paragraph2: any;
  paragraph3: any;
  imageUrl = environment.imageUrl;
  languageId: any = '2';
  constructor(
    public entitiesService: EntitiesService,
    public sectionEntitiesService: SectionEntitiesService,
    private route: ActivatedRoute,
    public router: Router,
    private cdref: ChangeDetectorRef,
    public common: CommonService,
    private commonService: CommonService,
    private translate: TranslateService
  ) {
    translate.onLangChange.subscribe((lang) => {
      this.expertiseId = this.route.snapshot.queryParams['expertiseId'];
      this.sectionProjectId =
        this.route.snapshot.queryParams['sectionProjectId'];

      this.GetExpertiseBoxes(this.expertiseId);

      if (lang.lang == 'french') {
        this.languageId = '3';
        if (this.expertiseId == 7) {
          this.expertiseId = 26;
          this.sectionProjectId = 27;
        }
        if (this.expertiseId == 6) {
          this.expertiseId = 25;
          this.sectionProjectId = 30;
        }

        if (this.expertiseId == 9) {
          this.expertiseId = 28;
          this.sectionProjectId = 29;
        }
        if (this.expertiseId == 12) {
          this.expertiseId = 31;
          this.sectionProjectId = 32;
        }

        this.GetExpertiseById(this.expertiseId);
        this.GetOtherProjects(this.sectionProjectId);
      } else if (lang.lang == 'arabic') {
        this.languageId = '1';
        if (this.expertiseId == 7) {
          this.expertiseId = 45;
          this.sectionProjectId = 46;
        }
        if (this.expertiseId == 6) {
          this.expertiseId = 44;
          this.sectionProjectId = 49;
        }

        if (this.expertiseId == 9) {
          this.expertiseId = 47;
          this.sectionProjectId = 48;
        }
        if (this.expertiseId == 12) {
          this.expertiseId = 50;
          this.sectionProjectId = 51;
        }
        this.GetExpertiseById(this.expertiseId);
        this.GetOtherProjects(this.sectionProjectId);
      } else {
        this.languageId = '2';
        this.GetExpertiseById(this.expertiseId);
        this.GetOtherProjects(this.sectionProjectId);
      }
    });
  }

  ngOnInit(): void {
    // this.expertiseId = this.route.snapshot.queryParams['expertiseId'];
    // this.expertisesBoxes = this.commonService.engineeringAndContractingBoxNumbers;
    // this.sectionProjectId = this.route.snapshot.queryParams['sectionProjectId'];
    // this.GetExpertiseById(this.expertiseId);
    // this.GetOtherProjects(this.sectionProjectId);
    // this.GetExpertiseBoxes(this.expertiseId);
    this.expertiseId = this.route.snapshot.queryParams['expertiseId'];
    this.sectionProjectId = this.route.snapshot.queryParams['sectionProjectId'];

    this.GetExpertiseBoxes(this.expertiseId);

    if (this.translate.currentLang == 'french') {
      this.languageId = '3';
      if (this.expertiseId == 7) {
        this.expertiseId = 26;
        this.sectionProjectId = 27;
      }
      if (this.expertiseId == 6) {
        this.expertiseId = 25;
        this.sectionProjectId = 30;
      }

      if (this.expertiseId == 9) {
        this.expertiseId = 28;
        this.sectionProjectId = 29;
      }
      if (this.expertiseId == 12) {
        this.expertiseId = 31;
        this.sectionProjectId = 32;
      }
      this.GetExpertiseById(this.expertiseId);
      this.GetOtherProjects(this.sectionProjectId);
    } else if (this.translate.currentLang == 'arabic') {
      this.languageId = '1';
      if (this.expertiseId == 7) {
        this.expertiseId = 45;
        this.sectionProjectId = 46;
      }
      if (this.expertiseId == 6) {
        this.expertiseId = 44;
        this.sectionProjectId = 49;
      }

      if (this.expertiseId == 9) {
        this.expertiseId = 47;
        this.sectionProjectId = 48;
      }
      if (this.expertiseId == 12) {
        this.expertiseId = 50;
        this.sectionProjectId = 51;
      }
      this.GetExpertiseById(this.expertiseId);
      this.GetOtherProjects(this.sectionProjectId);
    } else {
      this.languageId = '2';
      this.GetExpertiseById(this.expertiseId);
      this.GetOtherProjects(this.sectionProjectId);
    }
  }

  GetExpertiseById(sectionId: any) {
    this.sectionEntitiesService
      .GetSectionEntityBySectionId(sectionId, this.languageId)
      .subscribe((data) => {
        this.expertiseItems = data;
        this.image = this.expertiseItems[0].Image;
        this.mobileImage = this.expertiseItems[0].MobileImage;
        this.title = this.expertiseItems[0].Title;
        this.categoryId = this.expertiseItems[0].CategoryId;
        this.paragraph1 = this.expertiseItems[0].Paragraph1;
        this.paragraph2 = this.expertiseItems[0].Paragraph2;
        this.paragraph3 = this.expertiseItems[0].Paragraph3;
      });
  }
  GetOtherProjects(sectionId: any) {
    this.sectionEntitiesService
      .GetSectionEntityBySectionId(sectionId, this.languageId)
      .subscribe((data) => {
        this.expertiseProjects = data;
      });
  }

  GoToPage(entityId: any, CategoryId: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(
        '/Project-Details?entityId=' + entityId + '&expertiseId=' + CategoryId
      );
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
    }, 50);
  }

  GetExpertiseBoxes(expertiseId: any) {
    //this.expertisesBoxes = this.common.GetExpertiseBoxes(expertiseId);
    this.common.loadExpertiseBoxes().subscribe((expertiseBoxesList) => {
      //var list = expertiseBoxesList;
      // this.expertisesBoxes = expertiseBoxesList.filter(
      //   this.CurrentExpertiseBoxes
      // ); //list.filter((box) => box.Id === expertiseId);
      this.expertisesBoxes = this.CurrentExpertiseBoxes(
        expertiseBoxesList,
        expertiseId
      );
    });
  }

  CurrentExpertiseBoxes(expertiseBoxesList: any, expertiseId: any): any {
    return expertiseBoxesList.filter((x: any) => {
      if (x.Id.toString() != expertiseId.toString()) {
        return false; // remove if name is set and name doesn't match
      }
      return true; // keep
    });
  }
}
