import React from 'react'
import ACTIONS from '../actions'
import OKAlert from './OKAlert'
import Timer from './timer'
import WriteForm from './writeForm'
import StorySoFar from './storySoFar'

const SketchCreator = React.createClass({
	 render: function() {
	 	return (
	 		<div className="sketch-creator" >
	 			<Timer test={this.props.test} timerVal={this.props.timerVal} />
	 			<StorySoFar 
	 				currentContributionText={this.props.currentContributionText} 
	 				timesUp={this.props.timesUp} 
	 				contributions={this.props.contributions} 
	 				voteAction={this.props.voteAction}
	 				/>
	 			<SketchCreatorForm timesUp={this.props.timesUp} timerVal={this.props.timerVal}/>
	 			<OKAlert alertStatus={this.props.alertStatus} />
	 		</div>
	 	)
 	}
})

const SketchCreatorForm = React.createClass({

	 _createSketch: function(e) {
	 	e.preventDefault()
	 	var sketchData = {
	 		signed: e.target.author.value,
	 		text: e.target.text.value,
	 		title: e.target.title.value ? e.target.title.value : e.target.text.value.split(' ').slice(0,5).join(' '),
	 		timerVal: this.props.timerVal	
	 	}
	 	if (this._validateSubmission(sketchData)) {
	 		ACTIONS.startSketch(sketchData)
	 	}
	 },

	 _validateSubmission: function(data) {
	 	if (!data.text) {
	 		ACTIONS.alert('noText')
	 		return false
	 	}
	 	return true
	 },

	 render: function() {
	 	return (
	 		<div className='sketch-creator-form' >
	 			<form onSubmit={this._createSketch} className="form-group grid-container">
	 			   <div className="form-field">
	 			       <label>title (optional)</label>
	 			       <input name="title" type="text"/>
	 			   </div>
	 			   <br/>
	 			   <WriteForm timesUp={this.props.timesUp} />
	 			</form>
	 		</div>
	 	)
 	}
})


export default SketchCreator
