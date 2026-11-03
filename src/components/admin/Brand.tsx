/* eslint-disable @next/next/no-img-element */
// Admin panel branding (login screen logo and the small nav icon). Navy and white
// versions are both rendered and custom.scss shows the one that suits the admin theme.

export function Logo() {
  return (
    <span className="peregrine-brand">
      <img className="peregrine-brand--light" src="/brand/logo-stacked-navy.png" alt="PEREGRINE" width={220} height={101} style={{ width: 220, height: 'auto' }} />
      <img className="peregrine-brand--dark" src="/brand/logo-stacked-white.png" alt="PEREGRINE" width={220} height={101} style={{ width: 220, height: 'auto' }} />
    </span>
  )
}

export function Icon() {
  return (
    <span className="peregrine-brand">
      <img className="peregrine-brand--light" src="/brand/mark-navy.png" alt="PEREGRINE" width={34} height={7} style={{ width: 34, height: 'auto' }} />
      <img className="peregrine-brand--dark" src="/brand/mark-white.png" alt="PEREGRINE" width={34} height={7} style={{ width: 34, height: 'auto' }} />
    </span>
  )
}
