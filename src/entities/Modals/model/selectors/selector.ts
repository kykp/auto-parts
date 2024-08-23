import type { StateSchema  } from '@/app/providers';

export const getModal = (state: StateSchema) => state.modal;
export const shouldRefetch = (state: StateSchema) => state.modal.shouldRefetch;
