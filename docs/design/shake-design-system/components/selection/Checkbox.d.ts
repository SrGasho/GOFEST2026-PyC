/** 18dp checkbox in a 40dp target. Multi-select, or consent that needs an explicit Save. */
export interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  supporting?: string;
  /** Error state — used on the required consent checkbox. */
  error?: boolean;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
