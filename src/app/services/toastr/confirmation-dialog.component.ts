// import { Component, EventEmitter, Output } from '@angular/core';

// @Component({
//   selector: 'app-confirmation-dialog',
//   template: `
//     <div class="modal">
//       <div class="modal-content">
//         <span class="close" (click)="onCancel()">&times;</span>
//         <p>Are you sure you want to delete this project?</p>
//         <button (click)="onConfirm()">Yes</button>
//         <button (click)="onCancel()">No</button>
//       </div>
//     </div>
//   `,
//   styles: [`
//     .modal {
//       display: block;
//       position: fixed;
//       z-index: 1;
//       left: 0;
//       top: 0;
//       width: 100%;
//       height: 100%;
//       overflow: auto;
//       background-color: rgb(0,0,0);
//       background-color: rgba(0,0,0,0.4);
//     }
//     .modal-content {
//       background-color: #fefefe;
//       margin: 15% auto;
//       padding: 20px;
//       border: 1px solid #888;
//       width: 80%;
//     }
//     .close {
//       color: #aaa;
//       float: right;
//       font-size: 28px;
//       font-weight: bold;
//     }
//     .close:hover,
//     .close:focus {
//       color: black;
//       text-decoration: none;
//       cursor: pointer;
//     }
//   `]
// })
// export class ConfirmationDialogComponent {
//   @Output() confirm = new EventEmitter<void>();
//   @Output() cancel = new EventEmitter<void>();

//   onConfirm() {
//     this.confirm.emit();
//   }

//   onCancel() {
//     this.cancel.emit();
//   }
// }
