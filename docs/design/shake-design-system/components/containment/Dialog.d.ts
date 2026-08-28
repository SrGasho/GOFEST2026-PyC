/** Basic M3 dialog — 28dp radius, scrimmed, for a decision that blocks the flow. */
export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  /** Optional hero icon; when set, headline and icon centre. */
  icon?: string;
  headline?: React.ReactNode;
  supporting?: React.ReactNode;
  /** Right-aligned text Buttons — confirm last. */
  actions?: React.ReactNode;
  onDismiss?: () => void;
  children?: React.ReactNode;
}
export declare function Dialog(props: DialogProps): JSX.Element;
