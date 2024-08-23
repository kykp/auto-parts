import {PriceSchema} from "@/entities/PriceList/model/types.ts";

export interface FormValues extends Omit<PriceSchema, 'id'> {
}
