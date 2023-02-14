import { Card, Button } from 'react-bootstrap'

const ShowPlayer = (props) => {
  const { player } = props

  const setBgCondition = (cond) => {
    if (cond === 'healthy') {
      return({width: '18rem', backgroundColor: '#b5ead7'})
    } else if (cond === 'injured, but can play') {
      return({width: '18rem', backgroundColor: '#ffdac1'})
    } else {
      return({width: '18rem', backgroundColor: '#ff9aa2'})
    }
  }

  return (
    <>
      <Card className='m-2' style={setBgCondition(player.condition)}>
        <Card.Header>{player.name}</Card.Header>
        <Card.Body>
          <small>{player.position}</small>
        </Card.Body>
        <Card.Footer>Condition: {player.condition}</Card.Footer>
      </Card>
    </>
  )
}

export default ShowPlayer