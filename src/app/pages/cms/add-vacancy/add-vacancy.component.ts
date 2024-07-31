import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { EntitiesService } from 'src/app/services/entities/entities.service';

@Component({
  selector: 'app-add-vacancy',
  templateUrl: './add-vacancy.component.html',
  styleUrls: ['./add-vacancy.component.css'],
})
export class AddVacancyComponent implements OnInit {
  specificationsForm: FormGroup;
  responsibilitiesForm: FormGroup;
  buttonName: any;
  vacancyTitle: any;
  languageId: any;
  languages: any;
  vacancyId: any;
  businessLineId: any;
  businessLines: any;
  locationId: any;
  locations: any;
  description: any;
  referenceId: any;
  constructor(
    private common: CommonService,
    public router: Router,
    public entitiesService: EntitiesService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private fb: FormBuilder
  ) {
    this.specificationsForm = this.formBuilder.group({
      specificationsResults: this.formBuilder.array([
        this.SpecificationsResult(),
      ]),
    });

    this.responsibilitiesForm = this.formBuilder.group({
      responsibilitiesResults: this.formBuilder.array([
        this.ResponsibilitiesResult(),
      ]),
    });
  }

  ngOnInit(): void {
    this.vacancyId = this.route.snapshot.queryParams['vacancyId'];
    this.referenceId = this.route.snapshot.queryParams['referenceId'];
    this.AddOrEdit();
    this.GetLanguages();
    this.GetBusinessLines();
    this.GetLocations();
  }

  AddOrEdit() {
    if (this.referenceId != null) {
      this.buttonName = 'Translate';
    } else {
      this.buttonName = 'Add';
      if (this.vacancyId != null) {
        this.buttonName = 'Edit';
      }
    }
  }

  LanguageSelectionChange(event: any) {
    this.languageId = this.common.InputSelectionChange(event);
  }

  BusinessLineSelectionChange(event: any) {
    this.businessLineId = this.common.InputSelectionChange(event);
  }

  LocationSelectionChange(event: any) {
    this.locationId = this.common.InputSelectionChange(event);
  }

  GetLanguages() {
    this.languages = this.common.GetLanguages();
  }

  GetBusinessLines() {
    this.businessLines = this.common.GetBusinessLines();
  }

  GetLocations() {
    this.locations = this.common.GetLocations();
  }

  //Append Fields Set
  private SpecificationsResult(): FormGroup {
    return this.formBuilder.group({
      title: '',
      description: '',
    });
  }

  get SpecificationsResultsArray(): FormArray {
    return <FormArray>this.specificationsForm.get('specificationsResults');
  }

  //Add Fields
  AddSpecification(): void {
    this.SpecificationsResultsArray.push(this.SpecificationsResult());
  }

  //Remove Fields
  RemoveSpecification(index: number): void {
    this.SpecificationsResultsArray.removeAt(index);
  }

  //Append Fields Set
  private ResponsibilitiesResult(): FormGroup {
    return this.fb.group({
      title: '',
      descriptions: this.fb.array([]),
    });
  }

  ResponsibilitiesResultsArray(): FormArray {
    return this.responsibilitiesForm.get(
      'responsibilitiesResults'
    ) as FormArray;
  }

  //Add Fields
  AddResponsibility(): void {
    this.ResponsibilitiesResultsArray().push(this.ResponsibilitiesResult());
  }

  //Remove Fields
  RemoveResponsibility(index: number): void {
    this.ResponsibilitiesResultsArray().removeAt(index);
  }

  ResponsibilityDescriptions(Index: number): FormArray {
    return this.ResponsibilitiesResultsArray()
      .at(Index)
      .get('descriptions') as FormArray;
  }

  NewDescription(): FormGroup {
    return this.formBuilder.group({
      description: '',
    });
  }

  AddDescription(index: number) {
    this.ResponsibilityDescriptions(index).push(this.NewDescription());
  }

  RemoveDescription(index: number, descriptionIndex: number) {
    this.ResponsibilityDescriptions(index).removeAt(descriptionIndex);
  }

  AddVacancy() {
    console.log('specifications', this.SpecificationsResult());
  }
}
