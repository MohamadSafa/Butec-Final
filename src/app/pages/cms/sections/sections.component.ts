import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { SectionsService } from 'src/app/services/sections/sections.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css'],
})
export class SectionsComponent implements OnInit {
  languages: any;
  languageId: any;
  sections: any;
  imageUrl = environment.imageUrl;
  image: any;
  description: any;
  // languageId: any = '2';
  constructor(
    private common: CommonService,
    public router: Router,
    public sectionsService: SectionsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.GetSections();
    this.GetLanguages();
  }

  GetSections(languageId: any) {
    this.sectionsService.GetSections(languageId).subscribe((data) => {
      this.sections = data;
      console.log('sections', this.sections);
    });
  }

  RemoveSection(sectionId: any) {
    this.sectionsService.RemoveSection(sectionId).subscribe((data) => {
      this.GetSections(this.languageId);
      console.log('sections', this.sections);
    });
  }

  AddSection() {
    this.router.navigateByUrl('/Dashboard/Add-Section');
  }

  EditSection(sectionId: any) {
    console.log('Section Id', sectionId);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(
        '/Dashboard/Edit-Section?sectionId=' + sectionId
      );
    });
  }

  AddSubSection(sectionId: any) {
    console.log('Section Id', sectionId);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(
        '/Dashboard/Sub-Section?sectionId=' + sectionId
      );
    });
  }

  DescriptionDialog(description: any) {
    this.description = description;
  }

  GoToDescriptionModal(title: any, description: any) {
    this.common.DescriptionModal(title, description);
  }

  GetLanguages() {
    this.languages = this.common.GetLanguages();
  }

  LanguageSelectionChange(event: any) {
    this.languageId = this.common.InputSelectionChange(event);
    this.GetSections(this.languageId);
  }
}
