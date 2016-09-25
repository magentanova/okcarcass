import React from 'react'
import ACTIONS from '../actions'
import {rainbowColor} from '../utils'
import Timer from './timer'
import WriteForm from './writeForm'


const SketchContribution = React.createClass({

	componentWillMount: function() {
		ACTIONS.fetchSketchById(this.props.sketchId)
		ACTIONS.fetchContributions({sketchId: this.props.sketchId})
	},

	render: function() {
		var timer = <div></div>
		var timerVal = this.props.sketch.get('timerVal')
		if (timerVal) timer = <Timer timerVal={this.props.sketch.get('timerVal')} />
		return (
			<div className="sketch-contribution" >
				<h3>{this.props.sketch.get('title')}</h3>
				{timer}
				<StorySoFar contributions={this.props.contributions} />
				<ContributeForm timesUp={this.props.timesUp} index={this.props.contributions.models.length} sketchId={this.props.sketchId} />
			</div>
		)
	}
})


const StorySoFar = React.createClass({

	 _addContribution: function(snowball,model) {
	 	return snowball.concat([<Contribution model={model} />])

	 },

	 render: function() {
	 	return (
	 		<div className='story-so-far' >
	 			<p>{this.props.contributions.reduce(this._addContribution,[])}</p>
	 		</div>
	 	)
 	}
})

const Contribution = React.createClass({

	getInitialState: function() {
		return {
			authorShowing: false,
			authorLeft: 0,
			authorBottom: 0
		}
	},

	_showAuthor: function(e) {
		this.setState({
			authorShowing: true,
			authorLeft: `${e.clientX}px`,
			authorBottom: `${window.innerHeight - e.clientY}px`
		})
	},

	_hideAuthor: function() {
		this.setState({
			authorShowing: false
		})
	},

	 render: function() {
	 	// display attribution on hover
	 	var styleObj
	 	if (this.state.authorShowing) {
	 		styleObj = {
	 			display: 'inline',
	 			left: this.state.authorLeft,
	 			bottom: this.state.authorBottom
	 		}
	 	}

	 	else {
	 		styleObj = {display: 'none'}
	 	}

	 	return (
	 		<span onMouseEnter={this._showAuthor} onMouseMove={this._showAuthor} onMouseLeave={this._hideAuthor} className="contribution" style={{color: rainbowColor(this.props.model.get('index'),.6)}}> 
	 			{this.props.model.get('text')} 
	 			<span style={styleObj} className="attribution">{this.props.model.get('author')}</span>
	 		</span>
	 		)
	 }
})

const ContributeForm = React.createClass({

	_contribute: function(e) {
		e.preventDefault()
		var data = {
			sketchId: this.props.sketchId,
			text: e.target.text.value,
			index: this.props.index,
			author: e.target.author.value || 'anonipotamus'
		}
		ACTIONS.saveContribution(data)
	},

	 render: function() {

	 	var styleObj = {'display': 'none'}
	 	if (this.props.timesUp) {
	 		styleObj.display = 'block'
	 	}
	 	return (
	 		<div className='contribute-form' >
	 			<form onSubmit={this._contribute} className="form-group grid-container">
	 				<WriteForm timesUp={this.props.timesUp} />
	 			</form>
	 		</div>
	 	)
 	}
})

export default SketchContribution
