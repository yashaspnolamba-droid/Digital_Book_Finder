import logo from '../assets/logo.png'

export default function Logo({ dark = false, compact = false, size = 'md', centered = false }) {
  const classes = [
    'brand-lockup',
    dark ? 'on-dark' : '',
    compact ? 'compact' : '',
    centered ? 'centered' : '',
    `size-${size}`
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes}>
      <img src={logo} alt="Digi-Lib logo" />
      <span className="word">
        DIGI<span>~</span>LIB
      </span>
    </div>
  )
}
