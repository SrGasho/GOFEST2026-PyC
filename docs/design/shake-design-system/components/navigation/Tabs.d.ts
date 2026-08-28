/** M3 tabs. Primary = top-level content switch (short indicator); secondary = nested (full-width indicator). */
export interface TabItem { value: string; label: string; icon?: string }
export interface TabsProps {
  items?: TabItem[];
  value?: string;
  onChange?: (value: string) => void;
  variant?: 'primary' | 'secondary';
}
export declare function Tabs(props: TabsProps): JSX.Element;
