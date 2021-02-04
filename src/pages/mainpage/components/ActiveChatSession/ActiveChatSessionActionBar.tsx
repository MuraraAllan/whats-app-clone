import React from 'react'
import { useActiveSession } from 'pages/mainpage/hooks'

export default function ActiveChatSessionActionBar() {
  const { activeSession, userBelongsToActiveSession } = useActiveSession()
  if (userBelongsToActiveSession === false) {
    return (
      <div style={{ width: '100%', height: '100%', backgroundColor: '#80808066' }} />
    )
  }
  return <span>action bar</span>
}