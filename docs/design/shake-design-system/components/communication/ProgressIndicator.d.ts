/** Linear or circular progress. Omit value for indeterminate. */
export interface ProgressIndicatorProps {
  variant?: 'linear' | 'circular';
  /** 0–100. Leave undefined for the indeterminate animation. */
  value?: number;
  /** Circular diameter in px. */
  size?: number;
  thickness?: number;
}
export declare function ProgressIndicator(props: ProgressIndicatorProps): JSX.Element;
