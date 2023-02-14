import apiUrl from '../apiConfig'
import axios from 'axios'

//  CREATE
// /players/:teamId
export const createPlayer = (teamId, newPlayer) => {
  return axios({
    url: `${apiUrl}/players/${teamId}`,
    method: 'POST',
    data: { player : newPlayer }
  })
}

// UPDATE
// /players/:teamId/:playersId
export const updatePlayer = (user, teamId, updatedPlayer) => {
  return axios({
    url: `${apiUrl}/players/${teamId}/${updatedPlayer.id}`,
    method: 'PATCH',
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: { player : updatedPlayer }
  })
}

// DELETE
// /players/:teamId/:playersId
export const deletePlayer = (user, teamId, playerId) => {
  return axios({
    url: `${apiUrl}/teams/${teamId}/${playerId}`,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${user.token}`
    }
  })
}