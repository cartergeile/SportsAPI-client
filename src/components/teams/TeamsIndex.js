import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

// api function from api file
import { getAllTeams } from '../../api/teams'
// need messages from autodismiss
import messages from '../shared/AutoDismissAlert/messages'

// styling object
const cardContainerStyle = {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center'
}

// TeamsIndex will make a request to the API for all the teams
// once it recieves a response, display a card for each team

const TeamsIndex = (props) => {
  const [teams, setTeams] = useState(null)
  const [error, setError] = useState(false)

  // pull msgAlert from props
  const { msgAlert } = props

  // get teams from api when component mounts
  useEffect (() => {
    getAllTeams()
      .then(res => setTeams(res.data.teams))
      .catch(err => {
        msgAlert({
          heading: 'Error getting teams',
          message: messages.getTeamsFailure,
          variant: 'danger'
        })
        setError(true)
      })
  }, [])

  if (error) {
    return <p>Error!</p>
  }
  if(!teams) {
    return <p>Loading... please wait</p>
  } else if (teams.length === 0) {
    return <p>No teams yet, go add some!</p>
  }

  // loop over the array of teams, give a card to every one
  const teamCards = teams.map(team => (
    <Card key={ team.id } style={{ width: '30%', margin: 5}}>
      <Card.Header>{ team.fullTitle }</Card.Header>
      <Card.Body>
        <Card.Text>
          <Link to={`/teams/${team.id}`} className='btn btn-dark'>View { team.name }</Link>
        </Card.Text>
      </Card.Body>
    </Card>
  ))

  // return some jsx
  return (
    <div className='container-md' style={ cardContainerStyle }>
      { teamCards }
    </div>
  )

}

export default TeamsIndex