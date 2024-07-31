import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { EntitiesService } from 'src/app/services/entities/entities.service';
import { SectionEntitiesService } from 'src/app/services/section_entities/section-entities.service';
import { SectionsService } from 'src/app/services/sections/sections.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-sub-section',
  templateUrl: './sub-section.component.html',
  styleUrls: ['./sub-section.component.css'],
})
export class SubSectionComponent implements OnInit {
  // ngModel Variables //
  sectionTitle: any = '';
  description: any;
  notes: any;
  dialogDescription: any;
  // ngModel Variables //

  //Add-Edit Variables//
  section: any;
  sections: any;
  sectionsList: any = [];
  sectionsTitleInput: any;
  descriptionTxtArea: any;
  languageId: any = 0;
  languages: any;
  cardImageBase64: any;
  sectionId: any;
  subSections: any = [];
  entityId: any = 0;
  entities: any = [];
  sectionLanguage: any = '';
  //Add-Edit Variables//

  imageUrl = environment.imageUrl;

  constructor(
    private common: CommonService,
    public router: Router,
    public sectionsService: SectionsService,
    public sectionEntitiesService: SectionEntitiesService,
    public entitiesService: EntitiesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.GetLanguages();
    this.sectionId = this.route.snapshot.queryParams['sectionId'];
    this.GetSectionById();
    //this.EditSection();
    this.GetSectionslist();
    //this.GetEntityList(1);
  }

  GetEntityList(categoryId: any) {
    this.entitiesService
      .EntitiesByCategoryId(categoryId, this.languageId)
      .subscribe((data) => {
        this.entities = data;
      });
  }

  GetSubSectionEntityById() {
    if (this.sectionId != null) {
      this.sectionEntitiesService
        .GetSectionEntityBySectionId(this.sectionId, this.languageId)
        .subscribe((data) => {
          this.subSections = data;
          console.log('New Sub Section', this.subSections);
          // this.sectionTitle = this.subSections.Title;
          // this.description = this.subSections.Description;
        });
    }
  }

  AddSectionEntity(entityId: any) {
    this.sectionEntitiesService
      .AddSectionEntity(this.sectionId, entityId)
      .subscribe((data) => {
        this.GetSubSectionEntityById();
        this.GetEntityList(this.entityId);
        // this.subSections = data;
        // console.log('subsection Add', this.subSections);
      });
  }

  RemoveSectionEntity(sectionEntityId: any) {
    this.sectionEntitiesService
      .RemoveSectionEntity(sectionEntityId)
      .subscribe((data) => {
        this.GetSubSectionEntityById();
        this.GetEntityList(this.entityId);
      });
  }
  GetSectionsList(): any {
    this.GetHTMLValuesById();

    this.sectionsList = {
      Title: this.sectionsTitleInput.toString(),
      Description: this.descriptionTxtArea.toString(),
      LanguageId: this.languageId,
      image: this.cardImageBase64,
    };
    return this.sectionsList;
  }

  EditSectionsList(): any {
    this.GetHTMLValuesById();

    this.sectionsList = {
      SectionId: this.sectionId,
      Title: this.sectionsTitleInput.toString(),
      Description: this.descriptionTxtArea.toString(),
      LanguageId: this.languageId,
      image: this.cardImageBase64,
    };
    return this.sectionsList;
  }

  // LanguageSelectionChange(event: any) {
  //   this.languageId = this.common.InputSelectionChange(event);
  // }

  GetHTMLValuesById() {
    this.sectionsTitleInput =
      this.common.GetHTMLValueById('sectionsTitleInput');
    // this.descriptionTxtArea =
    //   this.common.GetHTMLValueById('descriptionTxtArea');
  }

  OnFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.cardImageBase64 = reader.result as string;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  EditSubSection(entityId: any, categoryId: any) {
    if (
      categoryId == 1 ||
      categoryId == 2 ||
      categoryId == 3 ||
      categoryId == 4
    ) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigateByUrl(
          '/Dashboard/Edit-Project?projectId=' +
            entityId +
            '&BusinessLineId=' +
            categoryId
        );
      });
    } else if (categoryId == 5) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigateByUrl('/Dashboard/Edit-News');
      });
    } else if (categoryId == 6) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigateByUrl('/Dashboard/Edit-Vacancy');
      });
    } else if (categoryId == 7) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigateByUrl('/Dashboard/Edit-Home?homeId=' + entityId);
      });
    } else if (categoryId == 8) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigateByUrl(
          '/Dashboard/Edit-Expertise?expertiseId=' + entityId
        );
      });
    } else if (categoryId == 9) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigateByUrl(
          '/Dashboard/Edit-Expertise?expertiseId=' + entityId
        );
      });
    } else if (categoryId == 10) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigateByUrl(
          '/Dashboard/Edit-Expertise?expertiseId=' + entityId
        );
      });
    } else {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigateByUrl(
          '/Dashboard/Edit-Expertise?expertiseId=' + entityId
        );
      });
    }
  }

  EntitySelectionChange(event: any) {
    this.entityId = this.common.InputSelectionChange(event);
    if (this.languageId != 0) {
      this.GetEntityList(this.entityId);
    }
  }

  DescriptionDialog(description: any) {
    this.dialogDescription = description;
  }

  GoToDescriptionModal(title: any, description: any) {
    this.common.DescriptionModal(title, description);
  }

  GetSectionslist() {
    this.sections = this.common.GetSectionslist();
  }

  // EditSection() {
  //   if (this.sectionId != null) {
  //     this.sectionEntitiesService
  //       .EditSection(this.EditSectionsList())
  //       .subscribe((data) => {
  //         this.sections = data;
  //         this.sectionTitle = this.sections.Title;
  //         this.description = this.sections.Description;
  //       });
  //     setTimeout(() => {
  //       this.router.navigate(['/Dashboard/Sections']);
  //     }, 300);
  //   }
  // }
  // AddSubSection() {
  //   this.sectionEntitiesService(this.GetSectionsList()).subscribe((data) => {});
  //   setTimeout(() => {
  //     this.router.navigate(['/Dashboard/Sections']);
  //   }, 300);
  // }
  GetLanguages() {
    this.languages = this.common.GetLanguages();
  }

  LanguageSelectionChange(event: any) {
    this.languageId = this.common.InputSelectionChange(event);
    this.GetSubSectionEntityById();
    if (this.entityId != 0) {
      this.GetEntityList(this.entityId);
    }
  }

  GetSectionById() {
    if (this.sectionId != null) {
      this.sectionsService.GetSectionById(this.sectionId).subscribe((data) => {
        this.section = data;
        console.log('section', this.section);
        this.sectionLanguage = this.GetLanguagelLabel(this.section.LanguageId);
        this.sectionTitle = this.section.Title;
      });
    }
  }

  GetLanguagelLabel(languageId: any): any {
    if (languageId == 1) {
      return 'Arabic';
    }
    if (languageId == 2) {
      return 'English';
    }
    if (languageId == 3) {
      return 'French';
    }
  }
}
