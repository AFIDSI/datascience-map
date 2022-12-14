/******************************************************************************\
|                                                                              |
|                        full-user-profile-form-view.js                        |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a form for editing information for people.               |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import FormView from '../../../../views/forms/form-view.js';
import TreeView from '../../../../views/items/trees/tree-view.js';
import '../../../../views/forms/validation/alphanumeric-rules.js';
import '../../../../views/forms/validation/authentication-rules.js';

export default FormView.extend({

	//
	// attributes
	//

	template: _.template(`

		<fieldset>
			<legend>Name</legend>

			<div class="form-group" id="title" style="display:none">
				<label class="control-label">Title</label>
				<div class="col-sm-6 col-xs-12">
					<div class="input-group">
						<select>
							<option value="">None</option>
							<option value="professor">Professor</option>
							<option value="associate professor">Associate Professor</option>
						</select>
					</div>
				</div>
			</div>

			<div class="form-group" id="first-name">
				<label class="required control-label">First name</label>
				<div class="col-sm-6 col-xs-12">
					<div class="input-group">
						<input type="text" class="required form-control" name="first-name" value="<%= first_name %>" />
						<div class="input-group-addon">
							<i class="active fa fa-question-circle" data-toggle="popover" data-placement="top" data-container="body" title="First name" data-content="This is the informal name or given name that you are called by."></i>
						</div>
					</div>
				</div>
			</div>

			<div class="form-group" id="middle-name">
				<label class="control-label">Middle name</label>
				<div class="col-sm-6 col-xs-12">
					<div class="input-group">
						<input type="text" class="form-control" name="middle-name" value="<%= middle_name %>" />
						<div class="input-group-addon">
							<i class="active fa fa-question-circle" data-toggle="popover" data-placement="top" data-container="body" title="Middle name" data-content="This is your middle name (or names)."></i>
						</div>
					</div>
				</div>
			</div>

			<div class="form-group" id="last-name">
				<label class="required control-label">Last name</label>
				<div class="col-sm-6 col-xs-12">
					<div class="input-group">
						<input type="text" class="required form-control" name="last-name" value="<%= last_name %>" />
						<div class="input-group-addon">
							<i class="active fa fa-question-circle" data-toggle="popover" data-placement="top" data-container="body" title="Last name" data-content="This is your family name or surname."></i>
						</div>
					</div>
				</div>
			</div>
		</fieldset>

		<fieldset>
			<legend>Research</legend>

			<div class="form-group" id="department">
				<label class="control-label">Department / Primary Affiliation</label>
				<div class="col-sm-6 col-xs-12">
					<div class="input-group">
						<select>
							<option value="">None</option>
							<% if (departments) { %>
							<% for (let i = 0; i < departments.length; i++) { %>
							<% let department = departments.at(i); %>
							<option value="<%= department.get('id') %>"><%= department.get('name').toTitleCase() %></option>
							<% } %>
							<% } %>
						</select>
					</div>
				</div>
			</div>

			<div class="form-group" id="appointment-type">
				<label class="control-label">Appointment Type</label>
				<div class="col-sm-6 col-xs-12">
					<div class="input-group">
						<select>
							<option value="">None</option>
							<% if (appointment_types) { %>
							<% for (let i = 0; i < appointment_types.length; i++) { %>
							<% let appointment_type = appointment_types[i]; %>
							<option value="<%= appointment_type.toLowerCase() %>"><%= appointment_type %></option>
							<% } %>
							<% } %>
						</select>
					</div>
				</div>
			</div>

			<div class="form-group" id="research-summary">
				<label class="control-label">Research Summary</label>
				<div class="col-sm-6 col-xs-12">
					<div class="input-group">
					<textarea rows="5"></textarea>
						<div class="input-group-addon">
							<i class="active fa fa-question-circle" data-toggle="popover" title="Research Summary" data-content="This is a summary of your research."></i>
						</div>	
					</div>
				</div>
			</div>

			<div class="form-group" id="data-science-interests">
				<label class="control-label">Your Attributes</label>
				<div class="checkboxes col-sm-6 col-xs-12">
					<p class="form-control-static">
						Please select the items that apply to you:
						<div class="terms-selector"></div>
					</p>
				</div>
			</div>

			<div class="form-group" id="research-interests">
				<label class="control-label">Other Attributes</label>
				<div class="col-sm-6 col-xs-12">
					<div class="input-group">
						<input type="text" class="form-control">
						<div class="input-group-addon">
							<i class="active fa fa-question-circle" data-toggle="popover" title="Other Interests" data-content="This is a comma separated list of items of interest to you."></i>
						</div>	
					</div>
				</div>
			</div>
		</div>

		<fieldset>
			<legend>Academic</legend>

			<div class="form-group" id="degree-institution-name">
				<label class="control-label">Degree Institution</label>
				<div class="col-sm-6 col-xs-12">
					<div class="input-group">
						<input type="text" class="form-control">
						<div class="input-group-addon">
							<i class="active fa fa-question-circle" data-toggle="popover" title="Degree Institution" data-content="This is the name of the institution that you graduated from."></i>
						</div>
					</div>
				</div>
			</div>

			<div class="form-group" id="degree-year">
				<label class="control-label">Degree Year</label>
				<div class="col-sm-6 col-xs-12">
					<div class="input-group">
						<input type="text" class="form-control">
						<div class="input-group-addon">
							<i class="active fa fa-question-circle" data-toggle="popover" title="Degree Year" data-content="This is the year that you graduated."></i>
						</div>
					</div>
				</div>
			</div>

			<div class="form-group" id="orcid-id">
				<label class="control-label">ORCID</label>
				<div class="col-sm-6 col-xs-12">
					<div class="input-group">
						<input type="text" class="form-control" name="orcid">
						<div class="input-group-addon">
							<i class="active fa fa-question-circle" data-toggle="popover" title="ORCID" data-content="This is your Open Researcher and Contributor ID."></i>
						</div>
					</div>
				</div>
			</div>
		</fieldset>

		<fieldset>
			<legend>Personal</legend>

			<div class="form-group" id="profile-photo">
				<label class="control-label">Profile Photo</label>
				<div class="col-sm-6 col-xs-12">
					<div class="input-group">
						<input type="file" id="file" class="form-control" style="display:none" />
						<button class="select-photo btn"><label for="file"><%= has_profile_photo? 'Change photo' : 'Select photo' %></label></button>
					</div>
				</div>
			</div>

			<div class="form-group" id="homepage">
				<label class="control-label">Homepage</label>
				<div class="col-sm-6 col-xs-12">
					<div class="input-group">
						<input type="text" class="form-control">
						<div class="input-group-addon">
							<i class="active fa fa-question-circle" data-toggle="popover" title="Homepage" data-content="This is the URL of your home page or personal website."></i>
						</div>	
					</div>
				</div>
			</div>

			<div class="form-group" id="social-url">
				<label class="control-label">Social URL</label>
				<div class="col-sm-6 col-xs-12">
					<div class="input-group">
						<input type="text" class="form-control">
						<div class="input-group-addon">
							<i class="active fa fa-question-circle" data-toggle="popover" title="Social URL" data-content="This is the URL of your social media page."></i>
						</div>	
					</div>
				</div>
			</div>

			<div class="form-group" id="github-url">
				<label class="control-label">GitHub URL</label>
				<div class="col-sm-6 col-xs-12">
					<div class="input-group">
						<input type="text" class="form-control">
						<div class="input-group-addon">
							<i class="active fa fa-question-circle" data-toggle="popover" title="GitHub URL" data-content="This is the URL of your GitHub / code sharing page."></i>
						</div>	
					</div>
				</div>
			</div>
		</div>

		<fieldset>
			<legend>Notifications</legend>

			<% let keys = Object.keys(defaults.options); %>
			<% for (let i = 0; i < keys.length; i++) { %>
			<% let key = keys[i]; %>
			<% let option = defaults.options[key]; %>
			<div class="form-group option" id="<%= key %>">
				<label class="control-label"><%= option.label %></label>
				<div class="col-sm-6 col-xs-12">
					<div class="checkbox">
						<label>
							<input type="checkbox" />
							<%= option.description %>
						</label>
					</div>
				</div>
			</div>
			<% } %>
		</fieldset>

		<br />

		<span class="required"></span>Fields are required.
	`),

	regions: {
		terms: '.terms-selector'
	},

	events: {
		'click #all input[type="checkbox"]': 'onClickAll',
		'click .topic input[type="checkbox"]': 'onClickTopic',
		'change input[type="file"]': 'onChangeFile',
		'click .change-photo': 'onChangePhoto'
	},

	rules: {
		'orcid': {
			isValidOrcid: true,
			required: false
		},
	},

	//
	// constructor
	//
	
	initialize: function() {
		this.terms = application.getCollection(defaults.terms);	

		// add custom form validation rules
		//
		this.addRules();
	},

	//
	// validating methods
	//

	addRules: function() {

		// add password validation rule
		//
		$.validator.addMethod("isValidOrcid", (value) => {
			return value == '' || value.length == 19 && /(\d{4}-){3}\d{3}(\d|X)/.test(value);
		}, "ORCIDs must be of the form: xxxx-xxxx-xxxx-xxxx.");
	},

	//
	// querying methods
	//

	hasProfilePhoto: function() {
		return this.$el.find('#profile-photo input').val() != '';
	},

	//
	// getting methods
	//

	getTerms: function() {
		return this.getChildView('terms').getValues();
	},

	getTermList: function(string) {
		return string.split(",").map(function(item) {
			return item.trim();
		});
	},

	getOptionKinds: function() {
		let kinds = [];
		let elements = this.$el.find('.option');
		for (let i = 0; i < elements.length; i++) {
			kinds.push($(elements[i]).attr('id'));
		}
		return kinds;
	},

	getOptions: function() {
		let kinds = this.getOptionKinds();
		let options = [];
		for (let i = 0; i < kinds.length; i++) {
			let kind = kinds[i];
			if (this.$el.find('#' + kind + ' input').is(':checked')) {
				options.push(kind);
			}	
		}
		return options;
	},

	getValue: function(key) {
		switch (key) {

			// name
			//
			case 'title':
				return this.$el.find('#title select').val();
			case 'first_name':
				return this.$el.find('#first-name input').val();
			case 'middle_name':
				return this.$el.find('#middle-name input').val();
			case 'last_name':
				return this.$el.find('#last-name input').val();

			// professional
			//
			case 'department':
				return this.$el.find('#department select').val();
			case 'appointment_type':
				return this.$el.find('#appointment-type select').val();

			// research
			//
			case 'research_summary':
				return this.$el.find('#research-summary textarea').val();
			case 'research_terms':
				return this.getTerms();
			case 'research_interests':
				return this.getTermList(this.$el.find('#research-interests input').val());

			// academic
			//
			case 'degree_institution_name':
				return this.$el.find('#degree-institution-name input').val();
			case 'degree_year':
				return this.$el.find('#degree-year input').val();
			case 'orcid_id':
				return this.$el.find('#orcid-id input').val();

			// personal
			//
			case 'profile_photo':
				return this.$el.find('#profile-photo input').val();
			case 'homepage':
				return this.$el.find('#homepage input').val();
			case 'social_url':
				return this.$el.find('#social-url input').val();
			case 'github_url':
				return this.$el.find('#github-url input').val();

			// options
			//
			case 'options':
				return this.getOptions();
		}
	},

	getValues: function() {
		return {

			// name
			//
			title: this.getValue('title'),
			first_name: this.getValue('first_name'),
			middle_name: this.getValue('middle_name'),
			last_name: this.getValue('last_name'),

			// professional
			//
			primary_unit_affiliation_id: this.getValue('department'),
			non_primary_unit_affiliation_ids: [this.getDepartmentId('Data Science')],
			appointment_type: this.getValue('appointment_type'),

			// research
			//
			research_summary: this.getValue('research_summary'),
			research_terms: this.getValue('research_terms'),
			research_interests: this.getValue('research_interests'),

			// academic
			//
			degree_institution_name: this.getValue('degree_institution_name'),
			degree_year: this.getValue('degree_year'),
			orcid_id: this.getValue('orcid_id'),

			// personal
			//
			homepage: this.getValue('homepage'),
			profile_photo: this.getValue('profile_photo'),
			social_url: this.getValue('social_url'),
			github_url: this.getValue('github_url'),

			// options
			//
			options: this.getValue('options')
		};
	},

	getDepartmentId: function(name) {
		let departments = this.options.departments;
		for (let i = 0; i < departments.length; i++) {
			let department = departments.at(i);
			if (department.get('base_name') == name) {
				return department.get('id');
			}
		}
	},

	//
	// form submitting methods
	//

	submit: function(options) {

		// check form validation
		//
		if (!this.check()) {
			return null;
		} else if (this.hasProfilePhoto()) {
			this.submitWithImages(options);
		} else {
			let values = this.getValues();
			values.profile_photo = this.$el.find('#profile-photo input')[0];

			// save model
			//
			this.model.save(this.getValues(), options);
			return this.model;
		}
	},

	submitWithImages: function(options) {
		let values = this.getValues();
		let input = this.$el.find('#profile-photo input')[0];
		let path = $(input).val();
		let fReader = new FileReader();
		fReader.readAsDataURL(input.files[0]);
		fReader.onloadend = (event) => {
			var filename = path.replace(/^.*[\\\/]/, '')

			// add photo data to values
			//
			values.profile_photo_name = filename;
			values.profile_photo = event.target.result;

			// save model
			//
			this.model.save(values, options);
			return this.model;
		}
	},

	//
	// setting methods
	//

	setOption: function(option, value) {
		this.$el.find('#' + option + ' input').prop('checked', value);
	},

	setOptions: function(options) {
		if (options) {
			for (let i = 0; i < options.length; i++) {
				this.setOption(options[i], true);
			}
		}
	},

	setValue: function(key, value) {
		switch (key) {

			// name
			//
			case 'title':
				this.$el.find('#title select').val(value? value.toLowerCase() : undefined);
				break;
			case 'first_name':
				this.$el.find('#first-name input').val(value);
				break;
			case 'middle_name':
				this.$el.find('#middle-name input').val(value);
				break;
			case 'last_name':
				this.$el.find('#last-name input').val(value);
				break;

			// professional
			//
			case 'department':
				this.$el.find('#department select').val(value);
				break;
			case 'appointment_type':
				this.$el.find('#appointment-type select').val(value);
				break;

			// research
			//	
			case 'research_summary':
				this.$el.find('#research-summary textarea').val(value);
				break;
			case 'research_terms':
				this.setTerms(value);
				break;
			case 'research_interests':
				this.$el.find('#research-interests input').val(value.join(', '));
				break;

			// academic
			//
			case 'degree_institution_name':
				this.$el.find('#degree-institution-name input').val(value);
				break;
			case 'degree_year':
				this.$el.find('#degree-year input').val(value);
				break;
			case 'orcid_id':
				this.$el.find('#orcid-id input').val(value);
				break;

			// personal
			//
			case 'homepage':
				this.$el.find('#homepage input').val(value);
				break;
			case 'social_url':
				this.$el.find('#social-url input').val(value);
				break;
			case 'github_url':
				this.$el.find('#github-url input').val(value);
				break;

			// options
			//
			case 'options':
				return this.setOptions(value);
		}
	},

	setValues: function(attributes) {
		let keys = Object.keys(attributes);
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i];
			let value = attributes[key];
			this.setValue(key, value);
		}
	},

	setTerms: function(terms) {
		this.getChildView('terms').setValues(terms);
	},

	//
	// rendering methods
	//

	templateContext: function() {
		return {
			has_profile_photo: this.model.get('has_profile_photo'),
			departments: this.options.departments,
			appointment_types: defaults.appointment_types,
			interests: defaults.interests
		}
	},

	onRender: function() {

		// call superclass method
		//
		FormView.prototype.onRender.call(this);

		// show child views
		//
		this.showChildView('terms', new TreeView({
			collection: this.terms,
			sortWithCollection: false,
			expanded: defaults.expanded
		}));
		this.$el.find('input[type="checkbox"]').prop('checked', false);

		// initialize form
		//
		this.setValues({

			// name
			//
			title: this.model.get('title'),
			first_name: this.model.get('first_name'),
			middle_name: this.model.get('middle_name'),
			last_name: this.model.get('last_name'),

			// professional
			//
			department: this.model.get('primary_unit_affiliation_id'),
			appointment_type: this.model.get('appointment_type'),

			// research
			//
			research_summary: this.model.get('research_summary'),
			research_terms: this.model.get('research_terms'),
			research_interests: this.model.get('research_interests'),

			// academic
			//
			degree_institution_name: this.model.get('degree_institution_name'),
			degree_year: this.model.get('degree_year'),
			orcid_id: this.model.get('orcid_id'),

			// personal
			//
			profile_photo: this.model.get('profile_photo'),
			homepage: this.model.get('homepage'),
			social_url: this.model.get('social_url'),
			github_url: this.model.get('github_url'),

			// options
			//
			options: this.model.get('options')
		});
	},

	//
	// mouse event handling methods
	//

	onClickAll: function(event) {
		if ($(event.target).is(':checked')) {
			this.$el.find('#research-interests input[type="checkbox"]').prop('checked', true);
		} else {
			this.$el.find('#research-interests input[type="checkbox"]').prop('checked', false);
		}
	},

	onChangeFile: function() {
		this.$el.find('input[type="file"]').show();
		this.$el.find('input[type="file"] + button').hide();
	},

	onClickChangePhoto: function() {
		this.$el.find('input[type="file"]').trigger('click');
	}
});