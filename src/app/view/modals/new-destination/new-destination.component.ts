import { User } from './../../../class/user';
import { ToastrService } from 'ngx-toastr';
import { Bank } from './../../../class/bank';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiBankService } from './../../../services/api-bank.service';
import { RutValidator } from 'ng9-rut';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from './../service/modal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-new-destination',
  templateUrl: './new-destination.component.html',
  styleUrls: ['./new-destination.component.css']
})
export class NewDestinationComponent {
  @ViewChild("modalNewDestination") modalTemplateRef: ElementRef;
  newDestination: FormGroup;
  submitted = false;
  modalInstance: NgbModalRef;
  modal: User = undefined;
  subscription: Subscription;
  dataBanks:Bank[];
  load = {
    createDestination: false,
    bank:false
  }

  constructor(
    private _modalService: NgbModal,
    private _myModalSerive: ModalService,
    private fb: FormBuilder,
    private rutValidator: RutValidator,
    private apiBank: ApiBankService,
    private toastr: ToastrService
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
  }

  newDestinationValidator() {
    console.log(this.modal)
    this.newDestination = this.fb.group({
      rut: ['', [Validators.required, Validators.maxLength(15), this.rutValidator]],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.maxLength(100), Validators.email]],
      account_number: ['', [Validators.required, Validators.maxLength(100)]],
      account_id: [this.modal != undefined ? this.modal.account[0].account_id : null],
      bank_id: ['', [Validators.required]]
    })
  }

  getBanks() {
    this.apiBank.getBanks()
      .subscribe((data: Bank[]) => {
        this.dataBanks = data;
        this.load.bank = true;
      },
        (error: HttpErrorResponse) => {
          this.toastr.error(null, error.error.error);
        });
  }

  get f() {
    return this.newDestination.controls;
  }

  onSubmit() {
    this.load.createDestination = true;
    this.submitted = true;
    if (this.newDestination.invalid) {
      this.load.createDestination = false;
      return;
    }

    this.apiBank.createDestination(this.newDestination.value)
      .subscribe((data: HttpErrorResponse) => {
        this.toastr.success(null, "Destinatario creado con éxito");
        this.load.createDestination = false;
        this.clearForm();
      },
        (error: HttpErrorResponse) => {
          this.toastr.error(null, error.error.error);
          this.load.createDestination = false;
        });
  }

  clearForm() {
    this.newDestination.reset();
    this.submitted = false;
  }

  openModal(data: any, nameModal: string) {
    this.modal = data;
    if (nameModal == "modalNewDestination") {
      this.getBanks();
      this.newDestinationValidator();
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

