import Backbone from 'backbone'
import _ from 'underscore'
import {Sketches,Sketch,Contributions,Contribution} from './models/models'

const STORE = _.extend({},Backbone.Events,{
	data: {
		alertStatus: '',
		sketches: new Sketches(),
		sketch: new Sketch(),
		contributions: new Contributions(),
		timesUp: false,
		currentContributionText: '',
		voteAction: ''
	},

	data_defaults: {
		alertStatus: '',
		sketches: new Sketches(),
		sketch: new Sketch(),
		contributions: new Contributions(),
		timesUp: false,
		currentContributionText: '',
		voteAction: ''
	},

	emitChange: function() {
		this.trigger('update')
	},

	initialize: function() {
		this.get('sketches').on('sync update',this.emitChange.bind(this))
		this.get('contributions').on('sync update',this.emitChange.bind(this))
	},

	get: function(prop) {
		return this.data[prop]
	},

	getData: function() {
		return _.clone(this.data)
	},

	reset: function() {
		for (var prop in this.data) {
			this.data[prop] = this.data_defaults[prop]
		}
		this.emitChange()
	},

	set: function(key,val) {
		if (typeof key === 'object') {
			let settingsObj = key
			for (var prop in settingsObj) {
				this.data[prop] = settingsObj[prop]
			}
		}
		else {
			this.data[key] = val
		}
		this.emitChange()
	}
})

STORE.initialize()

export default STORE	