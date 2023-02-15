// form used to create and update a player
import { Form, Button, Container } from 'react-bootstrap'

const PlayerForm = (props) => {
  const { player, handleChange, handleSubmit, heading } = props

  return (
    <Container className='justify-content-center'>
      <h3>{heading}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='m-2'>
          <Form.Label>Name:</Form.Label>
          <Form.Control 
            placeholder="What is your player's name?"
            name='name'
            id='name'
            value={ player.name }
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='m-2'>
          <Form.Label>Position:</Form.Label>
          <Form.Control 
            placeholder='What position does your player play?'
            name='position'
            id='position'
            value={ player.position }
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='m-2'>
          <Form.Select 
            aria-label='player condition'
            name='condition'
            defaultValue={ player.condition }
            onChange={handleChange}
          >
            <option>Condition</option>
            <option value='healthy'>Healthy</option>
            <option value ='injured, but can play'>injured, but can play</option>
            <option value ='injured and out'>Injured and out</option>
          </Form.Select>
        </Form.Group>
        <Button className='m-2' type='submit'>Submit</Button>
      </Form>
    </Container>
  )
}

export default PlayerForm