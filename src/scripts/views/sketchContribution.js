import React from 'react'
import ACTIONS from '../actions'
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
	 render: function() {
	 	return (
	 		<div className='story-so-far' >
	 			<p>{this.props.contributions.reduce((snowball,model)=>snowball += ' ' + model.get('text'),'')}</p>
	 		</div>
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
			author: e.target.author.value
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
