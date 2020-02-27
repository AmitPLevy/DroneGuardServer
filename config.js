const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const port = 3000
const dronePort = 8889
const droneHost = '192.168.10.1'
const droneStatePort = 8890
const dgram = require('dgram')
const drone = dgram.createSocket('udp4')
const droneState = dgram.createSocket('udp4')
const fs = require('fs')

drone.bind(dronePort)
droneState.bind(droneStatePort)

module.exports = {
	express,
	app,
	server,
	io,
	port,
	dgram,
	dronePort,
	droneHost,
	drone,
	droneState,
	droneStatePort,
	fs
}
