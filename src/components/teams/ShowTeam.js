import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneTeam, removeTeam } from '../../api/teams'
import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'

// get teams id from the route parameters
// make a request to the api
// render the data when a team is retrieved from api

const ShowTeam = (props) => {
  const [team, setTeam] = useState(null)

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
  }, [])

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
            {
              team.owner && user && team.owner.id === user.id
              ?
              <>
                <Button className='m-2' variant='danger' onClick={() => setTeamFree()}>
                Remove {team.name}
                </Button>
              </>
              :
              null
            }
          </Card.Footer>
        </Card>
      </Container>
    </>
  )
}

export default ShowTeam