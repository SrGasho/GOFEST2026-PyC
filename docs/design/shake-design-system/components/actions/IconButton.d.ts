/** 40dp circular icon-only control for app bars, list rows and toggles. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  /** Required for a11y. */
  label?: string;
  variant?: 'standard' | 'filled' | 'tonal' | 'outlined';
  /** Toggle state — fills the glyph and tints the container. */
  selected?: boolean;
  size?: number;
  disabled?: boolean;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
