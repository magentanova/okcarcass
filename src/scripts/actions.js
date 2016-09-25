import {Sketches,Sketch,Contributions,Contribution} from './models/models'
import STORE from './store'
const ACTIONS = {

	deleteSketch: function(sketchId) {
		STORE.get('sketches').get(sketchId).destroy().then(
			function() {
				STORE.emitChange()
			})
	},

	fetchContributions: function(opts) {
		let cs = new Contributions()
		return cs.fetch({
			data: opts
		}).then(()=>STORE.set('contributions',cs))
	},

	fetchSketchById: function(sketchId) {
		let s = new Sketch({_id:sketchId})
		return s.fetch().then(()=>STORE.set('sketch',s))
	},

	fetchSketches: function(opts) {
		let sketches = new Sketches()
		return sketches.fetch({
			data: opts
		}).then(function(resp) {
			STORE.set('sketches',sketches)
		})
	},

	saveContribution: function(contributionData) {
		var c = new Contribution(contributionData)
		return c.save().then(function(resp) {
			console.log(resp)
			ACTIONS.fetchContributions({sketchId: contributionData.sketchId})
			alert('contribution saved!')
			location.hash = "sketches"
		})
	},

	startSketch: function(sketchData) {
		var sk = new Sketch({
			title: sketchData.title,
			timerVal: sketchData.timerVal
		})
		return sk.save().then(function(resp){
			console.log(resp)
			var co = new Contribution({
				sketchId: resp._id,
				text: sketchData.text,
				author: sketchData.author,
				index: 0
			})
			co.save().then(function(resp) {
				console.log(resp)
			})
		},
		function(err){
			console.log(err)
		})
	},

	clearTimer: function() {
		STORE.set('timesUp',false)
	},

	timesUp: function() {
		STORE.set('timesUp',true)
	}
}

export default ACTIONS