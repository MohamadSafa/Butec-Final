import { Component, ViewChild } from '@angular/core';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css'],
})
export class ModalConfirmComponent {
  title: any;
  message: any;
  constructor(public readonly _modalReference1: ModalReference<any>) {
    if (this._modalReference1.config.model) {
      this.title = this._modalReference1.config.title;
      let copy = this._modalReference1.config.model;
      this.message = copy;
      console.log('message1111', this.message);
    }
  }

  Delete() {
    this._modalReference1.closeSuccess(true);
  }

  CloseDialog() {
    // var confirmModal = <any>document.getElementById('confirmModal');
    this._modalReference1.cancel();
  }
}
