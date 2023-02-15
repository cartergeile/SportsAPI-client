import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneTeam, removeTeam, updateTeam } from '../../api/teams'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
import EditTeamModal from './EditTeamModal'
import ShowPlayer from '../players/ShowPlayer'
import NewPlayerModal from '../players/NewPlayerModal'

// get teams id from the route parameters
// make a request to the api
// render the data when a team is retrieved from api

const playerCardContainerLayout = {
  display: 'flex',
  justifyContent: 'center',
  flexFlow: 'row wrap'
}

const ShowTeam = (props) => {
  const [team, setTeam] = useState(null)
  const [editModalShow, setEditModalShow] = useState(false)
  const [playerModalShow, setPlayerModalShow] = useState(false)
  const [updated, setUpdated] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

  const { user, msgAlert } = props
  
  useEffect(() => {
    getOneTeam(id)
      .then(res => setTeam(res.data.team))
      .catch(err => {
        msgAlert({
          heading: 'Error getting teams',
          message: messages.getTeamsFailure,
          variant: 'danger'
        })
      })
  }, [updated])

  //remove team function
  const setTeamFree = () => {
    removeTeam(user, team.id)
      .then(() => {
        msgAlert({
          heading: 'Success',
          message: messages.removeTeamSuccess,
          variant: 'success'
        })
      })
      .then(() => navigate('/'))
      .catch(err => {
        msgAlert({
          heading: 'Error',
          message: messages.removeTeamFailure,
          variant: 'danger'
        })
      })
  }

  let playerCards
  if (team) {
    if (team.players.length > 0) {
      playerCards = team.players.map(player => (
        <ShowPlayer 
          key={player.id}
          player={player}
          user={user}
          team={team}
          msgAlert={msgAlert}
          triggerRefresh={() => setUpdated(prev => !prev)}
        />
      ))
    }
  }

  if (!team) {
    return <LoadingScreen />
  }

  return (
    <>
      <Container className='m-2'>
        <Card>
          <Card.Header>{ team.fullTitle }</Card.Header>
          <Card.Body>
            <Card.Text>
              <div><small>Type: {team.type}</small></div>
              <div><small>Rank: {team.rank}</small></div>
              <div><small>Joinable: {team.joinable ? 'yes' : 'no'}</small></div>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button className='m-2' variant='info' onClick={() => setPlayerModalShow(true)}>
              Give {team.name} a player!
            </Button>
            {
              team.owner && user && team.owner.id === user.id
              ?
              <>
                <Button className='m-2' variant='danger' onClick={() => setTeamFree()}>
                Remove {team.name}
                </Button>
                <Button className='m-2' variant='warning' onClick={() => setEditModalShow(true)}>
                Edit {team.name}
                </Button>
              </>
              :
              null
            }
          </Card.Footer>
        </Card>
        <h2 style={{textAlign : 'center'}} >Players</h2>
      </Container>     
      <Container className='m-2' style={playerCardContainerLayout}>      
        {playerCards}
      </Container>
      <EditTeamModal 
        user={user}
        show={editModalShow}
        handleClose={() => setEditModalShow(false)}
        updateTeam={updateTeam}
        msgAlert={msgAlert}
        triggerRefresh={() => setUpdated(prev => !prev)}
        team={team}
      />
      <NewPlayerModal 
        user={user}
        team={team}
        show={playerModalShow}
        handleClose={() => setPlayerModalShow(false)}
        msgAlert={msgAlert}
        triggerRefresh={() => setUpdated(prev => !prev)}
      />
    </>
  )
}

export default ShowTeam