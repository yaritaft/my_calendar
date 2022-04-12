## Instructions

The goal of this exercise is to create a demo calendar application using React. We strongly recommend create-react-app to make the bootstrapping of your application really easy.

Please don't use a `calendar` library, we would like to see your own calendar logic.

### The Task

You should start by rendering a single month view of a calendar for the current month – along with the lines of the `calendar` image in this project.

### Features & Requirements:

- You need to use one of the following state management libraries: Relay, Apollo, MobX or Redux
- Ability to add a new “reminder” (max 30 chars) for a user entered day and time.
- Display reminders on the calendar view in the correct time order.
- Allow the user to select a color when creating a reminder and display it appropriately.
- Properly handle overflow when multiple reminders appear on the same date.
- Ability to edit reminders – including changing text, day and time & color.
- Ability to delete reminders.
- Expand the calendar to support more than the current month.

# Deployment link

https://master--tubular-dragon-f7b146.netlify.app/

# Setup

Node 14 or more is needed.
Inside the folder do and

```
npm install
npm start
```

Go to

http://localhost:3000/

# Constraints

The component is working on 1920 x 1080 and 1280 x 720 resolutions.

# Improvements

- Tests with react testing library would be great (will add them today)
- Styled components can be added to improve the styling logic
- I18N must be added to make the text language easy to translate in the whole app. And also a good thing to split content and logic.
- Cypress can be used to test it end two end.
- Maybe would be good to make an integration with google calendar to store information in cloud. Or create a backend for the same purpose.
