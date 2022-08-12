# The Red Crayon

- The repository for the DRF-API associated with this project is available [HERE](https://github.com/CluelessBiker/project5-drf-api). The installation, set up, and deployment steps for this section of the project have also been included in the README linked to the DRF-API. 

#### DEPLOYED API HEROKU [LINK](project5-drf-api.herokuapp.com)
#### DEPLOYED FRONTEND HEORKU [LINK - LIVE SITE](https://red-crayon.herokuapp.com/)
#### DEPLOYED FRONTEND GITHUB [REPOSITORY](https://github.com/CluelessBiker/project5-red-crayon)

![Site view across devices]()

The live link for "The Red Crayon" can be found [HERE](https://red-crayon.herokuapp.com/)

## Table of Contents
+ [UX](#ux "UX")
  + [Site Purpose](#site-purpose "Site Purpose")
  + [Site Goal](#site-goal "Site Goal")
  + [Audience](#audience "Audience")
  + [Communication](#communication "Communication")
  + [Current User Goals](#current-user-goals "Current User Goals")
  + [New User Goals](#new-user-goals "New User Goals")
+ [User Stories](#user-stories "User Stories")
  + [Admin stories](#admin-stories "Admin stories")
  + [Artist stories](#artist-stories "Artist stories")
  + [Visitor stories](#visitor-stories "Visitor stories")
+ [Design](#design "Design")
  + [Colour Scheme](#colour-scheme "Colour Scheme")
  + [Typography](#typography "Typography")
  + [Imagery](#imagery "Imagery")
+ [Features](#features "Features")
  + [Existing Features](#existing-features "Existing Features")
  + [C.R.U.D](#crud "C.R.U.D")
+ [Testing](#testing "Testing")
  + [Validator Testing](#validator-testing "Validator Testing")
  + [Unfixed Bugs](#unfixed-bugs "Unfixed Bugs")
+ [Technologies Used](#technologies-used "Technologies Used")
  + [Main Languages Used](#main-languages-used "Main Languages Used")
  + [Frameworks, Libraries & Programs Used](#frameworks-libraries-programs-used "Frameworks, Libraries & Programs Used")
+ [Deployment](#deployment "Deployment")
+ [Credits](#credits "Credits")
  + [Content](#content "Content")
  + [Media](#media "Media")

## UX

### Site Purpose:


### Site Goal:


### Audience:


### Communication:


### Current User Goals:


### New User Goals:


### Future Goals:
- 

## User Stories
I have included links to the [GitHub Issues](https://github.com/CluelessBiker/project5-red-crayon/issues) for this project, as well as the [KANBAN board](https://github.com/users/CluelessBiker/projects/2).

![]()

## Design

### Wireframes:

##### Home Page: 

![Desktop Home]()

##### Blog Page:

![Desktop Blog]()

##### Blod Post Details:

![Desktop Blog Post]()

##### Site Navigation:

![Site Navigation]()

### Database Schema:

- This has been uploaded to the Backend README, which can be found [HERE]().

### Colour Scheme:

![Colour Palette]()

### Typography:
All fonts were obtained from the Google Fonts library. I chose the following fonts for the page:
1. 

### Imagery:
- 

## Features

### Existing Features:

#### Home Page:

![Home page]()

#### Navigation Bar:

![]()

##### Desktop:

![Navbar desktop]()

##### Mobile:

![Navbar mobile]()

#### :

![]()

#### :

![]()

#### :

![]()

#### :

![]()

#### :

![]()

#### Log in, Log out & Sign up:

##### Login:

![Login]()

##### Logout:

![Logout]()

##### Sign-up:

![Sign-up]()

#### Social Links:

![Social Links]()


### Features Left to Implement
- 

## Testing
-

### Validator Testing
- html files pass through the [W3C validator](https://validator.w3.org/) with no html issues found
- Errors listed only reference {%%} & {{}} tags.

- CSS files pass through the [Jigsaw validator](https://jigsaw.w3.org/css-validator/) with no issues found.

![Jigsaw validator message]()

- JS files pass through [JSHint](https://jshint.com/) with no issues found.

![JSHint overview]()

- page has an excellent Accessibility rating in Lighthouse

![Accessibility score]()

- Python files passed through [PEP8 Online](http://pep8online.com/) with no issues found.

![PEP8 message]()

- Tested the site opens in Brave, Chrome & Safari without issues.
- All social links open to external pages as intended.

### Unfixed Bugs

## Technologies Used
### Main Languages Used
- HTML5
- CSS3
- Javascript
- Python
- Django
- SQL - Postgres

### Frameworks, Libraries & Programs Used
- Google Fonts - for the font families: 
- Font Awesome - to add icons to the social links in the footer element.
- GitPod - to create my html files & styling sheet before pushing the project to Github.
- GitHub - to store my repository for submission.
- Balsamiq - were used to create mockups of the project prior to starting.
- Am I Responsive? - to ensure the project looked good across all devices.
- Favicon - to provide the code & image for the icon in the tab bar.
- Adobe Photoshop - for photo editing
- Django
- React-Bootstrap
- DrawSQL
- ReactJS

### Installed Packages:
- 

## Deployment
The site was deployed to Heroku. The steps to deploy are as follows:
1. Launch the gipod workspace.
2. Install ReactJS:
```
npx create-react-app . --use-npm
npm start
```
2. Install the following packages unsing the command `npm install`:
```
react-bootstrap@1.6.3 bootstrap@4.6.0
react-router-dom@5.3.0
axios
```
3. Git add, commit, and push changes to gitpod.
4. Create the project app on Heroku, and link the GitHub repository by lavigating to the 'Deploy' tab.

### Connecting to the API:
1. Navigated to the Heroku app of the project DRF-API, and under the Settings tab, added the following configvars:
- Key: CLIENT_ORIGIN | Value: https://react-app-name.herokuapp.com
- Key: CLIENT_ORIGIN_DEV | Value: https://gitpod-browser-link.ws-eu54.gitpod.io
2. Check that the trailing slash `\` at the end of both links has been removed, and save the configvar pairs.
3. Install the Axios package, & create supporting `axiosDefaults.js` as shown in [Moments Walkthrough](https://github.com/Code-Institute-Solutions/moments/blob/cf955d2f2e6f70f61c92d1f9de85558d8e49f3a8/src/api/axiosDefaults.js).


## Credits

### Content
- [Mats Simonsson](https://github.com/Pelikantapeten): A fellow student & friend who consistently helps me to troubleshoot when needed, support me constantly, and be my rubber duck.
- [Martina Terlevic](https://github.com/SephTheOverwitch): A constant support system, providing reassurance, and the ability to calm me down.

### Media
- 

#### Pexels:
