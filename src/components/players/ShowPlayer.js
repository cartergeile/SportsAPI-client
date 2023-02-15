import { Card, Button } from 'react-bootstrap'
import { deletePlayer } from '../../api/players'

const ShowPlayer = (props) => {
  const { player, user, team, msgAlert, triggerRefresh } = props

  const setBgCondition = (cond) => {
    if (cond === 'healthy') {
      return({width: '18rem', backgroundColor: '#b5ead7'})
    } else if (cond === 'injured, but can play') {
      return({width: '18rem', backgroundColor: '#ffdac1'})
    } else {
      return({width: '18rem', backgroundColor: '#ff9aa2'})
    }
  }

  // Delete players
  const destroyPlayer = () => {
    deletePlayer(user, team.id, player._id)
      .then(() => {
        msgAlert({
          heading: 'Player Deleted',
          message: 'Bye Bye Player',
          variant: 'success'
        })
      })
      .then(() => triggerRefresh())
      .catch(() => {
        msgAlert({
          heading: 'Oh no',
          message: 'Something went wrong',
          variant: 'danger'
        })
      })
  }

  return (
    <>
      <Card className='m-2' style={setBgCondition(player.condition)}>
        <Card.Header>{player.name}</Card.Header>
        <Card.Body>
          <small>{player.position}</small>
        </Card.Body>
        <Card.Footer>
          <small>Condition: {player.condition}</small><br></br>
          {
            user && user._id === team.owner._id
            ?
            <>
              <Button onClick={() => destroyPlayer()} variant='danger' className='m-2'>Delete Player</Button>
            </>
            :
            null
          }
        </Card.Footer>
      </Card>
    </>
  )
}

export default ShowPlayer