import {UserProfileSchema} from "@/entities/UserProfile";
import {ModalSchema} from "@/entities/Modals";

export interface StateSchema {
  userProfile: UserProfileSchema;
  modal: ModalSchema;
}
