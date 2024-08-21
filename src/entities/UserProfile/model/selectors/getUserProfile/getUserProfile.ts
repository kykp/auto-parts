import {StateSchema} from "@/app/providers/store/config/store.ts";

export const getProfile = (state: StateSchema) => state.userProfile;
