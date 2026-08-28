/** M3 chip, 32dp, 8dp radius. Four types: assist, filter, input, suggestion. */
export interface ChipProps {
  label?: React.ReactNode;
  type?: 'assist' | 'filter' | 'input' | 'suggestion';
  /** Material Symbols leading glyph. */
  icon?: string;
  /** Leading avatar node (input chips representing a person). */
  avatar?: React.ReactNode;
  /** Filter/input only — shows the leading check and the secondary-container fill. */
  selected?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  disabled?: boolean;
}
export declare function Chip(props: ChipProps): JSX.Element;
