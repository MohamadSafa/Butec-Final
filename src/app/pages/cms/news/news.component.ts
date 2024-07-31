import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { EntitiesService } from 'src/app/services/entities/entities.service';
import { environment } from 'src/environments/environment.prod';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  news: any;
  imageUrl = environment.imageUrl;
  languages: any;
  languageId: any;
  constructor(
    private common: CommonService,
    public router: Router,
    public entitiesService: EntitiesService,
    private readonly _modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.GetLanguages();
    // this.GetNewsList(5);
  }

  GetNewsList(categoryId: any) {
    this.entitiesService
      .EntitiesByCategoryId(categoryId, this.languageId)
      .subscribe((data) => {
        this.news = data;
      });
  }

  AddNews() {
    this.router.navigateByUrl('/Dashboard/Add-News');
  }
  EditNews(newsId: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl('/Dashboard/Edit-News?newsId=' + newsId);
    });
  }
  RemoveNews(entityId: any) {
    this.GoToConfirmModal(
      'Delete Message',
      'Are you sure you want to delete??',
      entityId
    );
  }

  DeleteNews(entityId: any) {
    this.entitiesService.RemoveEntity(entityId).subscribe((data) => {
      setTimeout(() => {
        this.GetNewsList(5);
      }, 150);
    });
  }

  DuplicateEntity(entityId: any) {
    this.entitiesService
      .DuplicateEntity(entityId, this.languageId, entityId)
      .subscribe((data) => {
        setTimeout(() => {
          var duplicatedId = data;
          this.TranslateNews(duplicatedId, entityId);
        }, 150);
      });
  }

  TranslateNews(newsId: any, referenceId: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(
        '/Dashboard/Translate-News?newsId=' +
          newsId +
          '&referenceId=' +
          referenceId
      );
    });
  }

  GoToDescriptionModal(title: any, description: any) {
    this.common.DescriptionModal(title, description);
  }

  GoToConfirmModal(title: any, message: any, entityId: any) {
    this._modalService
      .show<any>(ModalConfirmComponent, {
        title: title,
        model: message,
      })
      .result()
      .subscribe((data: any) => {
        if (data == true) {
          this.DeleteNews(entityId);
        }
      });
  }

  GetLanguages() {
    this.languages = this.common.GetLanguages();
  }

  LanguageSelectionChange(event: any) {
    this.languageId = this.common.InputSelectionChange(event);
    this.GetNewsList(5);
  }
}
