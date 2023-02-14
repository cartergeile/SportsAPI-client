import TeamsIndex from './teams/TeamsIndex'
const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<h2>See All The Teams</h2>
			<TeamsIndex msgAlert={ props.msgAlert }/>
		</>
	)
}

export default Home
