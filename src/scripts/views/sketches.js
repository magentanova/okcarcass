import React from 'react'

const TIMES = ['30\nsecs','2\nmins','5\nmins','10\nmins','20\nmins','all']
const Sketches = React.createClass({
	 render: function() {
	 	return (
	 		<div className='sketches'>
		 		<div className='container grid-container' >
		 			{TIMES.map((time,i)=><TimeSketch key={i} time={time}/>)}
		 		</div>
	 		</div>
	 	)
 	}
})
const TimeSketch = React.createClass({
	render: function() {
		return (
			<a className="timer-item"
			   href={`#timedSketches/${this.props.time.replace(/\n/g,'_')}`} >
				<p>{this.props.time}</p>
			</a>
			)
	}
})

export default Sketches
