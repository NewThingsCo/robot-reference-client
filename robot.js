#!/usr/bin/env node
const io = require('socket.io-client')

const socket = io('http://192.168.0.17:5000', {transports: ['websocket']})

/*
 Valid sensor ports: 1, 2, 3, 4
 Valid motor ports: A, B, C, D
 */

// Is called when connection to websocket server is opened
socket.on('connect', () => {
  // Start touch sensor in port 1
  socket.emit('start_touch_sensor', {port: 1})

  // Start color sensor in port 2
  socket.emit('start_color_sensor', {port: 2})

  // Start infrared sensor in port 3
  socket.emit('start_infrared_sensor', {port: 3})

  // Start motor speed to 50 (forward) in port A (valid motor speeds: -100 to 100)
  socket.emit('set_motor_speed', {port: 'A', speed: 50})

  // Start motor speed to -50 (backward) in port B
  socket.emit('set_motor_speed', {port: 'B', speed: -50})
})

// Is called when connection to websocket server is closed
socket.on('disconnect', () => console.log('robot disconnected'))

// Error events
socket.on('error', data => console.log('error', data))

// Returns a value of 0 when the switch is not being pressed and 1 when it is being pressed.
socket.on('touch', data => console.log('touch', data))

// Return a code number corresponding to which color has been detected (0=unknown, 1=black, 2=blue, 3=green, 4=yellow, 5=red, 6=white, 7=brown).
socket.on('color_color', data => console.log('color', data))

// Returns zero when there is no ambient light and a maximum of 100 in bright light.
socket.on('color_ambiet', data => console.log('ambiet', data))

// Percentage of the emitted light that is reflected back to the sensor.
socket.on('color_reflect', data => console.log('reflect', data))

// Return RGB colour values for reflected light.
socket.on('color_color_components', data => console.log('color_components', data))

// Return distance to an obstacle in cm.
socket.on('infrared_proximity', data => console.log('infrared_proximity', data))

// Return signals sent from an IR beacon.
socket.on('infrared_remote', data => console.log('infrared_remote', data))

// Return an array of two elements in which element 0 is the direction and element 1 is the distance in cm to IR beacon.
socket.on('infrared_seek', data => console.log('infrared_seek', data))
