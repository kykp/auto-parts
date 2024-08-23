// src/features/Modals/modalsComponentsMap.ts
import {DeletePriceItem} from '../ui/DeletePriceItem/DeletePriceItem.tsx';
import {ComponentType, ReactNode} from 'react';

// Определите тип ключей маппера
export enum ModalTypes {
  DeletePriceItem = 'deletePriceItem',
}

// Определите сам маппер с ключами типа ModalType
export const modalsComponentsMap: Record<ModalTypes, ComponentType<ReactNode>> = {
  'deletePriceItem': DeletePriceItem,
};
