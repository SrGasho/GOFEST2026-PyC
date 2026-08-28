/** Floating action button — the one screen-level action, bottom-right above the navigation bar. */
export interface FABProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  /** Supplying a label renders the extended FAB. */
  label?: string;
  size?: 'small' | 'md' | 'large';
  color?: 'primary' | 'surface' | 'secondary' | 'tertiary' | 'emergency';
  }
export declare function FAB(props: FABProps): JSX.Element;
