/** M3 top app bar: small (64dp), medium (112dp) or large (152dp). */
export interface TopAppBarProps extends React.HTMLAttributes<HTMLElement> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  variant?: 'small' | 'medium' | 'large';
  /** Material Symbols name for the leading nav action, e.g. "arrow_back" or "menu". */
  leadingIcon?: string;
  onLeading?: () => void;
  /** Trailing IconButtons. */
  actions?: React.ReactNode;
  /** Applies the raised surface tint used once content scrolls under the bar. */
  scrolled?: boolean;
}
export declare function TopAppBar(props: TopAppBarProps): JSX.Element;
