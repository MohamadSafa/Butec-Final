import { ConditionalExpr } from '@angular/compiler';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Select2Group, Select2Option, Select2Value } from 'ng-select2-component';
import { CommonService } from 'src/app/services/common/common.service';
import { EntitiesService } from 'src/app/services/entities/entities.service';
import { SectionEntitiesService } from 'src/app/services/section_entities/section-entities.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css'],
})
export class ListProjectsComponent {
  max: any = 10;
  expertiseId: any;
  projects: any;
  example:any;
  projectsListLength: any;
  // businessLines: any;
  imageUrl = environment.imageUrl;
    //Select2 data
    businessLines: Select2Data;
    //Select2 initial value
    value: Select2Value = '0';
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
      (async () => {
        await this.GetRandomProjects();
      })();
    });
  }


  ngOnInit(): void {
    this.GetBusinessLines();
    if (this.translate.currentLang == 'french') {
      this.languageId = '3';
    } else if (this.translate.currentLang == 'arabic') {
      this.languageId = '1';
    } else {
      this.languageId = '2';
    }
    // if (this.route.snapshot.queryParams['entityId'] == null) {
    //   this.entityId = 0;
    //   (async () => {
    //     await this.GetRandomProjects();
    //   })();
    // } else {
    //   this.entityId = this.route.snapshot.queryParams['entityId'];
    //   this.GetProjectsList(this.entityId);
    // }
    (async () => {
      await this.GetRandomProjects();
    })();
    // this.GetRandomProjects();

  }

  GoToProjectDetailsPage(entityId: any, categoryId: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(
        '/Project-Details?entityId=' + entityId + '&expertiseId=' + categoryId
      );
    });
  }

  // ngAfterContentChecked() {
    
  //   setTimeout(() => {
  //     this.common.navPosition.next('sticky');
  //     this.common.changeNavColor.next('black');
  //   }, 20);
    
  
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

  GetBusinessLines() {
    this.businessLines = this.common.GetBusinessLines2();
  }

  ExpertiseSelectionChange(event: any) {
    this.expertiseId = this.common.InputSelection2Change(event);
    
    if (this.expertiseId == 0) {
      //this.GetRandomProjects();
        this.example = this.projects;
    } else {
      //this.GetProjectsList(this.expertiseId);
      // this.projects.filter((x:any) => {
      //   return x.find((y:any) => y.CategoryId === this.expertiseId);
      // });
      this.example = this.projects.filter((x:any) => {
        if (this.expertiseId && this.expertiseId != x.CategoryId) {
          return false; // remove if name is set and name doesn't match
        }
      
        return true; // keep
      });
    }
    
  }

  GetProjectsList(categoryId: any) {
    this.entitiesService.EntitiesByCategoryId(categoryId, this.languageId).subscribe((data) => {
      this.projects = data;
      this.example = data;
      this.projectsListLength = this.projects.length;
    });
  }

  toggle(): void {
    if(this.max < this.projectsListLength){
      this.max = this.max + 10;
    } else {
        this.max = 10;
    }
  }

  // GetRandomProjects() {
  //   this.entitiesService
  //     .RandomEntitiesByCategoryIds([2, 3, 1, 4])
  //     .subscribe((data) => {
        
  //       this.projects = data;
  //       this.example = data;
  //       console.log('Test', this.example);
  //       this.projectsListLength = this.example.length;
  //     });
  // }

  async GetRandomProjects(): Promise<void> {
    await this.entitiesService
      .RandomEntitiesByCategoryIds(this.languageId, [2, 3, 1, 4])
      .subscribe((data) => {
        this.projects = data;
        this.example = data;
        this.projectsListLength = this.example.length;
      });
  }
}
export type Select2Data = (Select2Group | Select2Option)[];
