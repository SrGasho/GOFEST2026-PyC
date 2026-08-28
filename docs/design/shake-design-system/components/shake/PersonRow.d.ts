/**
 * A person record as it appears in every registry list — avatar, name, last-seen line, status chip.
 */
export interface PersonRowProps {
  name?: string;
  status?: 'safe' | 'missing' | 'unconfirmed' | 'injured' | 'searching';
  /** Last-seen place, shown with a location glyph. */
  lastSeen?: string;
  /** Right-aligned distance, e.g. "1.2 km". */
  distance?: string;
  /** Relative time of the last update, e.g. "8 min ago". */
  updated?: string;
  divider?: boolean;
  onClick?: () => void;
}
export declare function PersonRow(props: PersonRowProps): JSX.Element;
