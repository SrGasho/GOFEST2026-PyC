/** Circular person avatar — photo, initials, or a person glyph, with an optional status ring. */
export interface AvatarProps {
  name?: string;
  /** Photo URL. Falls back to initials, then a person glyph. */
  src?: string;
  size?: number;
  /** Draws a 2dp status ring in the person-status colour. */
  status?: 'safe' | 'missing' | 'unconfirmed' | 'injured' | 'none';
  /** Material Symbols name used instead of initials. */
  icon?: string;
}
export declare function Avatar(props: AvatarProps): JSX.Element;
