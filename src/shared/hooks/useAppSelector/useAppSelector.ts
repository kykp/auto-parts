// src/app/hooks.ts
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import {RootState} from "@/app/providers/store/config/store.ts";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
