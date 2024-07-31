import { Component, OnInit, SecurityContext } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/services/common/common.service';
import { EntitiesService } from 'src/app/services/entities/entities.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit {
  titleRenderedHtmlContent: SafeHtml = '';
  titleEditor: Editor;

  paragraph1RenderedHtmlContent: SafeHtml = '';
  paragraph1Editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    [
      'underline',
      //"strike"
    ],
    //["code", "blockquote"],
    ['ordered_list', 'bullet_list'],
    //[{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    //["link", "image"],
    //["text_color", "background_color"],
    //["align_left", "align_center", "align_right", "align_justify"]
  ];
  imageUrl = environment.imageUrl;
  // ngModel Variables //
  title: any = '';
  paragraph1: any = '';
  typeOfContract: any;
  roleOfButec: any;
  contractorForProcess: any;
  executionPeriod: any;
  financing: any;
  employer: any;
  description: any = '';
  delegatedEmployer: any;
  languageId: any = '';
  businessLineId: any = '';
  savedEntityId: any;
  year: any;
  investor: any;
  consultant: any;
  value: any;
  client: any;
  owner: any;

  // ngModel Variables //

  //Add-Edit Variables//
  locations: any;
  businessLines: any;
  languages: any;
  projectList: any = [];
  selectedBusinessLineId: any;
  titleInput: any;
  descriptionTxtArea: any;
  selectedLanguageId: any;
  sectorId: any;
  locationId: any = '';
  cardImageBase64: any;
  mobileImageBase64: any;
  projectId: any;
  projects: any = [];
  isImageSaved: any;
  isMobileImageSaved: any;
  image: any;
  mobileImage: any;
  buttonName: any;
  config: any;
  postMultimedias: any = [];
  files: File[] = [];
  attachmentsList: any = [];
  edittedAttachmentsList: any = [];
  fullImageUrl: any;
  referenceId: any;
  //Add-Edit Variables//

  constructor(
    private common: CommonService,
    public router: Router,
    public entitiesService: EntitiesService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.queryParams['projectId'];
    this.referenceId = this.route.snapshot.queryParams['referenceId'];
    this.GetLanguages();
    this.GetBusinessLines();
    this.GetLocations();
    //this.businessLineId = this.route.snapshot.queryParams['businessLineId'];
    this.AddOrEdit();
    this.GetProjectById();
    this.paragraph1Editor = new Editor();
    this.titleEditor = new Editor();
  }

  AddOrEdit() {
    if (this.referenceId != null) {
      this.buttonName = 'Translate';
    } else {
      this.buttonName = 'Add';
      if (this.projectId != null) {
        this.buttonName = 'Edit';
      }
    }
  }

  GetProjectById() {
    if (this.projectId != null) {
      this.GetAttachments(this.projectId);
      this.entitiesService.EntityById(this.projectId).subscribe((data) => {
        this.projects = data;
        console.log('projects', this.projects);
        this.businessLineId = this.projects.CategoryId;
        this.languageId = this.projects.LanguageId;
        this.image = this.imageUrl + this.projects.Image;
        this.mobileImage = this.imageUrl + this.projects.MobileImage;
        this.title = this.projects.Title;
        this.typeOfContract = this.projects.TypeofContract;
        this.roleOfButec = this.projects.RoleofBUTEC;
        this.contractorForProcess = this.projects.Contractorforprocess;
        this.executionPeriod = this.projects.ExecutionPeriod;
        this.financing = this.projects.Financing;
        this.employer = this.projects.Employer;
        this.delegatedEmployer = this.projects.DelagatedEmployer;
        this.locationId = this.projects.Location;
        this.year = this.projects.Year;
        this.investor = this.projects.Investor;
        this.consultant = this.projects.Consultant;
        this.value = this.projects.Value;
        this.client = this.projects.Client;
        this.owner = this.projects.Owner;
        this.paragraph1 = this.projects.Paragraph1;
        //this.referenceId = this.projects.ReferenceId;
        if (this.referenceId == null) {
          this.referenceId = this.projects.ReferenceId;
        }
      });
    }
  }

  GetAddProjectList(): any {
    this.GetHTMLValuesById();
    this.projectList = {
      Name: 'Projects',
      CategoryId: this.selectedBusinessLineId,
      LanguageId: this.languageId,
      Image: this.cardImageBase64,
      MobileImage: this.mobileImageBase64,
      Title: this.titleInput.toString(), // this.EditorInHtmlFormat('title').toString(),
      TypeofContract: this.typeOfContract,
      RoleofButec: this.roleOfButec,
      Contractorforprocess: this.contractorForProcess,
      ExecutionPeriod: this.executionPeriod,
      Financing: this.financing,
      Employer: this.employer,
      DelagatedEmployer: this.delegatedEmployer,
      Location: this.locationId,
      Year: this.year,
      Investor: this.investor,
      Consultant: this.consultant,
      Value: this.value,
      Client: this.client,
      Owner: this.owner,
      Paragraph1: this.EditorInHtmlFormat('paragraph1').toString(), //this.descriptionTxtArea.toString(),
    };
    return this.projectList;
  }

  GetEditProjectList(): any {
    this.GetHTMLValuesById();
    this.projectList = {
      Name: 'Projects',
      EntityId: this.projectId,
      CategoryId: this.selectedBusinessLineId,
      LanguageId: this.languageId,
      Image: this.cardImageBase64,
      MobileImage: this.mobileImageBase64,
      Title: this.titleInput.toString(), //this.EditorInHtmlFormat('title').toString(),
      TypeofContract: this.typeOfContract,
      RoleofButec: this.roleOfButec,
      Contractorforprocess: this.contractorForProcess,
      ExecutionPeriod: this.executionPeriod,
      Financing: this.financing,
      Employer: this.employer,
      DelagatedEmployer: this.delegatedEmployer,
      Location: this.locationId,
      Year: this.year,
      Investor: this.investor,
      Consultant: this.consultant,
      Value: this.value,
      Client: this.client,
      Owner: this.owner,
      Paragraph1: this.EditorInHtmlFormat('paragraph1').toString(), //this.descriptionTxtArea.toString(),
      ReferenceId: this.referenceId,
    };
    return this.projectList;
  }

  LanguageSelectionChange(event: any) {
    this.languageId = this.common.InputSelectionChange(event);
  }

  BusinessLineSelectionChange(event: any) {
    this.selectedBusinessLineId = this.common.InputSelectionChange(event);
  }

  SectorSelectionChange(event: any) {
    this.sectorId = this.common.InputSelectionChange(event);
  }

  LocationSelectionChange(event: any) {
    this.locationId = this.common.InputSelectionChange(event);
  }

  GetHTMLValuesById() {
    this.titleInput = this.common.GetHTMLValueById('titleInput');
    this.typeOfContract = this.common.GetHTMLValueById('typeOfContractInput');
    this.roleOfButec = this.common.GetHTMLValueById('roleOfButecInput');
    this.contractorForProcess = this.common.GetHTMLValueById(
      'contractorForProcessInput'
    );
    this.executionPeriod = this.common.GetHTMLValueById('executionPeriodInput');
    this.financing = this.common.GetHTMLValueById('financingInput');
    this.employer = this.common.GetHTMLValueById('employerInput');
    this.delegatedEmployer = this.common.GetHTMLValueById(
      'delegatedEmployerInput'
    );
    this.year = this.common.GetHTMLValueById('yearInput');
    this.investor = this.common.GetHTMLValueById('investorInput');
    this.consultant = this.common.GetHTMLValueById('consultantInput');
    this.value = this.common.GetHTMLValueById('valueInput');
    this.client = this.common.GetHTMLValueById('clientInput');
    this.owner = this.common.GetHTMLValueById('ownerInput');
    // this.descriptionTxtArea =
    //   this.common.GetHTMLValueById('descriptionTxtArea');
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

  OnMobileFileChange(event: any) {
    const mobileFile = event.target.files[0];
    const mobileReader = new FileReader();

    mobileReader.onloadend = () => {
      this.mobileImageBase64 = mobileReader.result as string;
      this.isMobileImageSaved = true;
    };

    if (mobileFile) {
      mobileReader.readAsDataURL(mobileFile);
    }
  }

  EditProject() {
    this.EditSelectedImageList();
    this.entitiesService
      .EditEntity(this.GetEditProjectList())
      .subscribe((data) => {
        setTimeout(() => {
          this.savedEntityId = data;
          if (this.postMultimedias != null) {
            this.postMultimedias.forEach(
              (x1: any) => (x1.entityId = this.savedEntityId)
            );
            this.AddAttachements(this.postMultimedias);
          }
        }, 300);
      });
  }

  AddProject() {
    this.entitiesService
      .AddEntity(this.GetAddProjectList())
      .subscribe((data) => {
        setTimeout(() => {
          this.savedEntityId = data;
          if (this.postMultimedias != null) {
            this.postMultimedias.forEach(
              (x1: any) => (x1.entityId = this.savedEntityId)
            );
            this.AddAttachements(this.postMultimedias);
          }
        }, 300);
      });
  }

  AddAttachements(attachmentList: any) {
    const { convert } = require('html-to-text');
    const options = {
      wordwrap: 130,
      // ...
    };
    this.entitiesService.AddAttachments(attachmentList).subscribe((data) => {
      if (data) {
        if (this.buttonName == 'Add') {
          this.toastr.success(
            'Success',
            convert(this.EditorInHtmlFormat('title'), options) +
              ' Added Successfully'
          );
        } else {
          this.toastr.success(
            'Success',
            convert(this.EditorInHtmlFormat('title'), options) +
              ' Updated Successfully'
          );
        }
      } else {
        if (this.buttonName == 'Add') {
          this.toastr.warning(
            'Warning',
            convert(this.EditorInHtmlFormat('title'), options) + ' Not Added'
          );
        } else {
          this.toastr.warning(
            'Warning',
            convert(this.EditorInHtmlFormat('title'), options) + ' Not Updated'
          );
        }
      }
    });
  }

  GetAttachments(entityId: any) {
    this.entitiesService.GetAttachments(entityId).subscribe((data) => {
      this.attachmentsList = data;
      this.EditImageUrl();
    });
  }

  AddEditProject() {
    if (this.projectId != null) {
      this.EditProject();
    } else {
      this.AddProject();
    }
    this.GoToProjectsPage();
  }

  GoToProjectsPage() {
    setTimeout(() => {
      this.router.navigate(['/Dashboard/Projects']);
    }, 300);
  }

  onSelect(event: any) {
    this.postMultimedias = [];
    // this.files.push(...event.addedFiles);
    this.files.push(...event.addedFiles);

    if (this.projectId == null) {
      for (var i = 0; i < this.files.length; i++) {
        this.fileToBase64(this.files[i]).then((result) => {
          const base64String = result.replace('data:', '').replace(/^.+,/, ''); // To remove data url part
          this.postMultimedias.push({
            entityId: 0,
            image: base64String,
          }); //postMultimedias is a array which holds image name and bas64String
        });
        // var base64 = this.OnFileChange(this.files[i]);
        // this.postMultimedias.push({ entityId: 0, image: base64 });
      }
    }
  }

  onRemove(event: any) {
    let position = this.files.indexOf(event);
    this.files.splice(position, 1);
    this.postMultimedias.splice(position, 1);
    if (this.IsNumber(+event.type)) {
      this.RemoveAttachment(event.type);
    }
  }

  fileToBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  EditImageUrl() {
    for (var i = 0; i < this.attachmentsList.length; i++) {
      this.fullImageUrl = this.imageUrl + this.attachmentsList[i].Name;
      this.ConvertImage(
        this.fullImageUrl,
        this.attachmentsList[i].AttachmentId
      );
    }
  }

  ConvertImage(fullImageUrl: any, id: any) {
    this.entitiesService.LoadImage(fullImageUrl).subscribe((i) => {
      const myFile = new File([i], fullImageUrl, {
        type: id,
      });
      this.files.push(myFile);
    });
  }

  // RemoveElement(element: any) {
  //   if (this.edittedAttachmentsList.length > 0) {
  //     this.edittedAttachmentsList.forEach((item: any, index: any) => {
  //       if (item === element) {
  //         this.edittedAttachmentsList.splice(index, 1);
  //       }
  //     });
  //   }
  //   console.log('Remove editted Attachments List', this.edittedAttachmentsList);
  // }

  RemoveAttachment(entityId: any) {
    this.entitiesService.RemoveAttachment(entityId).subscribe((data) => {});
  }

  IsNumber(value?: string | number): boolean {
    return value != null && value !== '' && !isNaN(Number(value.toString()));
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

  EdittedImagesList(imagesList: any): any {
    return imagesList.filter((x: any) => {
      if (isNaN(+x.type) == false) {
        return false; // remove if name is set and name doesn't match
      }
      return true; // keep
    });
  }

  EditSelectedImageList() {
    var myFiles = this.EdittedImagesList(this.files);
    this.postMultimedias = [];
    if (myFiles && myFiles[0]) {
      for (let i = 0; i < myFiles.length; i++) {
        this.fileToBase64(myFiles[i]).then((result) => {
          const base64String = result.replace('data:', '').replace(/^.+,/, ''); // To remove data url part
          this.postMultimedias.push({ entityId: 0, Image: base64String }); //postMultimedias is a array which holds image name and bas64String
        });
      }
    }
  }

  public sanitizeHtmlContent(htmlstring: any): SafeHtml {
    return <SafeHtml>this.sanitizer.sanitize(SecurityContext.HTML, htmlstring);
  }

  //paragraph1EditorContent

  paragraph1Form = new FormGroup({
    paragraph1EditorContent: new FormControl(
      this.paragraph1,
      Validators.required()
    ),
  });

  get paragraph1Doc(): AbstractControl {
    return <any>this.paragraph1Form.get('paragraph1EditorContent');
  }

  //titleEditorContent
  titleForm = new FormGroup({
    titleEditorContent: new FormControl(this.title, Validators.required()),
  });

  get titleDoc(): AbstractControl {
    return <any>this.titleForm.get('titleEditorContent');
  }

  EditorInHtmlFormat(textArea: any): any {
    if (textArea == 'paragraph1') {
      return (this.paragraph1RenderedHtmlContent = this.sanitizeHtmlContent(
        this.paragraph1Form.get('paragraph1EditorContent')?.value
      ));
    }

    if (textArea == 'title') {
      return (this.titleRenderedHtmlContent = this.sanitizeHtmlContent(
        this.titleForm.get('titleEditorContent')?.value
      ));
    }
    //console.log('renderedHtmlContent', this.renderedHtmlContent);
  }

  ngOnDestroy(): void {
    this.paragraph1Editor.destroy();
    this.titleEditor.destroy();
  }
}
