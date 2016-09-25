import Backbone from 'backbone'
import _ from 'underscore'
import {Sketches,Sketch,Contributions,Contribution} from './models/models'

const STORE = _.extend({},Backbone.Events,{
	data: {
		alertStatus: null,
		sketches: new Sketches(),
		sketch: new Sketch(),
		contributions: new Contributions(),
		timesUp: false
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

	set: function(key,val) {
		this.data[key] = val
		this.emitChange()
	}
})

STORE.initialize()

export default STORE	