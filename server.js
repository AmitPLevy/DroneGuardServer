const { server, port, app } = require('./config')
const { camera } = require('./camera')

app.get('/camera', () => {
	myCamera
		.record()
		.then(result => {
			console.log('success')
		})
		.catch(error => {
			console.log('errorrrrrr', error)
		})
})

server.listen(port, () => console.log('server running on port:' + port))
