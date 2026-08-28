/**
 * The single source of truth for a person's status. Colour + filled glyph + word, always all three.
 */
export interface StatusChipProps {
  status?: 'safe' | 'missing' | 'unconfirmed' | 'injured' | 'searching';
  /** Overrides the default word. Keep it one or two words. */
  label?: string;
  size?: 'sm' | 'md';
}
export declare function StatusChip(props: StatusChipProps): JSX.Element;
