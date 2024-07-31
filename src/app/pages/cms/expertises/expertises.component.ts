import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { CommonService } from 'src/app/services/common/common.service';
import { EntitiesService } from 'src/app/services/entities/entities.service';
import { environment } from 'src/environments/environment.prod';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-expertises',
  templateUrl: './expertises.component.html',
  styleUrls: ['./expertises.component.css'],
})
export class ExpertisesComponent {
  Id: any;
  expertise: any;
  expertises: any;
  selectedExpertiseId: any = 0;
  imageUrl = environment.imageUrl;
  modalDescription: any;
  modalTitle: any;
  languages: any;
  languageId: any = 0;
  constructor(
    private common: CommonService,
    public router: Router,
    public entitiesService: EntitiesService,
    private readonly _modalService: ModalService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.GetLanguages();
    this.GetExpertises();
  }

  ExpertiseSelectionChange(event: any) {
    this.selectedExpertiseId = this.common.InputSelectionChange(event);
    if (this.languageId != 0) {
      this.GetExpertiseList(this.selectedExpertiseId);
    }
  }

  GetExpertiseList(categoryId: any) {
    this.entitiesService
      .EntitiesByCategoryId(categoryId, this.languageId)
      .subscribe((data) => {
        this.expertise = data;
        console.log('expertise', this.expertise);
      });
  }

  AddExpertise() {
    this.router.navigateByUrl('/Dashboard/Add-Expertise');
  }

  EditExpertise(expertiseId: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(
        '/Dashboard/Edit-Expertise?expertiseId=' + expertiseId
      );
    });
  }

  TranslateExpertise(expertiseId: any, referenceId: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(
        '/Dashboard/Edit-Expertise?expertiseId=' +
          expertiseId +
          '&referenceId=' +
          referenceId
      );
    });
  }

  // RemoveExpertise(expertiseId: any) {
  //   this.entitiesService.RemoveEntity(expertiseId).subscribe((data) => {});
  //   this.GetExpertiseList(this.selectedExpertiseId);
  // }

  RemoveExpertise(expertiseId: any) {
    this.GoToConfirmModal(
      'Delete Message',
      'Are you sure you want to delete??',
      expertiseId
    );
  }

  DescriptionDialog(title: any, description: any) {
    this.modalTitle = title;
    this.modalDescription = description;
  }

  GoToDescriptionModal(title: any, description: any) {
    this.common.DescriptionModal(title, description);
  }

  DuplicateEntity(entityId: any) {
    this.entitiesService
      .DuplicateEntity(entityId, this.languageId, entityId)
      .subscribe((data) => {
        setTimeout(() => {
          var duplicatedId = data;
          this.TranslateExpertise(duplicatedId, entityId);
        }, 150);
      });
  }

  GoToConfirmModal(title: any, message: any, expertiseId: any) {
    this._modalService
      .show<any>(ModalConfirmComponent, {
        title: title,
        model: message,
      })
      .result()
      .subscribe((data: any) => {
        if (data == true) {
          this.entitiesService.RemoveEntity(expertiseId).subscribe((data) => {
            setTimeout(() => {
              this.GetExpertiseList(this.selectedExpertiseId);
            }, 150);
          });
        }
      });
  }

  GetExpertises() {
    this.expertises = this.common.GetExpertises();
  }

  GetLanguages() {
    this.languages = this.common.GetLanguages();
  }

  LanguageSelectionChange(event: any) {
    this.languageId = this.common.InputSelectionChange(event);
    if (this.selectedExpertiseId != 0) {
      this.GetExpertiseList(this.selectedExpertiseId);
    }
  }
}
