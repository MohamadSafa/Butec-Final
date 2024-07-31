import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { EntitiesService } from 'src/app/services/entities/entities.service';
import { environment } from 'src/environments/environment.prod';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { ModalService } from '@developer-partners/ngx-modal-dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  homeItems: any;
  imageUrl = environment.imageUrl;
  modalDescription: any;
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
  }

  AddHome() {
    this.router.navigateByUrl('/Dashboard/Add-Home');
  }

  GetHomeItemsList(categoryId: any) {
    this.entitiesService
      .EntitiesByCategoryId(categoryId, this.languageId)
      .subscribe((data) => {
        this.homeItems = data;
        console.log('home Items', this.homeItems);
      });
  }

  EditHomeItems(entityId: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl('/Dashboard/Edit-Home?homeId=' + entityId);
    });
  }

  RemoveHomeItems(entityId: any) {
    this.GoToConfirmModal(
      'Delete Message',
      'Are you sure you want to delete??',
      entityId
    );
  }

  DeleteHome(entityId: any) {
    this.entitiesService.RemoveEntity(entityId).subscribe((data) => {
      setTimeout(() => {
        this.GetHomeItemsList(7);
      }, 150);
    });
  }

  DuplicateHome(entityId: any) {
    this.entitiesService
      .DuplicateEntity(entityId, this.languageId, entityId)
      .subscribe((data) => {
        setTimeout(() => {
          var duplicatedId = data;
          this.TranslateHome(duplicatedId, entityId);
        }, 150);
      });
  }

  TranslateHome(homeId: any, referenceId: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(
        '/Dashboard/Edit-Home?homeId=' + homeId + '&referenceId=' + referenceId
      );
    });
  }

  DescriptionDialog(description: any) {
    this.modalDescription = description;
  }

  GoToDescriptionModal(title: any, description: any) {
    this.common.DescriptionModal(title, description);
  }

  GoToConfirmModal(title: any, message: any, entityId: any) {
    // this.common.ConfirmModal(title, message, expertiseId);
    // setTimeout(() => {
    //   this.GetExpertiseList(this.selectedExpertiseId);
    // }, 150);
    this._modalService
      .show<any>(ModalConfirmComponent, {
        title: title,
        model: message,
      })
      .result()
      .subscribe((data: any) => {
        if (data == true) {
          this.DeleteHome(entityId);
        }
      });
  }

  GetLanguages() {
    this.languages = this.common.GetLanguages();
  }

  LanguageSelectionChange(event: any) {
    this.languageId = this.common.InputSelectionChange(event);
    this.GetHomeItemsList(7);
  }
}
