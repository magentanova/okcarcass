import React from 'react'
import ACTIONS from '../actions'
import OKAlert from './OKAlert'
import Timer from './timer'
import WriteForm from './writeForm'


const SketchCreator = React.createClass({
	 render: function() {
	 	return (
	 		<div className="sketch-creator" >
	 			<Timer timerVal={this.props.timerVal} />
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
	 	console.log(this.props.timerVal)
	 	ACTIONS.startSketch(sketchData)
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
