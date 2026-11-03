import { APIError, type CollectionConfig } from 'payload'

import { isOwnerUser } from '@/access'

export const MIN_PASSWORD_LENGTH = 10

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'User', plural: 'Users' },
  admin: { group: 'Settings', useAsTitle: 'email', defaultColumns: ['name', 'email', 'role'] },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    tokenExpiration: 60 * 60 * 8,
    cookies: { secure: process.env.NODE_ENV === 'production', sameSite: 'Lax' },
  },
  access: {
    // Everyone logged in can see the user list (for "updated by"), only the Owner manages users.
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => isOwnerUser(req),
    update: ({ req, id }) => isOwnerUser(req) || (req.user ? req.user.id === id : false),
    delete: ({ req }) => isOwnerUser(req),
    admin: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      saveToJWT: true,
      options: [
        { label: 'Owner', value: 'owner' },
        { label: 'Editor', value: 'editor' },
      ],
      access: { update: ({ req }) => isOwnerUser(req) },
      admin: {
        description:
          'Owner: everything, including users, settings, legal wording and enquiries. Editor: pages, libraries and media.',
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.password && String(data.password).length < MIN_PASSWORD_LENGTH) {
          throw new APIError(`Passwords must be at least ${MIN_PASSWORD_LENGTH} characters long.`, 400, undefined, true)
        }
        return data
      },
    ],
  },
}
