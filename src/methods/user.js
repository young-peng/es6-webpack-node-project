'use strict';
import validator from "validator";

module.exports = function (done) {
	$.method("user.add").check({
		name : {required:true,validate : (v) => validator.isLength(v,{min:4,max:20})&&/^[a-zA-Z]/.test(v)},
		email : {required:true,validate : (v) => validator.isEmail(v)},
		password: {require:true,validator:(v) => validator.isLength(v,{min:6})}
	})
	$.method("user.add").register(async function(params) {
		params.name = params.name.toLowerCase();
		// callback(params)
		{
			const user = await $.method("user.get").call({name:params.name});
			if(user) throw new Error(`user ${params.name} already exists`);
		}
		{
			const user = await $.method("user.get").call({email:params.email});
			if(user) throw new Error(`user ${params.email} already exists`);
		}
		params.password = $.utils.encryptPassword(params.password.toString());

		const user = $.model.User({
			name:params.name,
			nickname:params.nickname,
			email:params.email,
			about:params.about,
			password:params.password
		});
		return user.save();
	});
	$.method("user.get").check({
		_id : {validate : (v) => validator.isMongoId(String(v))},
		name : {validate : (v) => validator.isLength(v,{min:4,max:20})&&/^[a-zA-Z]/.test(v)},
		email : {validate : (v) => validator.isEmail(v)}
	});
	$.method("user.get").register(async function (params){
		const query = {};
		if(params._id) {
			query._id = params._id
		}else if(params.name){
			query.name = params.name;	
		} else if(params.email) {
			query.email = params.email
		}else if(params.githubUsername) {
			query.githubUsername = params.githubUsername;
		} else {
			throw new Error("missing parameter _id||name||email");
		}

		return $.model.User.findOne(query);
	})

	$.method("user.update").check({
		_id : {validate : (v) => validator.isMongoId(String(v))},
		name : {validate : (v) => validator.isLength(v,{min:4,max:20})&&/^[a-zA-Z]/.test(v)},
		email : {validate : (v) => validator.isEmail(v)}
	});

	//用户信息修改
	$.method("user.update").register(async function (params){
		const update = {};
		const user = await $.method("user.get").call(params);
		// console.log("用户",user)
		if(!user){
			throw new Error("user does not exists ");
		}

		if(params.name && user.name !== params.name) update.name = params.name;
		if(params.email && user.email!== params.email) update.email= params.email;
		if (params.githubUsername) update.githubUsername = params.githubUsername;
		if(params.password && user.password !== params.password) update.password = $.utils.encryptPassword(params.password);
		if(params.nickname && user.nickname !== params.nickname) update.nickname = params.nickname;
		if(params.about && user.about !== params.about) update.about = params.about;
		return $.model.User.update({_id:user._id},{$set:update});
	});

	$.method("user.incrScore").check({
		_id : {validate : (v) => validator.isMongoId(String(v))},
		score:{validate:(v)=>!isNaN(v),required:true}
	});

	//用户积分
	$.method("user.incrScore").register(async function (params){
		return $.model.User.update({_id:params._id},{$inc:{score:params.score}});
	});
	done();
};