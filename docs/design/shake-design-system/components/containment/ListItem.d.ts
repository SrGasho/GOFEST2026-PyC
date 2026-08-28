/** One row of an M3 list: 56 / 72 / 88dp for 1, 2 or 3 lines. */
export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Avatar, icon or thumbnail. */
  leading?: React.ReactNode;
  headline?: React.ReactNode;
  supporting?: React.ReactNode;
  /** Small uppercase line above the headline. */
  overline?: React.ReactNode;
  /** Trailing node — timestamp, badge, switch. */
  trailing?: React.ReactNode;
  trailingIcon?: string;
  lines?: 1 | 2 | 3;
  selected?: boolean;
  divider?: boolean;
  onClick?: () => void;
}
export declare function ListItem(props: ListItemProps): JSX.Element;
