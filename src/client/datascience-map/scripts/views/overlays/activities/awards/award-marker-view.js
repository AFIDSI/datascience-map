/******************************************************************************\
|                                                                              |
|                            award-marker-view.js                             |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a view of a selectable, unscaled marker element.         |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Vector2 from '../../../../utilities/math/vector2.js';
import ActivityMarkerView from '../activity-marker-view.js';

export default ActivityMarkerView.extend({

	//
	// attributes
	//

	d: 'M24 3c-.372 4.105-2.808 8.091-6.873 9.438.297-.552.596-1.145.882-1.783 2.915-1.521 4.037-4.25 4.464-6.251h-2.688c.059-.45.103-.922.139-1.405h4.076zm-24 0c.372 4.105 2.808 8.091 6.873 9.438-.297-.552-.596-1.145-.882-1.783-2.915-1.521-4.037-4.25-4.464-6.251h2.688c-.058-.449-.102-.922-.138-1.404h-4.077zm19-2c0 9.803-5.094 13.053-5.592 17h-2.805c-.498-3.947-5.603-7.197-5.603-17h14zm-7.305 13.053c-1.886-3.26-2.635-7.432-2.646-11.053h-1.699c.205 4.648 1.99 8.333 4.345 11.053zm1.743 4.947h-2.866c-.202 1.187-.63 2.619-2.571 2.619v1.381h8v-1.381c-1.999 0-2.371-1.432-2.563-2.619z',
	offset: new Vector2(-12, -10),

	//
	// popover attributes
	//

	popover_type: 'award',
	popover_icon: 'fa fa-trophy',
	popover_title: 'Award',
	popover_template: 
		`<div class="award">
			<div class="info">
				<% if (name) { %>
				<div class="name">
					<label>Name</label>
					<%= name %>
				</div>
				<% } %>

				<% if (organization) { %>
				<div class="organization">
					<label>Organization</label>
					<%= organization %>
				</div>
				<% } %>

				<% if (date && !isNaN(date)) { %>
				<div class="date">
					<label>Date</label>
					<%= date.format('shortDate') %>
				</div>
				<% } %>
			</div>
		</div>`,

	//
	// constructor
	//

	initialize: function(options) {

		// call superclass constructor
		//
		ActivityMarkerView.prototype.initialize.call(this, options);

		// set attributes
		//
		this.tooltip_title = this.model.get('name');
	}
});