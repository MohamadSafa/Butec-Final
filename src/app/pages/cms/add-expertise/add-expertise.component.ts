import { Component, SecurityContext } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common/common.service';
import { EntitiesService } from 'src/app/services/entities/entities.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-add-expertise',
  templateUrl: './add-expertise.component.html',
  styleUrls: ['./add-expertise.component.css'],
})
export class AddExpertiseComponent {
  titleRenderedHtmlContent: SafeHtml = '';
  titleEditor: Editor;

  paragraph1RenderedHtmlContent: SafeHtml = '';
  paragraph1Editor: Editor;

  paragraph2RenderedHtmlContent: SafeHtml = '';
  paragraph2Editor: Editor;

  paragraph3RenderedHtmlContent: SafeHtml = '';
  paragraph3Editor: Editor;

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
  selectedExpertise: any = '';
  paragraph1: any = '';
  paragraph2: any = '';
  paragraph3: any = '';
  languageId: any = '';
  // ngModel Variables //

  //Add-Edit Variables//
  expertises: any;
  languages: any;
  selectedExpertiseId: any;
  expertiseList: any = [];
  titleInput: any;
  paragraph1TxtArea: any;
  paragraph2TxtArea: any;
  paragraph3TxtArea: any;
  locationId: any;
  cardImageBase64: any;
  mobileImageBase64: any;
  expertiseId: any;
  expertise: any = [];
  isImageSaved: any;
  isMobileImageSaved: any;
  image: any;
  mobileImage: any;
  buttonName: any;
  config: any;
  postMultimedias: any = [];
  files: File[] = [];
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
    this.expertiseId = this.route.snapshot.queryParams['expertiseId'];
    this.referenceId = this.route.snapshot.queryParams['referenceId'];
    console.log('expertise Reference Id', this.referenceId);
    this.GetLanguages();
    this.GetExpertises();
    //this.businessLineId = this.route.snapshot.queryParams['businessLineId'];
    this.AddOrEdit();
    this.GetExpertiseById();
    this.titleEditor = new Editor();
    this.paragraph1Editor = new Editor();
    this.paragraph2Editor = new Editor();
    this.paragraph3Editor = new Editor();
  }

  AddOrEdit() {
    if (this.referenceId != null) {
      this.buttonName = 'Translate';
    } else {
      this.buttonName = 'Add';
      if (this.expertiseId != null) {
        this.buttonName = 'Edit';
      }
    }
  }

  GetExpertiseById() {
    if (this.expertiseId != null) {
      this.entitiesService.EntityById(this.expertiseId).subscribe((data) => {
        this.expertise = data;
        this.selectedExpertise = this.expertise.CategoryId;
        this.languageId = this.expertise.LanguageId;
        this.image = this.imageUrl + this.expertise.Image;
        this.mobileImage = this.imageUrl + this.expertise.MobileImage;
        this.title = this.expertise.Title;
        this.paragraph1 = this.expertise.Paragraph1;
        this.paragraph2 = this.expertise.Paragraph2;
        this.paragraph3 = this.expertise.Paragraph3;
        if (this.referenceId == null) {
          this.referenceId = this.expertise.ReferenceId;
        }
      });
    }
  }

  GetAddExpertiseList(): any {
    const { convert } = require('html-to-text');
    const options = {
      wordwrap: 130,
      // ...
    };
    // this.GetHTMLValuesById();
    this.expertiseList = {
      CategoryId: this.selectedExpertise,
      Name: convert(this.EditorInHtmlFormat('title'), options), //this.titleInput.toString(),
      LanguageId: this.languageId,
      Image: this.cardImageBase64,
      MobileImage: this.mobileImageBase64,
      // ReferenceId: this.referenceId,
      Title: this.EditorInHtmlFormat('title').toString().trim(), //this.titleInput.toString(),
      Paragraph1: this.EditorInHtmlFormat('paragraph1').toString().trim(), //this.paragraph1TxtArea.toString(),
      Paragraph2: this.EditorInHtmlFormat('paragraph2').toString().trim(), //this.paragraph2TxtArea.toString(),
      Paragraph3: this.EditorInHtmlFormat('paragraph3').toString().trim(), //this.paragraph3TxtArea.toString(),
    };
    console.log('expertise List', this.expertiseList);
    return this.expertiseList;
  }

  GetEditExpertiseList(): any {
    const { convert } = require('html-to-text');
    const options = {
      wordwrap: 130,
      // ...
    };
    // this.GetHTMLValuesById();
    this.expertiseList = {
      CategoryId: this.selectedExpertise,
      Name: convert(this.EditorInHtmlFormat('title'), options),
      EntityId: this.expertiseId,
      LanguageId: this.languageId,
      Image: this.cardImageBase64,
      MobileImage: this.mobileImageBase64,
      ReferenceId: this.referenceId,
      Title: this.EditorInHtmlFormat('title').toString(), //this.titleInput.toString(),
      Paragraph1: this.EditorInHtmlFormat('paragraph1').toString().trim(), //this.paragraph1TxtArea.toString(),
      Paragraph2: this.EditorInHtmlFormat('paragraph2').toString().trim(), //this.paragraph2TxtArea.toString(),
      Paragraph3: this.EditorInHtmlFormat('paragraph3').toString().trim(), //this.paragraph3TxtArea.toString(),
    };
    console.log('Edit Expertise List', this.expertiseList);
    return this.expertiseList;
  }

  LanguageSelectionChange(event: any) {
    console.log('event', event);
    this.languageId = this.common.InputSelectionChange(event);
    console.log('Language Id', this.languageId);
  }

  ExpertiseSelectionChange(event: any) {
    this.selectedExpertise = this.common.InputSelectionChangeByText(event);
  }

  GetHTMLValuesById() {
    this.titleInput = this.common.GetHTMLValueById('titleInput');
    this.paragraph1TxtArea = this.common.GetHTMLValueById('paragraph1TxtArea');
    this.paragraph2TxtArea = this.common.GetHTMLValueById('paragraph2TxtArea');
    this.paragraph3TxtArea = this.common.GetHTMLValueById('paragraph3TxtArea');
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

  EditExpertise() {
    const { convert } = require('html-to-text');
    const options = {
      wordwrap: 130,
      // ...
    };
    this.entitiesService
      .EditEntity(this.GetEditExpertiseList())
      .subscribe((data) => {
        if (data > 0) {
          this.toastr.success(
            'Success',
            convert(this.EditorInHtmlFormat('title'), options) +
              ' Updated Successfully'
          );
        } else {
          this.toastr.warning(
            'Warning',
            convert(this.EditorInHtmlFormat('title'), options) + ' Not Updated'
          );
        }
      });
  }

  AddExpertise() {
    const { convert } = require('html-to-text');
    const options = {
      wordwrap: 130,
      // ...
    };
    this.entitiesService
      .AddEntity(this.GetAddExpertiseList())
      .subscribe((data) => {
        if (data > 0) {
          this.toastr.success(
            'Success',
            convert(this.EditorInHtmlFormat('title'), options) +
              ' Added Successfully'
          );
        } else {
          this.toastr.warning(
            'Warning',
            convert(this.EditorInHtmlFormat('title'), options) + ' Not Added'
          );
        }
      });
  }

  AddEditExpertise() {
    if (this.expertiseId != null) {
      this.EditExpertise();
    } else {
      this.AddExpertise();
    }
    // setTimeout(() => {
    this.GoToExpertisePage();

    // }, 150);
  }

  GoToExpertisePage() {
    setTimeout(() => {
      this.router.navigate(['/Dashboard/Expertises']);
    }, 300);
  }

  onSelect(event: any) {
    console.log(event);
    this.postMultimedias = [];
    // this.files.push(...event.addedFiles);
    this.files.push(...event.addedFiles);
    console.log('Files', this.files);
    if (this.files && this.files[0]) {
      for (let i = 0; i < this.files.length; i++) {
        this.fileToBase64(this.files[i]).then((result) => {
          const base64String = result.replace('data:', '').replace(/^.+,/, ''); // To remove data url part
          this.postMultimedias.push(base64String); //postMultimedias is a array which holds image name and bas64String
        });
      }
    }
    // console.log('post to multimedia', this.postMultimedias);
    // for (var i = 0; i < this.files.length; i++) {
    //   var base64 = this.OnFileChange(this.files[i]);
    //   this.postMultimedias.push(base64);
    // }
  }

  onRemove(event: any) {
    console.log(event);
    let position = this.files.indexOf(event);
    this.files.splice(position, 1);
    this.postMultimedias.splice(position, 1);
  }

  fileToBase64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  GetLanguages() {
    this.languages = this.common.GetLanguages();
  }

  GetExpertises() {
    this.expertises = this.common.GetExpertises();
  }

  public sanitizeHtmlContent(htmlstring: any): SafeHtml {
    return <SafeHtml>this.sanitizer.sanitize(SecurityContext.HTML, htmlstring);
  }

  //titleEditorContent

  titleForm = new FormGroup({
    titleEditorContent: new FormControl(this.title, Validators.required()),
  });

  get titleDoc(): AbstractControl {
    return <any>this.titleForm.get('titleEditorContent');
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

  //paragraph2EditorContent

  paragraph2Form = new FormGroup({
    paragraph2EditorContent: new FormControl(
      this.paragraph2,
      Validators.required()
    ),
  });

  get paragraph2Doc(): AbstractControl {
    return <any>this.paragraph2Form.get('paragraph2EditorContent');
  }

  //paragraph3EditorContent

  paragraph3Form = new FormGroup({
    paragraph3EditorContent: new FormControl(
      this.paragraph3,
      Validators.required()
    ),
  });

  get paragraph3Doc(): AbstractControl {
    return <any>this.paragraph3Form.get('paragraph3EditorContent');
  }

  EditorInHtmlFormat(textArea: any): any {
    if (textArea == 'title') {
      return (this.titleRenderedHtmlContent = this.sanitizeHtmlContent(
        this.titleForm.get('titleEditorContent')?.value
      ));
    }
    if (textArea == 'paragraph1') {
      return (this.paragraph1RenderedHtmlContent = this.sanitizeHtmlContent(
        this.paragraph1Form.get('paragraph1EditorContent')?.value
      ));
    }
    if (textArea == 'paragraph2') {
      return (this.paragraph2RenderedHtmlContent = this.sanitizeHtmlContent(
        this.paragraph2Form.get('paragraph2EditorContent')?.value
      ));
    }
    if (textArea == 'paragraph3') {
      return (this.paragraph3RenderedHtmlContent = this.sanitizeHtmlContent(
        this.paragraph3Form.get('paragraph3EditorContent')?.value
      ));
    }

    //console.log('renderedHtmlContent', this.renderedHtmlContent);
  }

  ngOnDestroy(): void {
    this.titleEditor.destroy();
    this.paragraph1Editor.destroy();
    this.paragraph2Editor.destroy();
    this.paragraph3Editor.destroy();
  }
}
