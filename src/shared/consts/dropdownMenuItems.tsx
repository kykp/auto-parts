import { cssColors } from '@/shared/consts/cssColors';
import { lang } from '@/shared/consts/lang';
import { BlockIcon, DeleteIcon, EditIcon, InfoIcon, SettingsIcon } from '@/shared/Icon';

export const dropdownMenuItems = {
  more: {
    title: lang.btn.more, Icon: <InfoIcon width={18} height={18} />,
  },
  edit: {
    title: lang.btn.edit, Icon: <EditIcon width={18} height={18} />,
  },
  delete: {
    title: lang.btn.delete, Icon: <DeleteIcon color={cssColors.error} width={18} height={18} />,
  },
  block: {
    title: lang.btn.block, Icon: <BlockIcon color={cssColors.error} width={18} height={18} />,
  },
  settingForm: {
    title: lang.btn.settingForm, Icon: <SettingsIcon width={18} height={18} />,
  },
};
