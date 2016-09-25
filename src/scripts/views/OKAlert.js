import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import ACTIONS from '../actions'

const OKAlert = React.createClass({

	_hideAlert: function() {
		ACTIONS.unalert()
	},

	render: function() {
		var opts = {display:'block',title:'no title'}

		if (this.props.alertStatus === 'timesUp') {
			opts.title = "time's up!"
			opts.content = "let it go, my man or lady. it's time to sign your \
				contribution if you'd like. you can also cast your vote (eventually) \
				on the sketch as a whole."
		}
		else if (this.props.alertStatus === 'sketchCreated') {
			opts.title = "sketch done!"
			opts.content = "a sketch has created and it worse drid by you! how \
				sabout it? now another can make more..."
		}
		else if (this.props.alertStatus === 'contributionMade') {
			opts.title = "you did something!"
			opts.content = "a thing has been done and you did it! you could have \
				done nothing but you didn't, so give yourself a nice rub. then do another!"
		}
		else {
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
