### 0.9.10
- Fix The Double Selection on Mobile Menu Drawer
### 0.9.9
- Enhance mobile view scrolling of pop-ups (workflow, media and analysis form and results) .
- Keep Show source modal opened after capturing and replace capture again in preview capture with delete capture
- Remove capture status button if no active capture
### 0.9.8
- Add Capture Type from the Capture details request
### 0.9.7
- User can now can delete an ongoing capture and can't capture a new one in Sources but preview don't work now
- Enhance The mobile view for the workflow show modal
- Handle when adding a new item to redux store to avoid infinite refetching 
- Update analysis status filters label and values
### 0.9.6
- Description of the fields above the fields not below in the analysis form and change its color
- Fix params not sent correctly to backend in Add Analysis Form
- Disable buttons on submitting to avoid duplicate requests
- Updated view of analysis (refresh every 5 seconds)
- Change Dashboard Buttons Style & Position
- Fix scroll of the show workflow modal
- Remove buttons in video analysis (first,middle,last)
- Enhance Show Analysis Video Fetching
- Delete analysis from state if user deletes it in main dashboard
### 0.9.5
- Add Support for m3u8 Type in Streaming services
### 0.9.4
- Replace Analysis Status with workflow thumbnail in Dashboard
### 0.9.3
- Complete Show Analysis Page and show analysis files and their data weither it is Media or CSV
- Make Coords & Thumbnail Not required in Add / Edit Source
- Edits to Dashboard View and Reorder Sidebar Icons
- Enhancements to analysis list page to make analysis name clickable
### 0.9.2
- Implement the Count API for Media, source, workflows and analysises 
### 0.9.1
- Implement Paginatoin For Sources, Media and Analysis
-  Add New analysis from workflow page.
- Dark Mode For Auth Page on Intialization
- Make Drawer Toggler on the header for desktop same as mobile
- Change Border Radius in Application UI Component
- Add Dashboard API
- Change Show Analysis Modal UI
- Fix dynamic inputs in create analysis as user can now clear the field
- Cancel Thumbnails requests if user left the page before the request is done to save data and memory leak
- Add Validation for Dynamic Inputs in create Analysis Information Tab
### 0.0.8.2
- Change SideDrawer Style
- Edit Media Notes & Tags
- Add Notes & Tags in submiting Upload in Media
- Remove settings page
- Remove ID from workflow cards in workflow list page
- Change analysis icon
- User profile page
- Change App logo
### 0.0.8.1
- Add Dark Mode Support
### 0.0.8
- Enable Video in Preview Capture Modal
- Implement Create Analysis
- Make upload thumbnail available for streaming server camera & remove url field from rtsp camera
- Make camera type at the top of the form on creating new one
- Show notes and tags on Show Media Modal
- Fix Show Workflow View and responsiveness
- Implement Upload In Media
- Add Video preview in Show Media modal
- Allow capture for RTSP Camera
- Make Analysis Thumbnail same as the Workflow one
### 0.0.7
- Delete Note From Media Card And Show Media Modal and make search input filters based on tags
- Remove name from preview image capture modal
- Get Workflows cards thumbnails
- Get Media cards thumbnails
- Show Original Image in Show Media Modal
- Make Capture Buttons Always disabled while there is an active capture
- Implement Capture Video but process is not completed yet because of the block from the backend
- Enable RTSP in Sources
- Enable the user to Upload a thumbnail for the Source on Create or on Edit
- Get Sources Cards thumbnails
- Add Show Workflow Modal That shows Original Image and Other Infos
- Add view button to each workflow card in the create analysis stepper so user can view the workflow before choosing it
### 0.0.6
- Enhancements to the Show / Edit Source flow with showing notifications on success or errors and The modals are closed instantly after successful requests
- Apply Style Enhancements for Media Section with List & Grid View Style so user choose his favourite one
- Add Show Media Modal
- Enhance Functionality of Media Filteration so user can get accurate results
- Integrate the API for Media ( GET - DELETE) to preview media and delete them
- Integrate the API for analysis ( GET - DELETE )
- Enhance Functionality of Analysis Filteration.
- Integrate the Show Analysis Modal with Each Item Data not static one
- Enable The User to capture Images now in Sources and can Approve the Capture or not 
- Add Show Source Modal For Map View in Sources
### 0.0.5
- New Design of Show Source Modal that Shows the User a Youtube Player and also on The Same Modal he can Capture an Image or Video
- Apply New Style Enhancements on Analysis Section Grid view, User also now can create a new analysis using a stepper.
### 0.0.4
- Integrate Workflows Show API & Apply Filtering on the frontend
- Integrate Sources (CRUD) API
- Change Dashboard Header Design in Desktop and Mobile
- Change App Logo and Favicon
- Apply New Style Enhancements on Sources Sections, User now have both Map & Grid View
- Update Styles of the Workflows Section
- Add Animations in App to help User Experience
### 0.0.3
- Integrate Login/Register API 
- Integrate User Profile API
### 0.0.2
- Integrate Firebase automatic deployments

### 0.0.1
- Initial build from legacy code