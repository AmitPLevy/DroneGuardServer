const { server, port, app } = require('./config')
const { drone, droneHost, dronePort, io } = require('./config')
const { myCamera } = require('./camera')

app.get('/camera', () => {
	myCamera
		.record()
		.then(result => {
			io.on('connection', socket => {
				socket.emit('video', result)
			})
		})
		.catch(error => {
			console.log('errorrrrrr', error)
		})
})

server.listen(port, () => console.log('server running on port:' + port))
