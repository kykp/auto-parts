import { AreaController } from './AreaController/AreaController';
import { CheckboxController } from './CheckboxController/CheckboxController';
import { InputController } from './InputController/InputController';
import { SelectController } from './SelectController/SelectController';
import { SwitchController } from './SwitchController/SwitchController';

export const FieldController = {
  Input: InputController,
  Checkbox: CheckboxController,
  Switch: SwitchController,
  Select: SelectController,
  Area: AreaController,
};
