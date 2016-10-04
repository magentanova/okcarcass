import Backbone from 'backbone'
import React from 'react'
import ACTIONS from '../actions'

const WriteForm = React.createClass({

	componentWillMount: function() {
		Backbone.Events.on('timesUp',()=>ACTIONS.setContributionText(this.refs.writings.value))
	},

	 render: function() {
	 	var submittingStyle = {'display': 'none'},
	 		contributeFieldStyle = {display: 'block'}
	 	if (this.props.timesUp) {
	 		submittingStyle.display = 'block'
	 		contributeFieldStyle = {display: 'none'}
	 	}
	 	return (
		    <div className="write-form">
			   <div style={contributeFieldStyle} className="form-field sm-12-x-12 md-12-x-12 lg-12-x-12">
			       <label>your contribution</label>
			       <textarea ref="writings" name="text" rows="15"/>
			   </div>
			   <br/>
			   <div style={submittingStyle} className="form-field">
			       <label>signed (optional)</label>
			       <input name="author" type="text"/>
			   </div>
			   <br/>
			   <div style={submittingStyle} className="form-field">
			       <input type="submit" className="btn" />
			   </div>
			</div>
	 	)
 	}
})

export default WriteForm
