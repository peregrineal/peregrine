'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

/** Refreshes the page in the admin live preview each time the editor saves (autosave included). */
export function LivePreviewListener() {
  const router = useRouter()
  return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={process.env.NEXT_PUBLIC_SERVER_URL || ''} />
}
