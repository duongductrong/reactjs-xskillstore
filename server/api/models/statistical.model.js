const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const schema = new Schema({
	created_at: {
		type: Date,
		default: Date.now,
	},

	date_at: {
		type: String,
		default: '',
	},

	orders_placed: {
		type: Array,
		default: [],
	},

	sold_orders: {
		type: Array,
		default: [],
	},

	cancel_orders: {
		type: Array,
		default: [],
	},

	views: {
		type: Number,
		default: 0,
	},
});

const _model = model('statistical', schema);

module.exports = _model;
