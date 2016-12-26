import Backbone from 'backbone'
import React from 'react'
import ACTIONS from '../actions'

const WriteForm = React.createClass({

	componentWillReceiveProps: function(props) {
		if (this.props.timesUp !== props.timesUp) { //if this is the first time the time has elapsed
			var txt = this._textarea ? this._textarea.value : this._backupTextarea.value
			if (props.timesUp) {
				ACTIONS.setContributionText(txt)
			}
		}
	},

	componentWillUnmount: function() {
		if (this._textarea) {
			this._backupTextarea = this._textarea
		}
	},

	 render: function() {
	 	var submittingStyle = {display: 'none'},
	 		contributeFieldStyle = {display: 'block'}
	 	if (this.props.timesUp) {
	 		submittingStyle.display = 'block'
	 		contributeFieldStyle = {display: 'none'}
	 	}
	 	return (
		    <div className="write-form">
			   <div style={contributeFieldStyle} className="form-field sm-12-x-12 md-12-x-12 lg-12-x-12">
			       <textarea ref={(txtarea)=>this._textarea = txtarea} name="text" rows="15"/>
			   </div>
			   <div style={submittingStyle} className="form-field">
			       <label>signed (optional)</label>
			       <input name="author" type="text"/>
			   </div>
			   <div style={submittingStyle} className="form-field">
			       <input type="submit" className="btn" />
			   </div>
			</div>
	 	)
 	}
})

export default WriteForm
