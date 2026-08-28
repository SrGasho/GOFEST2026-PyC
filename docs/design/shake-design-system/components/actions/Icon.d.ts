/** Material Symbols Rounded glyph. The only icon primitive in Shake — never inline hand-drawn SVG. */
export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Material Symbols ligature name, snake_case (e.g. "person_search", "crisis_alert"). */
  name?: string;
  /** Optical size in px: 20 dense, 24 default, 40/48 hero. */
  size?: number;
  /** Filled variant — used for the active navigation destination. */
  fill?: boolean | 0 | 1;
  weight?: 100|200|300|400|500|600|700;
  grade?: number;
  color?: string;
}
export declare function Icon(props: IconProps): JSX.Element;
