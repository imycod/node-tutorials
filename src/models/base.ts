// @ts-nocheck
// const mongoose = require('mongoose');
// const util = require('util');
// const Bluebird = require('bluebird');
import mongoose, {Schema, Document} from 'mongoose';
// import {Promise} from 'bluebird';
const Bluebird = require('bluebird');
import util from 'util';

mongoose.Promise = Bluebird
Bluebird.promisifyAll(mongoose);

// const Schema = mongoose.Schema;

// interface IBaseSchema extends Document {
// 	createdBy: string;
// 	createdAt: Date;
// 	updatedBy: string;
// 	updatedAt: Date;
// }

function BaseSchema() {
	Schema.apply(this, arguments);

	this.add({
		createdBy: {type: String, default: 'admin'},
		createdAt: {type: Date, required: true, default: Date.now()},
		updatedBy: {type: String, default: 'admin'},
		updatedAt: {type: Date, required: true, default: Date.now()}
	});
}

// class BaseSchema extends Schema {
// 	constructor() {
// 		super();
//
// 		this.add({
// 			createdBy: {type: String, default: 'admin'},
// 			createdAt: {type: Date, required: true, default: Date.now},
// 			updatedBy: {type: String, default: 'admin'},
// 			updatedAt: {type: Date, required: true, default: Date.now}
// 		});
// 	}
// }

util.inherits(BaseSchema, Schema);

// module.exports = mongoose;
// module.exports.BaseSchema = BaseSchema;

export default mongoose;
export {BaseSchema};