/**
 * Bottom navigation for 3–5 top-level destinations. 80dp tall, pill indicator behind the active icon.
 * @startingPoint section="Navigation" subtitle="Bottom navigation bar with pill indicator" viewport="412x120"
 */
export interface NavItem { value: string; label: string; icon: string; badge?: string | number }
export interface NavigationBarProps {
  items?: NavItem[];
  value?: string;
  onChange?: (value: string) => void;
}
export declare function NavigationBar(props: NavigationBarProps): JSX.Element;
