interface BaseConfigFilter {
  name: string;
  label: string;
  defaultValue: string | null;
  groupName?: string;
}

interface BaseMultipleFilter {
  label: string;
  fields: BaseConfigFilter[];
  groupName?: string;
}

export interface SelectConfigFilter extends BaseConfigFilter {
  elementType: 'select';
  options: SelectOption[];
  placeholder?: string;
}

interface InputConfigFilter extends BaseConfigFilter {
  elementType: 'input';
  placeholder?: string;
}

interface CheckBoxConfigFilter extends BaseConfigFilter {
  elementType: 'checkBox';
}

interface DateConfigFilter extends BaseMultipleFilter {
  elementType: 'date';
}

interface TimeConfigFilter extends BaseMultipleFilter {
  elementType: 'time';
}

interface SwitcherConfigFilter extends BaseConfigFilter {
  elementType: 'switcher';
}

export type ConfigFilter =
  SelectConfigFilter |
  InputConfigFilter |
  CheckBoxConfigFilter |
  DateConfigFilter |
  SwitcherConfigFilter |
  TimeConfigFilter;

export type DefaultValues = Record<string, string | number | boolean | null | SelectOption>;
