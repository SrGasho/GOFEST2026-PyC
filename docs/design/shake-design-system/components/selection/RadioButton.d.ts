/** 20dp radio in a 40dp target — one choice from a visible set. */
export interface RadioButtonProps {
  checked?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  label?: string;
  supporting?: string;
}
export declare function RadioButton(props: RadioButtonProps): JSX.Element;
