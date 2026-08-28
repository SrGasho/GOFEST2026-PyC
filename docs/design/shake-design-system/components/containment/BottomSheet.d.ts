/** Modal bottom sheet with a drag handle — the phone-first alternative to a dialog for lists of choices. */
export interface BottomSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  title?: React.ReactNode;
  /** CSS height; 'auto' hugs content, capped at 88% of the frame. */
  height?: string;
  onDismiss?: () => void;
  children?: React.ReactNode;
}
export declare function BottomSheet(props: BottomSheetProps): JSX.Element;
