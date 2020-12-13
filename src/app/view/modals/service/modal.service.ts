import { ModalMessageModel } from '../models/modal-message-model';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {

    subject = new BehaviorSubject<ModalMessageModel>({action: 'CLOSE'});
    constructor() { }

    // used by the component calling the modal service
    open(data: any) {
        this.subject.next({data, action: 'OPEN'});
    }

    close() {
        this.subject.next({action: 'CLOSE'});
    }

    // used by modal template to receive data
    getMyModalSubjectRef(): Observable<ModalMessageModel> {
        return this.subject.asObservable();
    }

}
