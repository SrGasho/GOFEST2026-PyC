/** Single-select segmented control — 2 to 5 mutually exclusive views. */
export interface SegmentedOption { value: string; label: string }
export interface SegmentedButtonProps {
  options?: SegmentedOption[];
  value?: string;
  onChange?: (value: string) => void;
  fullWidth?: boolean;
}
export declare function SegmentedButton(props: SegmentedButtonProps): JSX.Element;
