/** M3 switch, 52×32dp, with the checkmark thumb icon. Toggles a setting immediately. */
export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** Show the check glyph in the thumb when on (M3 default). */
  icons?: boolean;
  /** Renders a full-width settings row with the label on the left. */
  label?: string;
}
export declare function Switch(props: SwitchProps): JSX.Element;
