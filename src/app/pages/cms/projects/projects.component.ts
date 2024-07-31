import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { CommonService } from 'src/app/services/common/common.service';
import { EntitiesService } from 'src/app/services/entities/entities.service';
import { environment } from 'src/environments/environment.prod';
import { ModalConfirmComponent } from '../modal-confirm/modal-confirm.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  businessLines: any;
  businessLineId: any = 0;
  projects: any;
  imageUrl = environment.imageUrl;
  modalDescription: any;
  modalTitle: any;
  languages: any;
  languageId: any = 0;
  constructor(
    private common: CommonService,
    public router: Router,
    public entitiesService: EntitiesService,
    private readonly _modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.GetLanguages();
    this.GetBusinessLines();
  }

  BusinessLineSelectionChange(event: any) {
    this.businessLineId = this.common.InputSelectionChange(event);
    if (this.languageId != 0) {
      this.GetProjectsList(this.businessLineId);
    }
  }

  GetProjectsList(categoryId: any) {
    this.entitiesService
      .EntitiesByCategoryId(categoryId, this.languageId)
      .subscribe((data) => {
        this.projects = data;
        console.log('projects', this.projects);
      });
  }

  AddProject() {
    this.router.navigateByUrl('/Dashboard/Add-Project');
  }

  EditProject(projectId: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(
        '/Dashboard/Edit-Project?projectId=' +
          projectId +
          '&BusinessLineId=' +
          this.businessLineId
      );
    });
  }
  RemoveProject(entityId: any) {
    this.GoToConfirmModal(
      'Delete Message',
      'Are you sure you want to delete??',
      entityId
    );
  }

  DeleteProject(entityId: any) {
    this.entitiesService.RemoveEntity(entityId).subscribe((data) => {
      setTimeout(() => {
        this.GetProjectsList(this.businessLineId);
      }, 150);
    });
  }

  DuplicateEntity(entityId: any) {
    this.entitiesService
      .DuplicateEntity(entityId, this.languageId, entityId)
      .subscribe((data) => {
        setTimeout(() => {
          var duplicatedId = data;
          this.TranslateProject(duplicatedId, entityId);
        }, 150);
      });
  }

  TranslateProject(projectId: any, referenceId: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(
        '/Dashboard/Translate-Project?projectId=' +
          projectId +
          '&referenceId=' +
          referenceId
      );
    });
  }

  DescriptionDialog(title: any, description: any) {
    this.modalTitle = title;
    this.modalDescription = description;
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
          this.DeleteProject(entityId);
        }
      });
  }

  GetBusinessLines() {
    this.businessLines = this.common.GetBusinessLines();
    console.log('businessLines', this.businessLines);
  }

  GetLanguages() {
    this.languages = this.common.GetLanguages();
  }

  LanguageSelectionChange(event: any) {
    this.languageId = this.common.InputSelectionChange(event);
    if (this.businessLineId != 0) {
      this.GetProjectsList(this.businessLineId);
    }
  }
}
