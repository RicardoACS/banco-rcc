import { ModalDataModel } from './modal-data-model';
export interface ModalMessageModel {
    action: string;
    nameModal?: string;
    data?: ModalDataModel;
}
