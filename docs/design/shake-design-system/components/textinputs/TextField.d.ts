/**
 * M3 text field, filled or outlined, with a floating label and supporting text.
 */
export interface TextFieldProps {
  variant?: 'filled' | 'outlined';
  label?: string;
  value?: string;
  placeholder?: string;
  /** Helper line under the field. */
  supporting?: string;
  error?: boolean;
  /** Replaces supporting text when error is set. */
  errorText?: string;
  leadingIcon?: string;
  trailingIcon?: string;
  onTrailing?: () => void;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  onChange?: (value: string) => void;
}
export declare function TextField(props: TextFieldProps): JSX.Element;
