/******************************************************************************\
|                                                                              |
|                              academic-person.js                              |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of an academic person.                           |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import '../../utilities/scripting/string-utils.js';

// models
//
import Person from '../person.js';
import Article from './activities/academic-article.js';
import Award from './activities/academic-award.js';
import BookChapter from './activities/academic-book-chapter.js';
import Book from './activities/academic-book.js';
import ConferenceProceeding from './activities/academic-conference-proceeding.js';
import Grant from './activities/academic-grant.js';
import Patent from './activities/academic-patent.js';
import Technology from './activities/academic-technology.js';

// collections
//
import Articles from '../../collections/academic/activities/academic-articles.js';
import Awards from '../../collections/academic/activities/academic-awards.js';
import BookChapters from '../../collections/academic/activities/academic-book-chapters.js';
import Books from '../../collections/academic/activities/academic-books.js';
import ConferenceProceedings from '../../collections/academic/activities/academic-conference-proceedings.js';
import Grants from '../../collections/academic/activities/academic-grants.js';
import Patents from '../../collections/academic/activities/academic-patents.js';
import Technologies from '../../collections/academic/activities/academic-technologies.js';
import Collaborators from '../../collections/academic/academic-collaborators.js';

export default Person.extend({

	//
	// ajax attributes
	//

	urlRoot: config.servers.academic + '/people',

	//
	// ajax methods
	//

	fetchCollaborators(options) {
		new Collaborators().fetchByPerson(this, options);
	},

	//
	// getting methods
	//

	getArticles: function() {
		return new Articles();
	},

	getAwards: function() {
		return new Awards();
	},

	getBookChapters: function() {
		return new BookChapters();
	},

	getBooks: function() {
		return new Books();
	},

	getConferenceProceedings: function() {
		return new ConferenceProceedings();
	},

	getGrants: function() {
		return new Grants();
	},

	getPatents: function() {
		return new Patents();
	},

	getTechnologies: function() {
		return new Technologies();
	},

	//
	// parsing methods
	//

	parsePrimaryAffiliation(response) {
		if (response.unitName) {
			return response.unitName;
		}
		if (response.primaryUnitAffiliation) {
			return response.primaryUnitAffiliation.baseName;
		}
	},

	parseAffiliations(response) {
		let affiliations = [];
		if (response.nonPrimaryUnitAffiliations) {
			for (let i = 0; i < response.nonPrimaryUnitAffiliations.length; i++) {
				affiliations.push(response.nonPrimaryUnitAffiliations[i].baseName);
			}
		}
		return affiliations;
	},

	parseItems: function(data, ItemClass) {
		if (data) {
			let items = [];
			if (data) {
				for (let i = 0; i < data.length; i++) {
					items.push(new ItemClass(data[i], {
						person: this,
						parse: true
					}));
				}
			}
			return items;
		}
	},

	parse: function(response) {
		return {
			id: response.id,
			source: 'academic_analytics',
			email: undefined,

			// name info
			//
			title: response.title? response.title.toTitleCase() : undefined,
			first_name: response.firstName? response.firstName.toTitleCase() : undefined,
			last_name: response.lastName? response.lastName.toTitleCase() : undefined,
			middle_name: response.middleName? response.middleName.toTitleCase() : undefined,

			// professional info
			//
			primary_affiliation: this.parsePrimaryAffiliation(response),
			affiliations: this.parseAffiliations(response),
			appointment_type: response.appointmentType,

			// research info
			//
			research_summary: response.researchSummary,
			research_interests: response.researchInterests,
			research_tools: response.researchTools,
			research_terms: response.researchTerms,

			// academic info
			//
			degree_institution: response.degreeInstitutionName,
			degree_year: response.degreeYear,
			orcid_id: response.orcidId,

			// personal info
			//
			has_profile_photo: response.hasProfilePhoto,
			homepage: response.homepage,
			social_url: response.socialUrl,
			github_url: response.githubUrl,

			// activity info
			//
			articles: this.parseItems(response.articles, Article),
			awards: this.parseItems(response.awards, Award),
			books: this.parseItems(response.books, Book),
			book_chapters: this.parseItems(response.bookChapters, BookChapter),
			conference_proceedings: this.parseItems(response.conferenceProceedings, ConferenceProceeding),
			grants: this.parseItems(response.grants, Grant),
			patents: this.parseItems(response.patents, Patent),
			technologies: this.parseItems(response.technologies, Technology),

			// activity counts
			//
			num_collaborators: response.numCollaborators,
			num_articles: response.numArticles,
			num_awards: response.numAwards,
			num_books: response.numBooks,
			num_book_chapters: response.numBookChapters,
			num_conference_proceedings: response.numConferenceProceedings,
			num_grants: response.numGrants,
			num_patents: response.numPatents,
			num_technologies: response.numTechnologies,

			// contact info
			//
			url: 'https://wisc.discovery.academicanalytics.com/scholar/stack/' + response.id + '/' + response.firstName + '-' + response.lastName
		};
	}
}, {

	// directory of previously referenced people
	//
	directory: {},

	//
	// static methods
	//

	has: function(person) {
		return this.directory[person.get('id')] != undefined;
	},

	get: function(person) {
		return this.directory[person.get('id')];
	},

	set: function(person) {
		this.directory[person.get('id')] = person;
		return person;
	}
});
