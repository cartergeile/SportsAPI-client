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
    data: { teams: newTeam}
  })
}