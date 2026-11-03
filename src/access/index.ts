import type { Access, FieldAccess, PayloadRequest } from 'payload'

export type Role = 'owner' | 'editor'

type MaybeUser = { role?: Role | null } | null | undefined

export const hasRole = (user: MaybeUser, role: Role) => Boolean(user && user.role === role)

export const isOwnerUser = (req: PayloadRequest) => hasRole(req.user as MaybeUser, 'owner')

export const anyone: Access = () => true

export const loggedIn: Access = ({ req }) => Boolean(req.user)

export const ownerOnly: Access = ({ req }) => isOwnerUser(req)

export const ownerOnlyField: FieldAccess = ({ req }) => isOwnerUser(req)

/** Published documents for the public, everything (including drafts) for editors. */
export const publishedOrLoggedIn: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}
