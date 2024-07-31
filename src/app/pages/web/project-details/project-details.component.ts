import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { EntitiesService } from 'src/app/services/entities/entities.service';
import { SectionEntitiesService } from 'src/app/services/section_entities/section-entities.service';
import { environment } from 'src/environments/environment.prod';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent {
  modalImageUrl: any;
  imageUrl = environment.imageUrl;
  expertiseId: any;
  project: any;
  projectId: any;
  projectTitle: any;
  typeOfContract: any;
  roleOfButec: any;
  contractorForProcess: any;
  executionPeriod: any;
  financing: any;
  employer: any;
  description: any;
  delegatedEmployer: any;
  year: any;
  investor: any;
  consultant: any;
  value: any;
  owner: any;
  client: any;
  languageId: any = '2';
  businessLineId: any;
  savedEntityId: any;
  attachmentsList: any = [];
  image: any;
  location: any;
  otherProjects: any;
  constructor(
    public entitiesService: EntitiesService,
    public sectionEntitiesService: SectionEntitiesService,
    public common: CommonService,
    private route: ActivatedRoute,
    public router: Router,
    private cdref: ChangeDetectorRef,
    private _location: Location,
    private translate: TranslateService
  ) {
    translate.onLangChange.subscribe((lang) => {
      this.projectId = this.route.snapshot.queryParams['entityId'];
      this.expertiseId = this.route.snapshot.queryParams['expertiseId'];
      if (lang.lang == 'french') {
        this.languageId = '3';
        this.EntityByreferenceId(this.languageId);
        this.OtherProjectsList();
      } else if (lang.lang == 'arabic') {
        this.languageId = '1';
        this.EntityByreferenceId(this.languageId);
        this.OtherProjectsList();
      } else {
        this.languageId = '2';
        //this.EntityByreferenceId(this.languageId);
        this.GetProjectById();
        this.OtherProjectsList();
      }
    });
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.queryParams['entityId'];
    this.expertiseId = this.route.snapshot.queryParams['expertiseId'];

    if (this.translate.currentLang == 'french') {
      this.languageId = '3';
      this.GetProjectById();
      this.OtherProjectsList();
    } else if (this.translate.currentLang == 'arabic') {
      this.languageId = '1';
      this.GetProjectById();
      this.OtherProjectsList();
    } else {
      this.languageId = '2';
      this.GetProjectById();
      this.OtherProjectsList();
    }
  }

  GetProjectById() {
    if (this.projectId != null) {
      this.GetAttachments(this.projectId);
      this.entitiesService.EntityById(this.projectId).subscribe((data) => {
        this.project = data;
        console.log('project', this.project);
        this.FillProject(this.project);
      });
    }
  }

  FillProject(project: any) {
    this.businessLineId = project.CategoryId;
    //this.languageId = this.project.LanguageId;
    this.image = this.imageUrl + project.Image;
    this.projectTitle = project.Title;
    this.typeOfContract = project.TypeofContract;
    this.roleOfButec = project.RoleofBUTEC;
    this.contractorForProcess = project.Contractorforprocess;
    this.executionPeriod = project.ExecutionPeriod;
    this.financing = project.Financing;
    this.employer = project.Employer;
    this.delegatedEmployer = project.DelagatedEmployer;
    this.location = project.Location;
    this.year = project.Year;
    this.investor = project.Investor;
    this.consultant = project.Consultant;
    this.value = project.Value;
    this.owner = project.Owner;
    this.client = project.Client;
    this.description = project.Paragraph1;
  }

  GetAttachments(entityId: any) {
    this.entitiesService.GetAttachments(entityId).subscribe((data) => {
      this.attachmentsList = data;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.common.navPosition.next('sticky');
      this.common.changeNavColor.next('black');
    }, 50)
  }

  // ngAfterContentChecked() {
  //   setTimeout(() => {
  //     this.common.navPosition.next('sticky');
  //   }, 10);

  //   this.common.changeNavColor.next('black');

  //   // setTimeout(() => {
  //   this.cdref.detectChanges();
  //   // }, 20);
  // }

  GetOtherProjects(expertiseId: any) {
    // this.sectionEntitiesService
    //   .GetSectionEntityBySectionId(sectionId, this.languageId)
    //   .subscribe((data) => {
    //     this.otherProjects = data;
    //   });
    this.entitiesService
      .EntitiesExceptionByCategoryId(expertiseId, this.languageId)
      .subscribe((data) => {
        this.otherProjects = data;
      });
  }

  OtherProjectsList() {
    // if (this.expertiseId == 1) {
    //   this.GetOtherProjects(18);
    // }
    // if (this.expertiseId == 2) {
    //   this.GetOtherProjects(19);
    // }
    // if (this.expertiseId == 3) {
    //   this.GetOtherProjects(20);
    // }
    // if (this.expertiseId == 4) {
    //   this.GetOtherProjects(21);
    // }
    this.GetOtherProjects(this.expertiseId);
  }

  GoToProjectDetails(entityId: any, expertiseId: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(
        '/Project-Details?entityId=' + entityId + '&expertiseId=' + expertiseId
      );
    });
  }

  GoBack() {
    this._location.back();
  }

  OpenImage(imageName: any) {
    this.modalImageUrl = this.imageUrl + imageName;
  }

  EntityByreferenceId(languageId: any) {
    this.entitiesService
      .EntityByreferenceId(this.projectId, languageId)
      .subscribe((data) => {
        this.project = data;
        console.log('entity Projects', this.project);
        this.FillProject(this.project);
      });
  }
}
