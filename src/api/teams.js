// this is where our api calls for the sports resource will live
import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllTeams = () => {
  return axios(`${apiUrl}/teams`)
}

// READ -> Show
export const getOneTeam = (id) => {
  return axios(`${apiUrl}/teams/${id}`)
}

// CREATE (create a team)
export const createTeam = (user, newTeam) => {
  return axios({
    url: `${apiUrl}/teams`,
    method: 'POST',
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: { team: newTeam }
  })
}

// UPDATE
export const updateTeam = (user, updatedTeam) => {
  return axios({
    url: `${apiUrl}/teams/${updatedTeam.id}`,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: { team: updatedTeam }
  })
}
// DELETE
export const removeTeam = (user, teamId) => {
  return axios({
    url: `${apiUrl}/teams/${teamId}`,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${user.token}`
    }
  })
}

