import { ViewChild } from '@angular/core';
import { ModalService } from './../service/modal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-transfer',
  templateUrl: './new-transfer.component.html',
  styleUrls: ['./new-transfer.component.css']
})
export class NewTransferComponent {

  @ViewChild("modalNewTransfer") modalTemplateRef: ElementRef;
  newTransfer:FormGroup;
  submitted = false;
  modalInstance: NgbModalRef;
  modal: any;
  subscription: Subscription;

  constructor(
    private _modalService: NgbModal,
    private _myModalSerive: ModalService,
    private fb: FormBuilder
  ) {
    this.subscription = this._myModalSerive
      .getMyModalSubjectRef()
      .subscribe(msg => {
        switch (msg.action) {
          case "OPEN":
            this.openModal(msg.data, msg.nameModal);
            break;
          case "CLOSE":
            this.closeModal();
            break;
        }
      });
      this.newTransferValidator();
  }

  newTransferValidator(){
    this.newTransfer = this.fb.group({
      rut: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      account_number: ['', [Validators.required]],
      bankId: ['', [Validators.required]],
      ammount: ['', [Validators.required]],
      description: ['']
    })
  }

  get f() {
    return this.newTransfer.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.newTransfer.invalid) {
      return;
    }
  }

  openModal(data: any, nameModal: string) {
    this.modal = data;
    if (nameModal == "modalNewTransfer") {
      this.modalInstance = this._modalService.open(this.modalTemplateRef, { size: 'lg', backdrop: 'static' });
    }
  }

  closeModal() {
    this.modalInstance ? this.modalInstance.close() : null;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
