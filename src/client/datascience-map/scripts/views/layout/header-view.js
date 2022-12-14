/******************************************************************************\
|                                                                              |
|                                 header-view.js                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines the application header and associated content.           |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import BaseView from '../../views/base-view.js';

export default BaseView.extend({

	//
	// attributes
	//

	template: _.template(`
		<div class="navbar navbar-default navbar-fixed-top navbar-inverse">
			<div class="container">

				<a id="brand" class="active navbar-brand">
					<img class="logo" src="images/uw-crest.png" />
					<%= defaults.application.heading %>
				</a>

				<ul class="nav navbar-nav hidden-xs">
					<li<% if (nav == 'about') {%> class="active" <% } %>><a id="about"><i class="fa fa-info-circle"></i>About</a></li>
					<li<% if (nav == 'help') {%> class="active" <% } %>><a id="help"><i class="fa fa-question-circle"></i>Help</a></li>
					<li<% if (nav == 'contact') {%> class="active" <% } %>><a id="contact"><i class="fa fa-envelope"></i>Contact</a></li>
				</ul>
	
				<ul class="nav navbar-nav navbar-right">
					<% if (user) { %>
					<li <% if (nav == 'home') {%> class="active" <% } %>><a id="home"><i class="fa fa-user"></i><%= user.get('username') %></a></li>
					<button id="sign-out" class="btn btn-primary"><i class="fa fa-sign-out-alt"></i>Sign Out</button>	
					<% } else { %>
					<button id="sign-in" class="btn btn-primary"><i class="fa fa-sign-in-alt"></i>Sign In</button>
					<button id="sign-up" class="btn"><i class="fa fa-pencil"></i>Sign Up</button>
					<% } %>
				</ul>
			</div>
		</div>
	`),

	events: {
		'click #brand': 'onClickBrand',
		'click #about': 'onClickAbout',
		'click #contact': 'onClickContact',
		'click #help': 'onClickHelp',
		'click #home': 'onClickHome',
		'click #sign-in': 'onClickSignIn',
		'click #sign-up': 'onClickSignUp',
		'click #sign-out': 'onClickSignOut'
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			nav: this.options.nav,
			user: application.session.user
		};
	},

	//
	// event handling methods
	//

	onClickBrand: function() {

		// go to welcome view
		//
		Backbone.history.navigate('#', {
			trigger: true
		});
	},

	onClickAbout: function() {
		Backbone.history.navigate('#about', {
			trigger: true
		});
	},

	onClickContact: function() {
		Backbone.history.navigate('#contact', {
			trigger: true
		});
	},

	onClickHelp: function() {
		Backbone.history.navigate('#help', {
			trigger: true
		});
	},

	onClickHome: function() {
		Backbone.history.navigate('#home', {
			trigger: true
		});
	},

	onClickSignIn: function() {
		import(
			'../../views/users/authentication/dialogs/sign-in-dialog-view.js'
		).then((SignInDialogView) => {

			// show sign in dialog
			//
			application.show(new SignInDialogView.default());
		});
	},

	onClickSignUp: function() {
		Backbone.history.navigate('#register', {
			trigger: true
		});
	},

	onClickSignOut: function() {
		application.logout();
	}
});
