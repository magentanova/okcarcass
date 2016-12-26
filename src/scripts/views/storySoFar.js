import React from 'react'
import ACTIONS from '../actions'
import {randRange,rainbowColor} from '../utils'

const StorySoFar = React.createClass({

	 _addContribution: function(snowball,model) {
	 	return snowball.concat([<Contribution key={model.cid} model={model} />])
	 },

	 render: function() {
	 	return (
	 		<div className='story-so-far' >
	 			<h4>the story so far</h4>
	 			<p>
		 			{this.props.contributions.reduce(this._addContribution,[])}
		 			{this.props.timesUp ? <strong> {this.props.currentContributionText}</strong> : ''}
	 			</p>
	 			<VoteButtons 
	 				contributeView={this.props.contributeView /*only show on contribute view, not create sketch */} 
	 				timesUp={this.props.timesUp} 
	 				voteAction={this.props.voteAction} />
	 		</div>
	 	)
 	}
})


const VoteButtons = React.createClass({

	_vote: function(e) {
		ACTIONS.setVote(e.target.title)
	},

	render: function() {
		var styleObj = {visibility: this.props.timesUp && this.props.contributeView ? 'visible': 'hidden'}
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
	 			{' ' + this.props.model.get('text')} 
	 			<span style={styleObj} className="attribution">{this.props.model.get('author')}</span>
	 		</span>
	 		)
	 }
})


export default StorySoFar