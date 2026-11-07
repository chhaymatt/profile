import styles from './SketchPreview.module.css'

// The placeholder "screenshot" for a project that's still being built: a browser
// window sketched in lines, with a pencil drawing the last stroke.

export function SketchPreview() {
  return (
    <svg className={styles.sketch} viewBox="0 0 240 126" aria-hidden="true" focusable="false">
      <rect className={styles.window} x="14" y="10" width="212" height="106" rx="10" />
      <path className={styles.window} d="M14 30h212" />
      <circle className={styles.dot} cx="28" cy="20" r="3" />
      <circle className={styles.dot} cx="39" cy="20" r="3" />
      <circle className={styles.dot} cx="50" cy="20" r="3" />

      <rect className={styles.block} x="28" y="42" width="64" height="48" rx="6" />
      <path className={styles.line} d="M106 46h80M106 58h100M106 70h64" />
      <path className={styles.drawing} d="M106 86h58" pathLength={1} />

      {/* Drawn with its point at (0, 0) and moved so the point sits exactly on the end
          of the line; the outer group slides it along as the line is drawn. */}
      <g className={styles.pencil}>
        <g transform="translate(164 86)">
          <path className={styles.tip} d="M0 0l3-9 6 6z" />
          <path d="M3-9l6 6 14-14-6-6z" />
          <path className={styles.eraser} d="M17-23l6 6 3-3-6-6z" />
        </g>
      </g>
    </svg>
  )
}
