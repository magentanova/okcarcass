import React from 'react'
import NavBar from './navBar'
import Sketches from './sketches'
import SketchesByTime from './sketchesByTime'
import SketchCreator from './sketchCreator'
import SketchContribution from './sketchContribution'
import STORE from '../store'
import ACTIONS from '../actions'

const ControllerView = React.createClass({

	componentWillMount: function() {
		STORE.on('update',()=>{
			this.setState(STORE.getData())
		})
	},

	componentWillReceiveProps: function() {
		ACTIONS.clearTimer()
	},

	componentWillUnmount: function() {
		STORE.off('update')
	},

	getInitialState: function() {
		return STORE.getData()
	},

	render: function() {
		var component
		switch (this.props.view) {
			case "sketches": 
				component = <Sketches {...this.props} {...this.state} />
				break
			case "sketchesByTime": 
				component = <SketchesByTime {...this.props} {...this.state} />
				break
			case "createSketch": 
				component = <SketchCreator {...this.props} {...this.state} />
				break
			case "contributeToSketch":
				component = <SketchContribution {...this.props} {...this.state} />
				break
		}
		return (
			<div className="container-full">
				<NavBar />
				{component}
			</div>
		)
	}
})

export default ControllerView
