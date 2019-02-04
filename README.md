# ZenChi Product Inventory
  
**Description**:  The ZenChi Product Inventory app uses MERN to connect to MongoDB and Redux reducers to handle
                  state management.

**Version**:      [0.2.2](#v022)  
**Author**:       Elijah Liedtke (Chimera.Zen)  
**Email**:        [chimera.zen@gmail.com](mailto:chimera.zen@gmail.com)  
**Link**:         https://github.com/ChimeraZen/zenchi-product-inventory

**Copyright**:    Copyright (c) 2018, Elijah Liedtke  
**License**:      http://www.gnu.org/licenses/gpl-3.0.html

## Table of Contents
1. [ChangeLog](#changelog)

---

## ChangeLog
### v0.2.2
* Initialized multi-modal:
  * saveAll
  * pagination
  
* Initialized user-table:
  * pagination
  * sorting
  * show perPage

* Modified getUsers() to include skip and limit
* Modified userReducer to handle pagination, sorting and limits
* General style changes
* Animated sidebar open/close



### v0.2.1
* Initialized user form modal
* Form update is Prepped for multi-update



### v0.2.0
* Initialized:
  * store
  * authToken
  * actions
  * reducers
  * public and protected route logic
  * login component
  * navbar component
* Create pages:
  * Public Home
  * Admin Home
  * Admin->Users **Prepped page - waiting for modal form component && shows user table - **
  * Admin->Settings **Prepped page - no content - **
** Some files are prepped for product reducers, actions and routes but commented out **



### v0.1.5
* Fixed backend errors
* Added jQuery, Bootstrap, and Font Awesome icons



### v0.1.4
* Added missing front-end react-redux dependency



### v0.1.3
* Initialized backend user (routes && controllers)
* Initialized backend user model
* Initialized backend Passport.js
* Initialized backend login and user validation
* Updated server.js mongoose connection



### v0.1.2
* Initialized backend server.js
* Initialized MongoDB connection string
* Set NODE_PATH=src/



### v0.1.1
* Initialized backend package.json
* Installed Dependencies and devDependencies



### v0.1.0
* Initial Commit and NPM package test
