import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import ControllerView from './views/controller'
import init from './init'


const app = function() {
	const Rtr = Backbone.Router.extend({
		routes: {
			"sketches": "showSketchTimes",
			"timedSketches/admin": "showSketchesAdmin",
			"timedSketches/:time": "showSketchesByTime",
			"timedSketches/:time/create": "createSketch",
			"timedSketches/:sketchId/contribute": "contributeToSketch",
			"*default": "redirect"
		},

		createSketch: function(timerVal) {
			ReactDOM.render(<ControllerView view="createSketch" timerVal={timerVal} />,document.querySelector('.container'))
		},

		contributeToSketch: function(sketchId) {
			ReactDOM.render(<ControllerView view="contributeToSketch" sketchId={sketchId} />,document.querySelector('.container'))
		},

		redirect: function() {
			location.hash = "sketches"
		},

		showSketchTimes: function() {
			ReactDOM.render(<ControllerView view="sketches" />,document.querySelector('.container'))
		},

		showSketchesAdmin: function() {
			ReactDOM.render(<ControllerView view="sketchesByTime" admin={true} timerVal='all' />,document.querySelector('.container'))
		},

		showSketchesByTime: function(timerVal) {
			ReactDOM.render(<ControllerView view="sketchesByTime" timerVal={timerVal} />,document.querySelector('.container'))
		},

		initialize: function() {
			Backbone.history.start()
		}
	})

	new Rtr()
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..