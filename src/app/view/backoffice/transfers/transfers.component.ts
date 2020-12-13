import { ModalService } from './../../modals/service/modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.css'],
  providers: []
})
export class TransfersComponent implements OnInit {

  filter:string;
  constructor(private _ModalService: ModalService) { }

  ngOnInit(): void {
  }

  openModal(data){
    this._ModalService.open(data);
  }

}
