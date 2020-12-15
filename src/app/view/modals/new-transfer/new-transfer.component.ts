import { User } from './../../../class/user';
import { Bank } from './../../../class/bank';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiBankService } from './../../../services/api-bank.service';
import { ViewChild } from '@angular/core';
import { ModalService } from './../service/modal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { Component } from '@angular/core';

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
  dataBanks:Bank[];
  subscription: Subscription;
  user: User;

  constructor(
    private _modalService: NgbModal,
    private _myModalSerive: ModalService,
    private fb: FormBuilder,
    private apiBank: ApiBankService
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
      this.getBanks();
      this.user = JSON.parse(localStorage.getItem("user"));
  }

  newTransferValidator(){
    this.newTransfer = this.fb.group({
      rut: [this.modal.rut],
      name: [this.modal.name, [Validators.required]],
      email: [this.modal.email, [Validators.required, Validators.email]],
      account_number: [this.modal.account_number, [Validators.required]],
      bankId: [this.modal.bank.bank_id, [Validators.required]],
      ammount: ['', [Validators.required, Validators.min(0)]],
      description: [''],
      transaction_type_id: [1],
      destination_id: [this.modal.destination_id],
      account_id: [this.modal.account_id],
      name_origen: [this.user.name]
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
    
    //falta validacion del precio

    this.apiBank.createTransferThirdParties(this.newTransfer.value)
      .subscribe((data: any) => {
        console.log(data)
      },
        (error: HttpErrorResponse) => {
          console.log(error);
        });



  }

  getBanks() {
    this.apiBank.getBanks()
      .subscribe((data: Bank[]) => {
        this.dataBanks = data;
      },
        (error: HttpErrorResponse) => {
          console.log(error);
        });
  }

  openModal(data: any, nameModal: string) {
    this.modal = data;
    console.log("modal", this.modal)
    if (nameModal == "modalNewTransfer") {
      this.newTransferValidator();
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
