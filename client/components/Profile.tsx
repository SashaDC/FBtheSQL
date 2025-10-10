import ProfileDetail from './ProfileDetail'
import { useParams } from 'react-router'

interface Props {
  userId?: number
}

export default function Profile({ userId }: Props) {
  //If the profile component has been sent a userId prop, then use that to return
  //the profile details component.
  //If not, check and use the url parameter value.
  const { id } = useParams()
  const idAsNum = Number(id)

  if (userId) {
    return <ProfileDetail userId={userId} />
  }

  if (id && !Number.isNaN(idAsNum) && Number.isInteger(idAsNum)) {
    return <ProfileDetail userId={idAsNum} />
  }

  return <p>Profile not found</p>
}
