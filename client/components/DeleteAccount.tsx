import { useDeleteUserById } from '../hooks/useUsers'
import { useNavigate } from 'react-router'

interface Props {
  userId: number
}

export default function DeleteAccount({ userId }: Props) {
  const deleteUser = useDeleteUserById(userId)
  const navigate = useNavigate()
  const handleClick = () => {
    deleteUser.mutate(userId)
    //TODO - end local session and log user out
    navigate('/')
  }
  return (
    <>
      <button onClick={handleClick}>Delete account</button>
    </>
  )
}
