/** Brief confirmation at the bottom of the frame, above the navigation bar. */
export interface SnackbarProps {
  open?: boolean;
  message?: React.ReactNode;
  /** Single action label, e.g. "Undo". */
  action?: string;
  onAction?: () => void;
  onDismiss?: () => void;
}
export declare function Snackbar(props: SnackbarProps): JSX.Element;
