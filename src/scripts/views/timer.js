import React from 'react'
import ACTIONS from '../actions'

const Timer = React.createClass({
	totalTime: 1,
	initialTime: new Date(),

	getInitialState: function() {
		return {
			elapsedTime: 0
		}
	},

	componentWillMount: function() {
		this.mounted = true

		ACTIONS.clearTimer()

		var timeUnits = this.props.timerVal.split('_')[1],
			timeVal = this.props.timerVal.split('_')[0]
		if (timeUnits === 'mins') {
			timeVal = timeVal * 60
		}
		this.totalTime = 3 * 1000
		this.initialTime = new Date()

		var updateBar = () => {
			var elapsedTime = new Date() - this.initialTime
			this.setState({
				elapsedTime: elapsedTime
			})	
			if (!this.mounted) return
			else if (elapsedTime <= this.totalTime + 1000) {
				setTimeout(updateBar,1000)
			}
			else {
				ACTIONS.timesUp()
				this.setState({
					elapsedTime: 0
				})
			}
		}
		setTimeout(updateBar,1000)
	},

	componentWillUnmount: function() {
		this.mounted = false
		this.setState({
			elapsedTime: 0
		})
	},

	 render: function() {
	 	var percentageWidth = this.state.elapsedTime / this.totalTime
	 	return (
	 		<div className="timer" >
				<h3 className="timer-heading">{this.props.timerVal.replace('_',' ')}</h3>
	 			<div className="total-time">
		 			<div style={{width: percentageWidth * 100 + '%'}} className="elapsed-time"></div>
	 			</div>
	 		</div>
	 	)
 	}
})

export default Timer
