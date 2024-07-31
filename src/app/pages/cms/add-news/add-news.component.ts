import { Component, OnInit, SecurityContext } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { timeStamp } from 'console';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common/common.service';
import { EntitiesService } from 'src/app/services/entities/entities.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css'],
})
export class AddNewsComponent implements OnInit {
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
  client: any;
  interviewDate: any;
  paragraph2: any = '';
  paragraph1: any = '';
  paragraph3: any = '';
  notes: any;
  buttonName: any;
  // ngModel Variables //

  //Add-Edit Variables//
  imagesIDsList: any = [];
  locations: any;
  languages: any;
  savedEntityId: any;
  newsList: any = [];
  newsItems: any;
  titleInput: any;
  interviewDateInput: any;
  paragraph1TxtArea: any;
  paragraph2TxtArea: any;
  paragraph3TxtArea: any;
  languageId: any = '';
  sectorId: any;
  locationId: any = '';
  cardImageBase64: any;
  mobileImageBase64: any;
  newsId: any;
  news: any = [];
  isImageSaved: any;
  isMobileImageSaved: any;
  image: any;
  mobileImage: any;
  postMultimedias: any = [];
  files: File[] = [];
  attachmentsList: any = [];
  fullImageUrl: any;
  edittedAttachmentsList: any = [];
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
    this.newsId = this.route.snapshot.queryParams['newsId'];
    this.referenceId = this.route.snapshot.queryParams['referenceId'];
    this.GetLanguages();
    this.GetLocations();
    this.AddOrEdit();
    this.GetNewsItemsById();
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
      if (this.newsId != null) {
        this.buttonName = 'Edit';
      }
    }
  }

  GetNewsItemsById() {
    if (this.newsId != null) {
      this.GetAttachments(this.newsId);
      this.entitiesService.EntityById(this.newsId).subscribe((data) => {
        this.newsItems = data;
        this.title = this.newsItems.Title;
        this.languageId = this.newsItems.LanguageId;
        this.interviewDate = this.newsItems.CustomDate.split('T')[0];
        this.locationId = this.newsItems.Location;
        this.image = this.imageUrl + this.newsItems.Image;
        this.mobileImage = this.imageUrl + this.newsItems.MobileImage;
        this.paragraph1 = this.newsItems.Paragraph1;
        this.paragraph2 = this.newsItems.Paragraph2;
        this.paragraph3 = this.newsItems.Paragraph3;

        //this.referenceId = this.newsItems.ReferenceId;
        if (this.referenceId == null) {
          this.referenceId = this.newsItems.ReferenceId;
        }
      });
    }
  }

  GetAddNewsList(): any {
    // const { convert } = require('html-to-text');
    // const options = {
    //   wordwrap: 130,
    //   // ...
    // };
    this.GetHTMLValuesById();
    this.newsList = {
      categoryId: 5,
      Name: 'News',
      Title: this.titleInput.toString(), //this.EditorInHtmlFormat('title').toString(),
      LanguageId: this.languageId,
      CustomDate: this.interviewDateInput.toString(),
      Location: this.locationId,
      image: this.cardImageBase64,
      MobileImage: this.mobileImageBase64,
      Paragraph1: this.EditorInHtmlFormat('paragraph1').toString(), //this.paragraph1TxtArea.toString(),
      Paragraph2: this.EditorInHtmlFormat('paragraph2').toString(), //this.paragraph2TxtArea.toString(),
      Paragraph3: this.EditorInHtmlFormat('paragraph3').toString(), //this.paragraph3TxtArea.toString(),
    };
    return this.newsList;
  }

  GetEditNewsList(): any {
    this.GetHTMLValuesById();
    this.newsList = {
      EntityId: this.newsId,
      CategoryId: '5',
      Name: 'News',
      Title: this.titleInput.toString(), //this.EditorInHtmlFormat('title').toString(),
      LanguageId: this.languageId,
      CustomDate: this.interviewDateInput.toString(),
      Location: this.locationId,
      Image: this.cardImageBase64,
      MobileImage: this.mobileImageBase64,
      Paragraph1: this.EditorInHtmlFormat('paragraph1').toString(), //this.paragraph1TxtArea.toString(),
      Paragraph2: this.EditorInHtmlFormat('paragraph2').toString(), //this.paragraph2TxtArea.toString(),
      Paragraph3: this.EditorInHtmlFormat('paragraph3').toString(), //this.paragraph3TxtArea.toString(),
      ReferenceId: this.referenceId,
    };
    return this.newsList;
  }

  LanguageSelectionChange(event: any) {
    this.languageId = this.common.InputSelectionChange(event);
  }

  LocationSelectionChange(event: any) {
    this.locationId = this.common.InputSelectionChange(event);
  }

  GetHTMLValuesById() {
    this.titleInput = this.common.GetHTMLValueById('titleInput');
    // this.paragraph1TxtArea = this.common.GetHTMLValueById(
    //   'paragraph1TxtArea'
    // );
    this.interviewDateInput =
      this.common.GetHTMLValueById('interviewDateInput');
    // this.paragraph2TxtArea = this.common.GetHTMLValueById('paragraph2TxtArea');
    // this.paragraph3TxtArea =
    //   this.common.GetHTMLValueById('paragraph3TxtArea');
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

  EditNews() {
    this.EditSelectedImageList();
    this.entitiesService
      .EditEntity(this.GetEditNewsList())
      .subscribe((data: any) => {
        setTimeout(() => {
          this.savedEntityId = data;
          if (this.postMultimedias != null) {
            this.postMultimedias.forEach(
              (x1: any) => (x1.entityId = this.savedEntityId)
            );

            this.AddAttachements(this.postMultimedias);
          }
        }, 50);
      });
  }

  AddNews() {
    this.entitiesService.AddEntity(this.GetAddNewsList()).subscribe((data) => {
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

  GetAttachments(entityId: any) {
    this.entitiesService.GetAttachments(entityId).subscribe((data) => {
      this.attachmentsList = data;
      console.log('attachment list', this.attachmentsList);
      this.EditImageUrl();
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

  AddEditNews() {
    if (this.newsId != null) {
      this.EditNews();
    } else {
      this.AddNews();
    }
    this.GoToNewsListPage();
  }

  GoToNewsListPage() {
    setTimeout(() => {
      this.router.navigate(['/Dashboard/News']);
    }, 300);
  }

  onSelect(event: any) {
    this.postMultimedias = [];
    // this.files.push(...event.addedFiles);
    this.files.push(...event.addedFiles);

    if (this.newsId == null) {
      for (var i = 0; i < this.files.length; i++) {
        this.fileToBase64(this.files[i]).then((result) => {
          const base64String = result.replace('data:', '').replace(/^.+,/, ''); // To remove data url part
          this.postMultimedias.push({
            entityId: this.newsId,
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

  GetLanguages() {
    this.languages = this.common.GetLanguages();
  }

  GetLocations() {
    this.locations = this.common.GetLocations();
  }

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

  RemoveAttachment(attachmentId: any) {
    this.entitiesService
      .RemoveAttachment(attachmentId)
      .subscribe((data: any) => {});
  }

  IsNumber(value?: string | number): boolean {
    return value != null && value !== '' && !isNaN(Number(value.toString()));
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
          this.postMultimedias.push({ entityId: 0, image: base64String }); //postMultimedias is a array which holds image name and bas64String
        });
      }
    }
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
