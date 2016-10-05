import Backbone from 'backbone'
import {Sketches,Sketch,Contributions,Contribution} from './models/models'
import STORE from './store'


const ACTIONS = {
	alert: function(alertStatus) {
		STORE.set('alertStatus',alertStatus)
	},

	clearContributeStates: function() {
		STORE.set('voteAction','')
		STORE.set('timesUp',false)
		STORE.set('currentContributionText','')
	},

	clearTimer: function() {
		STORE.set('timesUp',false)
	},

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
		return c.save().then((resp) => {
			console.log(resp)
			this.fetchContributions({sketchId: contributionData.sketchId})
			this.alert('contributionMade')
		})
	},

	setContributionText: function(txt) {
		STORE.set('currentContributionText',txt)
	},

	setVote: function(voteAction) {
		STORE.set('voteAction', voteAction)
	},

	startSketch: function(sketchData) {
		var sk = new Sketch({
			title: sketchData.title,
			timerVal: sketchData.timerVal
		})
		return sk.save().then(function(resp){
			var co = new Contribution({
				sketchId: resp._id,
				text: sketchData.text,
				author: sketchData.author,
				index: 0
			})
			co.save().then((resp) => {
				this.alert('sketchCreated')
			})
		},
		function(err){
			console.log(err)
		})
	},

	timesUp: function() {
		this.alert('timesUp')
		STORE.set('timesUp',true)
	},

	unalert: function() {
		// change hash depending on the alert that was closed
		if (['sketchCreated','contributionMade'].contains(STORE.get('alertStatus'))) {
			setTimeout(()=>location.hash = "sketches",500)
		}
		this.alert(null)
	},

	updateSketch: function(sketch,data) {
		sketch.set(data)
		sketch.save().then(function() {
			STORE.emitChange()
		})
	}
}

export default ACTIONS