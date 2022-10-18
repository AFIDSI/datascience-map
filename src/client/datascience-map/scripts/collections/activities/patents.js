/******************************************************************************\
|                                                                              |
|                                patents.js                                    |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This file defines an abstract base collection of patents.             |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|     Copyright (C) 2022, Data Science Institute, University of Wisconsin      |
\******************************************************************************/

import Activities from './activities.js';
import Patent from '../../models/activities/patent.js';

export default Activities.extend({

	//
	// attributes
	//

	model: Patent
});