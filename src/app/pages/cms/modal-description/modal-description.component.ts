import { Component } from '@angular/core';
import { ModalReference } from '@developer-partners/ngx-modal-dialog';

@Component({
  selector: 'app-modal-description',
  templateUrl: './modal-description.component.html',
  styleUrls: ['./modal-description.component.css'],
})
export class ModalDescriptionComponent {
  description: any;
  constructor(private readonly _modalReference: ModalReference<any>) {
    const { convert } = require('html-to-text');
    const options = {
      wordwrap: 130,
      // ...
    };
    if (this._modalReference.config.model) {
      this._modalReference.config.title = convert(
        this._modalReference.config.title,
        options
      );
      let copy = this._modalReference.config.model;
      this.description = copy;
    }
  }
}
