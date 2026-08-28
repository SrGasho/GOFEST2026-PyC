/** The beacon activation control: a large circular target that broadcasts the user's position and vitals. */
export interface BeaconControlProps {
  /** sos = I need help. search = I am looking for someone. */
  mode?: 'sos' | 'search';
  /** Broadcasting state — fills the target and starts the ripple. */
  active?: boolean;
  /** Set until beacon permission has been granted. */
  disabled?: boolean;
  onActivate?: () => void;
  onStop?: () => void;
  /** Diameter in px. 200 on a phone; 140 in a sheet. */
  size?: number;
}
export declare function BeaconControl(props: BeaconControlProps): JSX.Element;
