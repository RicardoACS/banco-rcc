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
  newDestination:FormGroup;
  submitted = false;
  modalInstance: NgbModalRef;
  modal: any;
  subscription: Subscription;

  constructor(
    private _modalService: NgbModal,
    private _myModalSerive: ModalService,
    private fb: FormBuilder, 
    private rutValidator: RutValidator,
  ) {
    this.subscription = this._myModalSerive
      .getMyModalSubjectRef()
      .subscribe(msg => {
        switch (msg.action) {
          case "OPEN":
            this.openModal(msg.data);
            break;
          case "CLOSE":
            this.closeModal();
            break;
        }
      });
      this.newDestinationValidator();
  }

  newDestinationValidator(){
    this.newDestination = this.fb.group({
      rut: ['', [Validators.required, Validators.maxLength(15), this.rutValidator]],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      account: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.maxLength(100), Validators.email]],
      bankId: ['', [Validators.required]]
    })
  }

  get f() {
    return this.newDestination.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.newDestination.invalid) {
      return;
    }
  }

  openModal(data: any) {
    console.log("Hola")
    this.modal = data;
    this.modalInstance = this._modalService.open(this.modalTemplateRef, { size: 'lg', backdrop: 'static' });
  }

  closeModal() {
    this.modalInstance ? this.modalInstance.close() : null;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

