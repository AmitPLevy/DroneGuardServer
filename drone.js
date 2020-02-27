const { drone, droneHost, dronePort, io, fs } = require('./config')
const { myCamera } = require('./camera')

drone.send('command', 0, 7, dronePort, droneHost, (err, success) => {
	if (err) {
		console.log(err)
	}
})

const keepAlive = () => {
	drone.send('command', 0, 7, dronePort, droneHost, err => {
		if (err) console.log(err)
	})
}

let interval
io.on('connection', socket => {
	socket.on('command', command => {
		if (command === 'takeoff') interval = setInterval(keepAlive, 10000)
		if (command === 'land') clearInterval(interval)
		console.log(command)
		drone.send(command, 0, command.length, dronePort, droneHost, err => {
			if (err) console.log(err)
		})
		io.emit('command', command)
	})
})

io.on('connection', socket => {
	socket.on('video', () => {
		myCamera
			.record()
			.then(result => {
				fs.readFile(`${__dirname}/videos/video.h264`, 'utf8', (err, data) => {
					if (err) throw err
					io.emit('video', data)
				})
			})

			.catch(error => {
				console.log('errorrrrrr', error)
			})
	})
})
