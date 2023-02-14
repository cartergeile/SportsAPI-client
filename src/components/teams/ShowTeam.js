import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { getOneTeam } from '../../api/teams'
import messages from '../shared/AutoDismissAlert/messages'

// get teams id from the route parameters
// make a request to the api
// render the data when a team is retrieved from api

const ShowTeam = (props) => {
  const [team, setTeam] = useState(null)

  const { id } = useParams()

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

  if (!team) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Container>
        <Card>
          <Card.Header>{ team.fullTitle }</Card.Header>
          <Card.Body>
            <Card.Text>
              <div><small>Type: {team.type}</small></div>
              <div><small>Rank: {team.rank}</small></div>
              <div><small>Joinable: {team.joinable ? 'yes' : 'no'}</small></div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default ShowTeam