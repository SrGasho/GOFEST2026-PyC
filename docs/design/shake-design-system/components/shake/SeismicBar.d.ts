/** Persistent event banner: magnitude, epicentre, time, and a 7-step intensity ramp. */
export interface SeismicBarProps {
  /** 1–7 on the seismic intensity ramp. */
  level?: number;
  /** Epicentre place name. */
  place?: string;
  /** Relative or absolute time string. */
  time?: string;
  /** Magnitude as a string, e.g. "6.4". */
  magnitude?: string;
}
export declare function SeismicBar(props: SeismicBarProps): JSX.Element;
