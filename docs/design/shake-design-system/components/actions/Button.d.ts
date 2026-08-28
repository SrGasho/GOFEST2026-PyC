/**
 * Material 3 common button in Shake's five emphasis levels, plus a destructive variant.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Emphasis, highest to lowest: filled > tonal > elevated > outlined > text. danger for irreversible actions. */
  variant?: 'filled' | 'tonal' | 'elevated' | 'outlined' | 'text' | 'danger';
  /** xs/sm/md = 40dp; lg = 56dp, reserved for the single primary action on an emergency screen. */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Material Symbols name shown before the label. */
  icon?: string;
  trailingIcon?: string;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;
