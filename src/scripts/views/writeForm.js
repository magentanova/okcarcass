import React from 'react'
import ACTIONS from '../actions'

const WriteForm = React.createClass({

	_contribute: function(e) {
		var data = {
			sketchId: this.props.sketchId,
			text: e.target.text.value,
			index: this.props.index,
			author: e.target.author.value
		}
		ACTIONS.saveContribution(data)
	},

	 render: function() {
	 	var styleObj = {'display': 'none'},
	 		val = undefined
	 	if (this.props.timesUp) {
	 		styleObj.display = 'block'
	 		val = this.refs.writings.value
	 	}
	 	return (
		    <div className="write-form">
			   <div className="form-field sm-12-x-12 md-12-x-12 lg-12-x-12">
			       <label>your contribution</label>
			       <textarea value={val} ref="writings" name="text" rows="15"/>
			   </div>
			   <br/>
			   <div style={styleObj} className="form-field">
			       <label>signed (optional)</label>
			       <input name="author" type="text"/>
			   </div>
			   <br/>
			   <div style={styleObj} className="form-field">
			       <input type="submit" className="btn" />
			   </div>
			</div>
	 	)
 	}
})

export default WriteForm
