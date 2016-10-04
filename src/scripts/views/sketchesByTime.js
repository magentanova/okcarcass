import React from 'react'
import ACTIONS from '../actions'

const SketchesByTime = React.createClass({

	componentWillMount: function() {
		var opts = {timerVal: this.props.timerVal}
		if (this.props.timerVal === 'all') opts = {}
		ACTIONS.fetchSketches(opts)
	},

	render: function() {
		return (
			<div className="sketches-by-time" >
				<a href={`#timedSketches/${this.props.timerVal}/create`} className="btn primary">+</a>
				<AllSketches admin={this.props.admin} sketches={this.props.sketches} />
			</div>
		)
	}
})

const AllSketches = React.createClass({
	 render: function() {
	 	return (
	 		<div className="all-sketches" >
	 			{this.props.sketches.map((sketchMod)=><SketchLink key={sketchMod.cid} admin={this.props.admin} mod={sketchMod} />)}
	 		</div>
	 	)
 	}
})

const SketchLink = React.createClass({

	_handleDelete: function(e) {
		ACTIONS.deleteSketch(this.props.mod.get('_id'))
	},

	render: function() {
		var buttonStyle = {display: 'none'}
		if (this.props.admin) {
			buttonStyle.display = 'inline'
		}

		return (
			<div className="sketch-link">
				<a href={`#timedSketches/${this.props.mod.get('_id')}/contribute`} >{this.props.mod.get('title')}</a>
				<span className="votes" >{this.props.mod.get('votes') ? this.props.mod.get('votes') : 0} </span>
				<button onClick={this._handleDelete} style={buttonStyle} className="btn danger">X</button> 
			</div>
			)
	}
})

export default SketchesByTime
