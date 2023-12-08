import { useState, useRef, useEffect } from 'react'
import useSound from 'use-sound'
import jitel from './sound/jitels.mp3'
import jitel2 from './sound/jitels2.mp3'
import jitel3 from './sound/jitels3.mp3'
import jitel4 from './sound/jitels4.mp3'

function App() {
	const [gameArr, setGameArr] = useState([])
	const [step, setStep] = useState(0)
	// const [stepView, setStepView] = useState(0)
	const [round, setRound] = useState(0)
	const [level, setLevel] = useState(1000)

	const purple = useRef(null)
	const red = useRef(null)
	const yellow = useRef(null)
	const green = useRef(null)

	const [play] = useSound(jitel)
	const [play2] = useSound(jitel2)
	const [play3] = useSound(jitel3)
	const [play4] = useSound(jitel4)

	function getRandomNumber(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min
	}

	function simon() {
		const simonStep = getRandomNumber(1, 4)
		setGameArr(item => [...item, simonStep])
		// setRound(0)
	}

	useEffect(() => {
		stepViewRef.current = 0
		simonView()
	}, [gameArr])

	function checkSimon(number) {
		if (number === gameArr[step] && gameArr.length - 1 === step) {
			simon()
			setRound(item => item + 1)
			setStep(0)
		} else if (number === gameArr[step]) {
			setStep(item => item + 1)
		} else {
			setGameArr([])
			setStep(0)
			setRound(0)
		}
	}

	const stepViewRef = useRef(0)

	function simonView() {
		if (gameArr.length) {
			let easy = setInterval(() => {
				switch (gameArr[stepViewRef.current]) {
					case 1:
						if (purple.current) {
							purple.current.style.opacity = '100%'
							play()
						}
						setTimeout(() => {
							purple.current.style.opacity = '50%'
						}, level - 100)
						break
					case 2:
						if (red.current) {
							red.current.style.opacity = '100%'
							play2()
						}

						setTimeout(() => {
							red.current.style.opacity = '50%'
						}, level - 100)
						break
					case 3:
						if (yellow.current) {
							yellow.current.style.opacity = '100%'
							play3()
						}
						setTimeout(() => {
							yellow.current.style.opacity = '50%'
						}, level - 100)
						break
					case 4:
						if (green.current) {
							green.current.style.opacity = '100%'
							play4()
						}
						setTimeout(() => {
							green.current.style.opacity = '50%'
						}, level - 100)
						break
					default:
						clearInterval(easy)
						stepViewRef.current = 0
				}
				stepViewRef.current += 1
			}, level)
		}
	}

	return (
		<div className='main'>
			<h1>Simon says</h1>
			<div className='section'>
				<div className='simon'>
					<div
						className='simon__item'
						ref={purple}
						id='id1'
						onMouseDown={() => {
							purple.current.style.opacity = '100%'
						}}
						onMouseUp={() => {
							purple.current.style.opacity = '50%'
						}}
						onClick={() => {
							checkSimon(1)
							play()
						}}
					></div>
					<div
						className='simon__item'
						ref={red}
						id='id2'
						onMouseDown={() => {
							red.current.style.opacity = '100%'
						}}
						onMouseUp={() => {
							red.current.style.opacity = '50%'
						}}
						onClick={() => {
							checkSimon(2)
							play2()
						}}
					></div>
					<div
						className='simon__item'
						ref={yellow}
						id='id3'
						onMouseDown={() => {
							yellow.current.style.opacity = '100%'
						}}
						onMouseUp={() => {
							yellow.current.style.opacity = '50%'
						}}
						onClick={() => {
							checkSimon(3)
							play3()
						}}
					></div>
					<div
						className='simon__item'
						ref={green}
						id='id4'
						onMouseDown={() => {
							green.current.style.opacity = '100%'
						}}
						onMouseUp={() => {
							green.current.style.opacity = '50%'
						}}
						onClick={() => {
							checkSimon(4)
							play4()
						}}
					></div>
				</div>
				<div className='option'>
					<h2 className='option__title'>Раунд: {round}</h2>
					<p className='option__desc'>
						Вы сейчас на сложности:{' '}
						{level === 1000
							? 'Легкий'
							: level === 700
							? 'Нормальный'
							: 'Сложный'}
					</p>
					<button
						className='option__btn'
						onClick={() => {
							setGameArr([])
							simon()
							setRound(1)
						}}
					>
						Старт
					</button>
					<ul className='option__list'>
						<li>
							<button className='level' onClick={() => setLevel(1000)}>
								Легкий
							</button>
						</li>
						<li>
							<button className='level' onClick={() => setLevel(700)}>
								Нормальный
							</button>
						</li>
						<li>
							<button className='level' onClick={() => setLevel(400)}>
								Сложный
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default App
