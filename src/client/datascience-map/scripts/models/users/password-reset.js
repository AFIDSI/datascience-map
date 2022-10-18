/******************************************************************************\
|                                                                              |
|                                password-reset.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of password reset event.                         |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Timestamped from '../../models/utilities/timestamped.js';

export default Timestamped.extend({

	//
	// Backbone attributes
	//

	urlRoot: config.servers.authentication + '/password-resets',

	//
	// ajax methods
	//

	reset: function(password, options) {
		$.ajax(_.extend({
			url: this.urlRoot + '/' + this.get('id') + '/reset',
			type: 'PUT',
			data: {
				'password': password,
				'password_reset_key': this.get('password_reset_key')
			}
		}, options));
	}
});
