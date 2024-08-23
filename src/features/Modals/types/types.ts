import {DeletePriceItem} from '../ui/DeletePriceItem/DeletePriceItem.tsx';
import {ComponentType} from 'react';

// Определите тип ключей маппера
export enum ModalTypes {
  DeletePriceItem = 'deletePriceItem',
}

// Определите сам маппер с ключами типа ModalType
export const modalsComponentsMap: Record<ModalTypes, ComponentType> = {
  [ModalTypes.DeletePriceItem]: DeletePriceItem,
};
