/**
 * Material 3 card in three variants. The default container for a person record or a status block.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'filled' | 'outlined';
  /** Raises elevation on hover and shows a pointer. */
  interactive?: boolean;
  padding?: string;
  /** Remove padding — for media or full-bleed lists. */
  flush?: boolean;
  children?: React.ReactNode;
}
export declare function Card(props: CardProps): JSX.Element;
