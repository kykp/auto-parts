
export const ModalIds: Record<keyof ModalDataById, keyof ModalDataById> = {
  siteContentDelete: 'siteContentDelete',
} as const;

export type ModalIdsType = ValueOf<typeof ModalIds>

type ValueOf<T> = T[keyof T];

export type ModalDataById = {
  siteContentDelete: {
    id: number;
    name: string;
    refetch: () => void;
  };
};
