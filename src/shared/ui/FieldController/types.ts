import { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';

export interface ControlledProps<FormValues extends FieldValues>  {
  control: Control<FormValues>;
  name: Path<FormValues>
}

export interface Rules {
  rules?: RegisterOptions
}
