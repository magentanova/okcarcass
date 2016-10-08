import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import ControllerView from './views/controller'
import init from './init'
import ACTIONS from './actions'

Array.prototype.contains = function(el) {
	return this.indexOf(el) !== -1
}

const app = function() {
	const Rtr = Backbone.Router.extend({
		routes: {
			"sketches": "showSketchTimes",
			"timedSketches/admin": "showSketchesAdmin",
			"timedSketches/:time": "showSketchesByTime",
			"timedSketches/:time/create": "createSketch",
			"timedSketches/:sketchId/contribute": "contributeToSketch",
			"timedSketches/:time/create/test": "createSketchTest",
			"timedSketches/:sketchId/contribute/test": "contributeToSketchTest",
			"*default": "redirect"
		},

		createSketch: function(timerVal) {
			ReactDOM.render(<ControllerView view="createSketch" timerVal={timerVal} />,document.querySelector('.container'))
		},

		contributeToSketch: function(sketchId) {
			ReactDOM.render(<ControllerView view="contributeToSketch" sketchId={sketchId} />,document.querySelector('.container'))
		},

		createSketchTest: function(timerVal) {
			ReactDOM.render(<ControllerView view="createSketch" timerVal={timerVal} test />,document.querySelector('.container'))
		},

		contributeToSketchTest: function(sketchId) {
			ReactDOM.render(<ControllerView view="contributeToSketch" sketchId={sketchId} test />,document.querySelector('.container'))
		},

		redirect: function() {
			location.hash = "sketches"
		},

		showSketchTimes: function() {
			ReactDOM.render(<ControllerView view="sketches" />,document.querySelector('.container'))
		},

		showSketchesAdmin: function() {
			ReactDOM.render(<ControllerView view="sketchesByTime" timerVal='all' test />,document.querySelector('.container'))
		},

		showSketchesByTime: function(timerVal) {
			ReactDOM.render(<ControllerView view="sketchesByTime" timerVal={timerVal} />,document.querySelector('.container'))
		},

		initialize: function() {
			Backbone.history.start()
			this.on('route',()=>ACTIONS.resetStore())
		}
	})

	new Rtr()
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..