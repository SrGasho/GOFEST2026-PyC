/** Numeric or dot badge for unread counts on nav destinations and list rows. */
export interface BadgeProps {
  count?: number | string;
  /** 6dp dot with no count. */
  dot?: boolean;
  /** Counts above this render as "N+". */
  max?: number;
  color?: 'error' | 'primary' | 'tertiary';
}
export declare function Badge(props: BadgeProps): JSX.Element;
