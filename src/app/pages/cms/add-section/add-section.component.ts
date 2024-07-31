import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { SectionsService } from 'src/app/services/sections/sections.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.css'],
})
export class AddSectionComponent implements OnInit {
  imageUrl = environment.imageUrl;

  // ngModel Variables //
  sectionTitle: any;
  description: any;
  languageId: any = '';
  notes: any;
  // ngModel Variables //

  //Add-Edit Variables//
  sectionsList: any = [];
  sectionsTitleInput: any;
  descriptionTxtArea: any;
  cardImageBase64: any;
  sectionId: any = '';
  sections: any = [];
  sectionImage: any;
  isImageSaved: any;
  image: any;
  buttonName: any;
  referenceId: any;
  languages: any;
  //Add-Edit Variables//

  constructor(
    private common: CommonService,
    public router: Router,
    public sectionsService: SectionsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sectionId = this.route.snapshot.queryParams['sectionId'];
    this.referenceId = this.route.snapshot.queryParams['referenceId'];
    this.GetLanguages();
    this.AddOrEdit();
    console.log('section Id edit page', this.sectionId);
    //this.EditSection();
    this.GetSectionById();
  }

  AddOrEdit() {
    if (this.referenceId != null) {
      this.buttonName = 'Translate';
    } else {
      this.buttonName = 'Add';
      if (this.sectionId != null) {
        this.buttonName = 'Edit';
      }
    }
  }

  GetSectionById() {
    if (this.sectionId != null) {
      this.sectionsService.GetSectionById(this.sectionId).subscribe((data) => {
        this.sections = data;
        console.log('sections', this.sections);
        this.sectionTitle = this.sections.Title;
        this.description = this.sections.Description;
        this.languageId = this.sections.LanguageId;
        //this.image = this.imageUrl + this.sections.Image;
        console.log('image', this.image);
      });
    }
  }
  GetAddSectionsList(): any {
    this.GetHTMLValuesById();

    this.sectionsList = {
      Title: this.sectionsTitleInput.toString(),
      Description: this.descriptionTxtArea.toString(),
      LanguageId: this.languageId,
      //image: this.cardImageBase64,
    };

    console.log('sections List', this.sectionsList);
    return this.sectionsList;
  }

  GetEditSectionsList(): any {
    this.GetHTMLValuesById();

    this.sectionsList = {
      SectionId: this.sectionId,
      Title: this.sectionsTitleInput.toString(),
      Description: this.descriptionTxtArea.toString(),
      LanguageId: this.languageId,
      Image: this.cardImageBase64,
      ReferenceId: this.referenceId,
    };

    console.log('Edit Sections List', this.sectionsList);
    return this.sectionsList;
  }

  LanguageSelectionChange(event: any) {
    this.languageId = this.common.InputSelectionChange(event);
  }

  GetHTMLValuesById() {
    this.sectionsTitleInput = this.common.GetHTMLValueById('sectionTitleInput');
    this.descriptionTxtArea =
      this.common.GetHTMLValueById('descriptionTxtArea');
  }

  OnFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.cardImageBase64 = reader.result as string;
      this.isImageSaved = true;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  EditSection() {
    this.sectionsService
      .EditSection(this.GetEditSectionsList())
      .subscribe((data) => {});
  }

  AddSection() {
    this.sectionsService
      .AddSection(this.GetAddSectionsList())
      .subscribe((data) => {});
  }

  AddEditSection() {
    if (this.sectionId != null) {
      this.EditSection();
    } else {
      this.AddSection();
    }
    this.GoToSectionsPage();
  }

  GoToSectionsPage() {
    setTimeout(() => {
      this.router.navigate(['/Dashboard/Sections']);
    }, 300);
  }

  GetLanguages() {
    // this.common.loadTranslations().subscribe((languages) => {
    //   this.languages = languages;
    // });
    this.languages = this.common.GetLanguages();
  }
}
