import { useState } from 'react'
import { createTeam } from '../../api/teams'
import { createTeamSuccess, createTeamFailure } from '../shared/AutoDismissAlert/messages'
import TeamForm from '../shared/TeamForm'
import { useNavigate } from 'react-router-dom'

const CreateTeam = (props) => {
  // pull props
  const { user, msgAlert } = props
  const navigate = useNavigate()

const [team, setTeam] = useState({
  name: '',
  type: '',
  rank: '',
  joinable: false
})

const onChange = (e) => {
  e.persist()

  setTeam(prevTeam => {
    const updatedName = e.target.name
    let updatedValue = e.target.value
    if (e.target.type === 'number') {
      updatedValue = parseInt(e.target.value)
    }
    if (updatedName === 'joinable' && e.target.checked) {
      updatedValue = true
    } else if (updatedName === 'joinable' && !e.target.checked) {
      updatedValue = false
    }
    const updatedTeam = {
      [updatedName] : updatedValue
    }
    return {
      ...prevTeam, ...updatedTeam
    }
  })
}

const onSubmit = (e) => {
  e.preventDefault()
  createTeam(user, team)
    .then(res => { navigate(`/teams/${res.data.team.id}`)})
    .then(() => {
      msgAlert({
        heading: 'Oh Yeah!',
        message: createTeamSuccess,
        variant: 'success'
      })
    })
    .catch(() => {
      msgAlert({
        heading: 'On No!',
        message: createTeamFailure,
        variant: 'danger'
      })
    })
}

return (
    <TeamForm 
      team={team}
      handleChange={onChange}
      handleSubmit={onSubmit}
      heading='Add new team!'
    />
  )
}

export default CreateTeam