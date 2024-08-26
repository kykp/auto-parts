import {DeletePriceItem} from '../ui/DeletePriceItem/DeletePriceItem.tsx';
import {UploadPrice} from "../ui/UploadPrice/UploadPrice.tsx";
import {UploadPriceMutation} from '../ui/UploadPriceMutation/UploadPriceMutation.tsx';

import {ComponentType} from 'react';

// Определите тип ключей маппера
export enum ModalTypes {
  DeletePriceItem = 'deletePriceItem',
  UploadPrice = 'uploadPrice',
  UploadPriceMutation = 'uploadPriceMutation'
}

// Определите сам маппер с ключами типа ModalType
export const modalsComponentsMap: Record<ModalTypes, ComponentType> = {
  [ModalTypes.DeletePriceItem]: DeletePriceItem,
  [ModalTypes.UploadPrice]: UploadPrice,
  [ModalTypes.UploadPriceMutation]: UploadPriceMutation,
};
