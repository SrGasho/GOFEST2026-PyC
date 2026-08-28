/** 1dp outline-variant rule. Full-bleed, inset (16 or 72dp), vertical, or labelled. */
export interface DividerProps extends React.HTMLAttributes<HTMLElement> {
  /** Left inset in px — 16 for plain lists, 72 when rows have a leading avatar. */
  inset?: number;
  vertical?: boolean;
  /** Centres a caption in the rule. */
  label?: string;
}
export declare function Divider(props: DividerProps): JSX.Element;
