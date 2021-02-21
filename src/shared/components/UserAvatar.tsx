import React from 'react'
import PersonIcon from '@material-ui/icons/Person';

import { CircleContainer } from './CircleContainer'
import { User } from 'shared/context/LoggedUserContext'

interface UserAvatarProps {
  avatar: User["avatar"]
  limitDimensions?: string | number
}

export function UserAvatar({ avatar, limitDimensions }: UserAvatarProps) {
  // invoke user here =)
  if (avatar == null) {
    if (limitDimensions != null) {
      return (
        <CircleContainer style={{ maxWidth: limitDimensions, maxHeight: limitDimensions }}>
          <PersonIcon style={{ width: '80%', height: '80%' }} />
        </CircleContainer>)
    }
    return (<CircleContainer>
      <PersonIcon style={{ width: '80%', height: '80%' }} />
    </CircleContainer>)
  }
  return null
}