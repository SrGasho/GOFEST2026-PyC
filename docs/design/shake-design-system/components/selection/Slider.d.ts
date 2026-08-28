/** M3 expressive slider — 16dp track, 4dp pill handle. Used for search radius and alert sensitivity. */
export interface SliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  label?: string;
  /** Formatted current value shown at the right of the label row. */
  valueLabel?: string;
  disabled?: boolean;
}
export declare function Slider(props: SliderProps): JSX.Element;
