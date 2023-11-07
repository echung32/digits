![](https://github.com/echung32/digits/blob/main/doc/landing-default.jpg?raw=true)

Digits is an application that allows users to:
- Register / Login to an account.
- Create and manage a collection of contacts.
- Add timestamped notes for each contact that they have.
- Admins are also able to view all contacts.

## Installation

First, [install Meteor](https://www.meteor.com/install).

Second, go to [https://github.com/echung32/digits](https://github.com/echung32/digits) and fork the repository.

Third, go to your newly created repository, and click the "Clone or download" button to download your new GitHub repo to your local file system.  Using [GitHub Desktop](https://desktop.github.com/) is a great choice if you use MacOS or Windows.

Fourth, cd into the app/ directory of your local copy of the repo, and install third party libraries with:

```
$ meteor npm install
```

## Running the system

Once the libraries are installed, you can run the application by invoking the "start" script in the [package.json file](https://github.com/ics-software-engineering/meteor-application-template-react/blob/master/app/package.json):

```
$ meteor npm run start
```

The first time you run the app, it will create some default users and data. Here is the output:

```
 meteor npm run start 

> meteor-application-template-react@ start /Users/carletonmoore/GitHub/ICS314/meteor-application-template-react/app
> meteor --no-release-check --exclude-archs web.browser.legacy,web.cordova --settings ../config/settings.development.json

[[[[[ ~/GitHub/ICS314/meteor-application-template-react/app ]]]]]

=> Started proxy.                             
=> Started HMR server.                        
=> Started MongoDB.                           
I20220529-12:09:18.384(-10)? Creating the default user(s)
I20220529-12:09:18.389(-10)?   Creating user admin@foo.com.
I20220529-12:09:18.453(-10)?   Creating user john@foo.com.
I20220529-12:09:18.515(-10)? Creating default data.
I20220529-12:09:18.515(-10)?   Adding: Basket (john@foo.com)
I20220529-12:09:18.599(-10)?   Adding: Bicycle (john@foo.com)
I20220529-12:09:18.600(-10)?   Adding: Banana (admin@foo.com)
I20220529-12:09:18.601(-10)?   Adding: Boogie Board (admin@foo.com)
I20220529-12:09:18.773(-10)? Monti APM: completed instrumenting the app
=> Started your app.

=> App running at: http://localhost:3000/
```

Periodically, you might see `Error starting Mongo (2 tries left): Cannot run replSetReconfig because the node is currently updating its configuration` after the `=> Started HMR server.`. It doesn't seem to be a problem since the MongoDB does start.

### Viewing the running app

If all goes well, the template application will appear at [http://localhost:3000](http://localhost:3000).  You can login using the credentials in [settings.development.json](https://github.com/ics-software-engineering/meteor-application-template-react/blob/main/config/settings.development.json), or else register a new account.

### ESLint

You can verify that the code obeys our coding standards by running ESLint over the code in the imports/ directory with:

```
meteor npm run lint
```

## Walkthrough

The following sections describe the major features of this template.

### Directory structure

The top-level directory structure is:

```
.github     # holds the GitHub Continuous Integration action and Issue template.
app/        # holds the Meteor application sources
config/     # holds configuration files, such as settings.development.json
doc/        # holds developer documentation, user guides, etc.
.gitignore  # don't commit IntelliJ project files, node_modules, and settings.production.json
```

This structure separates documentation files (such as screenshots) and configuration files (such as the settings files) from the actual Meteor application.

The app/ directory has this structure:

```
.deploy/
  .gitignore     # don't commit mup.js or settings.json
  mup.sample.js  # sample mup.js file used for deploying the application
  settings.sample.json # sample settings file
  
client/
  main.html      # The boilerplate HTML with a "root" div to be manipulated by React.
  main.js        # import startup files.

imports/
  api/           # Define collections
    contact/    # The Contacts collection definition
    note/       # The Notes collection definition
  startup/       # Define code to run when system starts up (client-only, server-only, both)
    client/
    server/
  ui/
    components/  # Contains page elements, some of which could appear on multiple pages.
    layouts/     # Contains top-level layout (<App> component).
    pages/       # Contains components for each page.

node_modules/    # managed by npm

public/          # static assets (like images) can go here.

server/
   main.js       # import the server-side js files.
   
tests/           # testcafe acceptance tests.
```

### Import conventions

This system adheres to the Meteor guideline of putting all application code in the imports/ directory, and using client/main.js and server/main.js to import the code appropriate for the client and server in an appropriate order.

### Application functionality

The application implements a simple CRUD application for managing "Contacts", which is a Mongo Collection consisting of various strings, and "Notes", which is similar also stores a createdAt timestamp.

By default, each user only sees the Contacts that they have created.  However, the settings file enables you to define default accounts.  If you define a user with the role "admin", then that user gets access to a special page which lists all the Stuff defined by all users.

#### Landing page

When you retrieve the app at http://localhost:3000, this is what should be displayed:

![](https://github.com/echung32/digits/blob/main/doc/landing-default.jpg?raw=true)

The next step is to use the Login menu to either Login to an existing account or register a new account.

#### Login page

Clicking on the Login link, then on the Sign In menu item displays this page:

![](https://github.com/echung32/digits/blob/main/doc/login.jpg?raw=true)

#### Register page

Alternatively, clicking on the Login link, then on the Sign Up menu item displays this page:

![](https://github.com/echung32/digits/blob/main/doc/register.jpg?raw=true)


#### Landing (after Login) page, non-Admin user

Once you log in (either to an existing account or by creating a new one), the navbar changes as follows:

![](https://github.com/echung32/digits/blob/main/doc/landing.jpg?raw=true)

You can now add new Stuff documents, and list the Stuff you have created. Note you cannot see any Stuff created by other users.

#### Add Contacts page

After logging in, here is the page that allows you to add a new Contact:

![](https://github.com/echung32/digits/blob/main/doc/add-contact.jpg?raw=true)

#### List Contacts page

After logging in, here is the page that allows you to list all the Contacts you have added:

![](https://github.com/echung32/digits/blob/main/doc/list-contact.jpg?raw=true)

You can also create timestamped notes for the contact:

![](https://github.com/echung32/digits/blob/main/doc/timestamped-note.jpg?raw=true)

You click the "Edit" link to go to the Edit Contacts page, shown next.

#### Edit Contacts page

After clicking on the "Edit" link associated with an item, this page displays that allows you to change and save it:

![](https://github.com/echung32/digits/blob/main/doc/edit-contact.jpg?raw=true)

#### Landing (after Login), Admin user

You can define an "admin" user in the settings.json file. This user, after logging in, gets a special entry in the navbar:

![](https://github.com/echung32/digits/blob/main/doc/admin-landing.jpg?raw=true)

#### Admin page (list all contacts)

To provide a simple example of a "super power" for Admin users, the Admin page lists all of the Contacts  by all of the users:

![](https://github.com/echung32/digits/blob/main/doc/admin-list-contacts.jpg?raw=true)

Note that non-admin users cannot get to this page, even if they type in the URL by hand.

### Collections

The application implements a Collection called "Contacts", and a collection called Notes.

The Contacts collection is defined in [imports/api/contacts/Contacts.js](https://github.com/echung32/digits/blob/main/app/imports/api/contact/Contacts.js).
The Notes collection is defined in [imports/api/note/Notes.js](https://github.com/echung32/digits/blob/main/app/imports/api/note/Notes.js).

The Contacts/Notes collection is initialized in [imports/startup/server/Mongo.js](https://github.com/echung32/digits/blob/main/app/imports/startup/server/Mongo.js).
