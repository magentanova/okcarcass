import React from 'react'
import ACTIONS from '../actions'
import Timer from './timer'
import WriteForm from './writeForm'
import OKAlert from './OKAlert'
import StorySoFar from './storySoFar'


const SketchContribution = React.createClass({

	componentWillMount: function() {
		ACTIONS.fetchSketchById(this.props.sketchId)
		ACTIONS.fetchContributions({sketchId: this.props.sketchId})
	},

	render: function() {
		var timer = <div></div>
		var timerVal = this.props.sketch.get('timerVal')
		if (timerVal) timer = <Timer test={this.props.test} timerVal={this.props.sketch.get('timerVal')} />
		return (
			<div className="sketch-contribution" >
				<h3>{this.props.sketch.get('title')}</h3>
				{timer}
				<StorySoFar 
					contributeView
					currentContributionText={this.props.currentContributionText} 
					timesUp={this.props.timesUp} 
					contributions={this.props.contributions} 
					voteAction={this.props.voteAction}
					/>
				<ContributeForm 
					voteAction={this.props.voteAction}
					timesUp={this.props.timesUp} 
					index={this.props.contributions.models.length} 
					sketch={this.props.sketch} />
				<OKAlert alertStatus={this.props.alertStatus} />
			</div>
		)
	}
})


const ContributeForm = React.createClass({

	getInitialState: function() {
		return {
			alertStatus: null
		}
	},

	_contribute: function(e) {
		e.preventDefault()
		var data = {
			sketchId: this.props.sketch.get('_id'),
			text: e.target.text.value,
			index: this.props.index,
			author: e.target.author.value || 'anonipotamus'
		}
		if (this._validateSubmission(data)) {
			var votes = this._getVoteVal()
			// if there was an upvote or a downvote, update the sketch's vote total
			if (votes) ACTIONS.updateSketch(this.props.sketch,{votes: votes})
			ACTIONS.saveContribution(data)
		}
	},

	_getVoteVal: function() {
		var votes = this.props.sketch.get('votes')
		if (this.props.voteAction === 'upvote') votes += 1
		if (this.props.voteAction === 'downvote') votes -= 1
		return votes
	},

	_validateSubmission: function(data) {
		if (!this.props.voteAction) {
			console.log('no vote!')
			ACTIONS.alert('noVote')
			return false
		}
		else if (!data.text) {
			ACTIONS.alert('noText')
			return false
		}
		return true
	},
	
	 render: function() {
	 	// toggle alert box based on local state
	 	var alertStyle = {display: 'none'}
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
