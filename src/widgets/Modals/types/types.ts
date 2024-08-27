import {DeletePriceItem} from '../ui/DeletePriceItem/DeletePriceItem.tsx';
import {UploadPrice} from "../ui/UploadPrice/UploadPrice.tsx";
import {UploadPriceMutation} from '../ui/UploadPriceMutation/UploadPriceMutation.tsx';

import {ComponentType} from 'react';
import {DeletePrice} from "@/widgets/Modals/ui/DeletePrice/DeletePrice.tsx";

// Определите тип ключей маппера
export enum ModalTypes {
  DeletePriceItem = 'deletePriceItem',
  UploadPrice = 'uploadPrice',
  UploadPriceMutation = 'uploadPriceMutation',
  DeletePrice = 'deletePrice'
}

// Определите сам маппер с ключами типа ModalType
export const modalsComponentsMap: Record<ModalTypes, ComponentType> = {
  [ModalTypes.DeletePriceItem]: DeletePriceItem,
  [ModalTypes.UploadPrice]: UploadPrice,
  [ModalTypes.UploadPriceMutation]: UploadPriceMutation,
  [ModalTypes.DeletePrice]: DeletePrice
};
