import { useState} from 'react'
import { Modal } from 'react-bootstrap'
import PlayerForm from '../shared/PlayerForm'
import { createPlayer } from '../../api/players'

const NewPlayerModal = (props) => {
  const {  team, show, handleClose, msgAlert, triggerRefresh } = props

  const [player, setPlayer] = useState({})

  const onChange = (e) => {
    e.persist()

  setPlayer(prevPlayer => {
    const updatedName = e.target.name
    let updatedValue = e.target.value
    const updatedPlayer = {
      [updatedName] : updatedValue
    }
    return {
      ...prevPlayer, ...updatedPlayer
    }
  })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    createPlayer(team.id, player)
    .then(() => handleClose())
    .then(() => {
      msgAlert({
        heading: 'Oh Yeah!',
        message: 'Great, the player seems to like this team!',
        variant: 'success'
      })
    })
    .then(() => triggerRefresh())
    .catch(() => {
      msgAlert({
        heading: 'On No!',
        message:'Something went wrong, please try again',
        variant: 'danger'
      })
    })
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton />
      <Modal.Body>
        <PlayerForm 
          player={player}
          handleChange={onChange}
          handleSubmit={onSubmit}
          heading="Give this team a player!"
        />
      </Modal.Body>
    </Modal>
  )
}

export default NewPlayerModal