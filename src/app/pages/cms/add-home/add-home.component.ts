import { Component, OnDestroy, OnInit, SecurityContext } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { EntitiesService } from 'src/app/services/entities/entities.service';
import { environment } from 'src/environments/environment.prod';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-home',
  templateUrl: './add-home.component.html',
  styleUrls: ['./add-home.component.css'],
})
export class AddHomeComponent implements OnInit, OnDestroy {
  paragraph1RenderedHtmlContent: SafeHtml = '';
  paragraph1Editor: Editor;

  titleRenderedHtmlContent: SafeHtml = '';
  titleEditor: Editor;

  subtitleRenderedHtmlContent: SafeHtml = '';
  subtitleEditor: Editor;

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
  subTitle: any = '';
  description: any = '';
  languageId: any = '';
  notes: any;
  paragraph1: any = '';
  // ngModel Variables //

  //Add-Edit Variables//
  languages: any;
  homeList: any = [];
  titleInput: any;
  subTitleInput: any;
  descriptionTxtArea: any;
  cardImageBase64: any;
  mobileImageBase64: any;
  homeId: any;
  homeItems: any = [];
  homeImage: any;
  isImageSaved: any;
  isMobileImageSaved: any;
  image: any;
  mobileImage: any;
  buttonName: any;
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
    this.homeId = this.route.snapshot.queryParams['homeId'];
    this.referenceId = this.route.snapshot.queryParams['referenceId'];
    console.log('home referenceId', this.referenceId);
    this.GetLanguages();
    this.AddOrEdit();
    //this.EditSection();
    this.GetHomeItemsById();
    this.paragraph1Editor = new Editor();
    this.titleEditor = new Editor();
    this.subtitleEditor = new Editor();
  }

  AddOrEdit() {
    if (this.referenceId != null) {
      this.buttonName = 'Translate';
    } else {
      this.buttonName = 'Add';
      if (this.homeId != null) {
        this.buttonName = 'Edit';
      }
    }
  }

  GetHomeItemsById() {
    if (this.homeId != null) {
      this.entitiesService.EntityById(this.homeId).subscribe((data) => {
        this.homeItems = data;
        console.log('home Items', this.homeItems);
        this.title = this.homeItems.Title;
        this.subTitle = this.homeItems.SubTitle;
        this.paragraph1 = this.homeItems.Paragraph1;
        this.languageId = this.homeItems.LanguageId;
        this.image = this.imageUrl + this.homeItems.Image;
        this.mobileImage = this.imageUrl + this.homeItems.MobileImage;
        if (this.referenceId == null) {
          this.referenceId = this.homeItems.ReferenceId;
        }
      });
    }
  }
  GetAddHomeList(): any {
    // this.GetHTMLValuesById();

    this.homeList = {
      CategoryId: 7,
      Name: 'Home Image',
      Title: this.EditorInHtmlFormat('title').toString(), //this.titleInput.toString(),
      SubTitle: this.EditorInHtmlFormat('subtitle').toString(), //this.subTitleInput.toString(),
      Paragraph1: this.EditorInHtmlFormat('paragraph1').toString(), //this.descriptionTxtArea.toString(),
      LanguageId: this.languageId,
      Image: this.cardImageBase64,
      MobileImage: this.mobileImageBase64,
      ReferenceId: this.referenceId,
    };

    console.log('Home Items List', this.homeList);
    return this.homeList;
  }

  GetEditHomeList(): any {
    // this.GetHTMLValuesById();

    this.homeList = {
      CategoryId: 7,
      Name: 'Home Image',
      EntityId: this.homeId,
      Title: this.EditorInHtmlFormat('title').toString(), //this.titleInput.toString(),
      SubTitle: this.EditorInHtmlFormat('subtitle').toString(), //this.subTitleInput.toString(),
      Paragraph1: this.EditorInHtmlFormat('paragraph1').toString(), //this.descriptionTxtArea.toString(),
      LanguageId: this.languageId,
      Image: this.cardImageBase64,
      MobileImage: this.mobileImageBase64,
      ReferenceId: this.referenceId,
    };

    console.log('Edit Home List', this.homeList);
    return this.homeList;
  }

  LanguageSelectionChange(event: any) {
    this.languageId = this.common.InputSelectionChange(event);
  }

  GetHTMLValuesById() {
    this.titleInput = this.common.GetHTMLValueById('titleInput');
    this.subTitleInput = this.common.GetHTMLValueById('homeSubTitleInput');
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

  EditHome() {
    const { convert } = require('html-to-text');
    const options = {
      wordwrap: 130,
      // ...
    };
    this.entitiesService
      .EditEntity(this.GetEditHomeList())
      .subscribe((data: any) => {
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

  AddHome() {
    const { convert } = require('html-to-text');
    const options = {
      wordwrap: 130,
      // ...
    };
    this.entitiesService
      .AddEntity(this.GetAddHomeList())
      .subscribe((data: any) => {
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

  AddEditHome() {
    if (this.homeId != null) {
      this.EditHome();
    } else {
      this.AddHome();
    }
    this.GoToHomePage();
  }

  GoToHomePage() {
    setTimeout(() => {
      this.router.navigate(['/Dashboard/Home']);
    }, 300);
  }

  GetLanguages() {
    // this.common.loadTranslations().subscribe((languages) => {
    //   this.languages = languages;
    // });
    this.languages = this.common.GetLanguages();
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

  //subtitleEditorContent
  subtitleForm = new FormGroup({
    subtitleEditorContent: new FormControl(
      this.subTitle,
      Validators.required()
    ),
  });

  get subtitleDoc(): AbstractControl {
    return <any>this.subtitleForm.get('subtitleEditorContent');
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

    if (textArea == 'subtitle') {
      return (this.subtitleRenderedHtmlContent = this.sanitizeHtmlContent(
        this.subtitleForm.get('subtitleEditorContent')?.value
      ));
    }
  }

  ngOnDestroy(): void {
    this.paragraph1Editor.destroy();
    this.titleEditor.destroy();
    this.subtitleEditor.destroy();
  }
}
