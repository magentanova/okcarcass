import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import ACTIONS from '../actions'

const OKAlert = React.createClass({

	_hideAlert: function() {
		ACTIONS.unalert()
		if (this.props.alertStatus === "noText") {
			location.hash = "sketches"
		}
	},

	render: function() {
		var opts = {display:'block',title:'no title'}
		switch (this.props.alertStatus) {
			case 'timesUp':
				opts.title = "time's up!"
				opts.content = "let it go, my man or lady. it's time to sign your \
					contribution if you'd like. you can also cast your vote (eventually) \
					on the sketch as a whole."
				break
			case 'sketchCreated':
				opts.title = "sketch done!"
				opts.content = "a sketch has created and it worse drid by you! how \
					sabout it? now another can make more..."
				break
			case 'contributionMade':
				opts.title = "you did something!"
				opts.content = "a thing has been done and you did it! you could have \
					done nothing but you didn't, so give yourself a nice rub. then do another!"
				break
			case 'noVote':
				opts.title = "it's your civic duty!"
				opts.content = "you must either upvote, downvote, or abstain."
				break
			case 'noText':
				opts.title = "your contribution sucks"
				opts.content = "you're trying to contribute an empty string. \
				we're sending you back to the main menu to think about what you've done."
				break
			default: 
				opts.display = 'none'
			}

	 	return (
	 		<div style={{display:opts.display}}>
		 		<SweetAlert 
		 			title={opts.title} 
		 			content={opts.content}
		 			type="custom"
		 			confirmBtnBsStyle="primary"
		 			cancelBtnBsStyle="default"
		 			customIcon="/images/wen2.png" 
		 			onConfirm={this._hideAlert}
		 			/>
		 	</div>
	 	)
 	}
})

export default OKAlert
