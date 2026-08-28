/** M3 search bar — 56dp, fully rounded, sits on surface-container-high. */
export interface SearchBarProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  /** Leading Material Symbols name. */
  leading?: string;
  /** Trailing node — usually an IconButton (mic, filter, clear). */
  trailing?: React.ReactNode;
}
export declare function SearchBar(props: SearchBarProps): JSX.Element;
