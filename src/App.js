import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import { socket } from './apiConfig'

import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import GameMenu from './components/game/GameMenu'
import ChangeGame from './components/game/ChangeGame'
import Rules from './components/Rules'
import ActionMenu from './components/game/ActionMenu'

const App = () => {

	const [playerState, setPlayerState] = useState('wait')
	const [user, setUser] = useState(null)
	const [msgAlerts, setMsgAlerts] = useState([])
	const [joinedGame, setJoinedGame] = useState(false)
	const [gameObject, setGameObject] = useState(null)
	const [statusArray, setStatusArray] = useState([])

    useEffect(() => {
        //listen for status and add it to status bar
        socket.on('status', (arg) => {
            let newStatArray = statusArray.slice()
            newStatArray.unshift(arg.message)
            setStatusArray(newStatArray)
        })

		socket.on('gameData', (arg) => {
			setGameObject(arg.game)
		})

		//force socket to rejoin room on disconnect
		socket.on('disconnect', () => {
				console.log('disconnected', socket.id)
				setJoinedGame(false)
		})

        return function unMount() {
            socket.offAny()
        }
    }, [])


	const clearUser = () => {
		setUser(null)
	}

	const clearGameStates = () => {
		setGameObject(null)
		setJoinedGame(false)		
		setStatusArray([])
	}

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id))
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
			)
		})
	}

	return (
		<>
			<Header user={user} joinedGame={joinedGame}/>
			<Routes>
				<Route path='/' element={<Home msgAlert={msgAlert} user={user} />} />
				<Route
					path='/sign-up'
					element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
				/>
				<Route
					path='/sign-in'
					element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
				/>
				<Route
					path='/sign-out'
					element={
						<RequireAuth user={user}>
							<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
						</RequireAuth>
						}
					/>
					<Route
						path='/gameMenu'
						element={
							<RequireAuth user={user}>
								<GameMenu
									user={user}
									setUser={setUser}
									msgAlert={msgAlert}
									joinedGame={joinedGame}
									setJoinedGame={setJoinedGame}
									statusArray={statusArray}
									gameObject={gameObject}
									clearGameStates={clearGameStates}
								/>
							</RequireAuth>						
						}
					/>
					<Route
						path='/change-game'
						element={
							<RequireAuth user={user}>
								<ChangeGame
									user={user}
									setUser={setUser}
									msgAlert={msgAlert}
									clearGameStates={clearGameStates}
								/>
							</RequireAuth>						
						}
					/>
					<Route
						path='/rules'
						element={							
							<Rules user={user}/>
						}
					/>
					<Route
						path='/change-password'
						element={

						<RequireAuth user={user}>
							<ChangePassword msgAlert={msgAlert} user={user} />
						</RequireAuth>}
				/>
			</Routes>
			{msgAlerts.map((msgAlert) => (
				<AutoDismissAlert
					key={msgAlert.id}
					heading={msgAlert.heading}
					variant={msgAlert.variant}
					message={msgAlert.message}
					id={msgAlert.id}
					deleteAlert={deleteAlert}
				/>
			))}
		</>
	)
}

export default App
