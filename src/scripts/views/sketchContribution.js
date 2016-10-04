import React from 'react'
import ACTIONS from '../actions'
import {rainbowColor, randRange} from '../utils'
import Timer from './timer'
import WriteForm from './writeForm'
import OKAlert from './OKAlert'


const SketchContribution = React.createClass({

	componentWillMount: function() {
		ACTIONS.clearContributeStates()
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
				<StorySoFar 
					currentContributionText={this.props.currentContributionText} 
					timesUp={this.props.timesUp} 
					contributions={this.props.contributions} 
					voteAction={this.props.voteAction}
					/>
				<ContributeForm 
					timesUp={this.props.timesUp} 
					index={this.props.contributions.models.length} 
					sketch={this.props.sketch} />
				<OKAlert alertStatus={this.props.alertStatus} />
			</div>
		)
	}
})


const StorySoFar = React.createClass({

	 _addContribution: function(snowball,model) {
	 	return snowball.concat([<Contribution key={model.cid} model={model} />])
	 },

	 render: function() {
	 	return (
	 		<div className='story-so-far' >
	 			<p>
		 			{this.props.contributions.reduce(this._addContribution,[])}
		 			{this.props.timesUp ? <strong> {this.props.currentContributionText}</strong> : ''}
	 			</p>
	 			<VoteButtons timesUp={this.props.timesUp} voteAction={this.props.voteAction} />
	 		</div>
	 	)
 	}
})

const VoteButtons = React.createClass({

	_vote: function(e) {
		ACTIONS.setVote(e.target.title)
	},

	render: function() {
		var styleObj = {visibility: this.props.timesUp ? 'visible': 'hidden'}
		return (
 			<div style={styleObj} onClick={this._vote} className={'vote-buttons ' + this.props.voteAction}>
 				<i title="upvote" className="fa fa-arrow-up upvote" aria-hidden="true"></i>
 				<i title="abstain" className="fa fa-circle abstain" aria-hidden="true"></i>
				<i title="downvote" className="fa fa-arrow-down downvote" aria-hidden="true"></i>
 			</div>
			)
	}
})

const Contribution = React.createClass({

	randomSeed: randRange(0,10),

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
	 		<span 
	 			onMouseEnter={this._showAuthor} 
	 			onMouseMove={this._showAuthor} 
	 			onMouseLeave={this._hideAuthor} 
	 			className="contribution" 
	 			style={{color: rainbowColor(this.props.model.get('index'),.6,this.randomSeed)}}
	 			> 
	 			{this.props.model.get('text')} 
	 			<span style={styleObj} className="attribution">{this.props.model.get('author')}</span>
	 		</span>
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
		if (!this._validateSubmission(data)) {
			console.log(this._getVoteVal())
			ACTIONS.saveContribution(data)
		}
	},

	_getVoteVal: function() {
		var votes = this.props.sketch.get('votes')
		console.log(this.props.voteAction)
		if (this.props.voteAction === 'upvote') votes += 1
		if (this.props.voteAction === 'downvote') votes -= 1
		return votes
	},

	_validateSubmission: function(data) {
		if (!this.props.voteAction) {
			this.setState({
				alertStatus: 'noVote'
			})
			return false
		}
		else if (!data.text) {
			this.setState({
				alertStatus: 'noText'
			})
			return false
		}
		return true
	},
	
	 render: function() {
	 	// toggle alert box based on local state
	 	var alertStyle = {display: 'none'}
	 	if (this.state.alertStatus) alertStyle.display = 'block'
	 	return (
	 		<div className='contribute-form' >
	 			<form onSubmit={this._contribute} className="form-group grid-container">
	 				<WriteForm timesUp={this.props.timesUp} />
	 				<OKAlert style={alertStyle} alertStatus={this.state.alertStatus} />
	 			</form>
	 		</div>
	 	)
 	}
})



export default SketchContribution
