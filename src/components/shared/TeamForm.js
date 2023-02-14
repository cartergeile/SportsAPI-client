// form used to create and update a team
import { Form, Button, Container } from 'react-bootstrap'

const TeamForm = (props) => {
  const { team, handleChange, handleSubmit, heading } = props

  return (
    <Container className='justify-content-center'>
      <h3>{heading}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='m-2'>
          <Form.Label>Name:</Form.Label>
          <Form.Control 
            placeholder='What is your team name?'
            name='name'
            id='name'
            value={ team.name }
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='m-2'>
          <Form.Label>Type:</Form.Label>
          <Form.Control 
            placeholder='What type of sport does your team play?'
            name='type'
            id='type'
            value={ team.type }
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='m-2'>
          <Form.Label>Rank:</Form.Label>
          <Form.Control 
            type='number'
            placeholder='What is your team ranked?'
            name='rank'
            id='rank'
            value={ team.rank }
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='m-2'>
          <Form.Check
            label="Is this team joinable?"
            name='joinable'
            defaultChecked={team.joinable}
            onChange={handleChange}
          />
        </Form.Group>
        <Button className='m-2' type='submit'>Submit</Button>
      </Form>
    </Container>
  )
}

export default TeamForm