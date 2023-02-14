// modal is rendered by ShowTeam
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import TeamForm from '../shared/TeamForm'
import messages from '../shared/AutoDismissAlert/messages'


const EditTeamModal = (props) => {
  const { user, show, handleClose, updateTeam, msgAlert, triggerRefresh} = props

  const [team, setTeam] = useState(props.team)

  const onChange = (e) => {
    e.persist()
    
    setTeam(prevTeam => {
      const updatedName = e.target.name
      let updatedValue = e.target.value

      if (e.target.type === 'number') {
        updatedValue = parseInt(e.target.value)
    }

    if (updatedName === 'adoptable' && e.target.checked) {
        updatedValue = true
    } else if (updatedName === 'adoptable' && !e.target.checked) {
        updatedValue = false
    }
    
    const updatedTeam = {
        [updatedName] : updatedValue
    }
    
    console.log('the pet', updatedTeam)

    return {
        ...prevTeam, ...updatedTeam
      }
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    updateTeam(user, team)
        // first we'll handle closing the modal
        .then(() => handleClose())
        // we'll also send a success message
        .then(() => {
            msgAlert({
                heading: 'Oh Yeah!',
                message: messages.updateTeamSuccess,
                variant: 'success'
            })
        })
        .then(() => triggerRefresh())
        .catch(() => {
            msgAlert({
                heading: 'Oh No!',
                message: messages.updateTeamFailure,
                variant: 'danger'
            })
        })

}

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header />
      <Modal.Body>
        <TeamForm 
          team={team}
          handleChange={onChange}
          handleSubmit={onSubmit}
          heading="Update Team"
        />
      </Modal.Body>
    </Modal>
  )
}

export default EditTeamModal