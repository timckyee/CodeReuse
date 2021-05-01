/**
 * Class for User object
 * @class
 **/
 CodeReuse.User = function() {

 }

 CodeReuse.User.prototype = {
			
	/**
	 * Store the User Id
	 * @var {Array} userId
	 **/	
	userId: [],

	getUserId: function() {

		return this.userId[0];

	},

	setUserId: function(userId) {

		this.userId[0] = userId;

	}

 }