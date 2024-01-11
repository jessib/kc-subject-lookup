# kc-subject-lookup
tool for lookup in King County WA Jail Lookup service. Here is url of service: https://dajd-jms.powerappsportals.us/public/subject-lookup/
This currently only looks at "Subjects Booked in Last 24 Hours" but that could be changed, and now only searches last names written in `lastNames` variable in app.js. We want to give it a filename and parse out last names from that.

Need node and npm
 - works with node v20.10.0
 - works with npm 10.2.3

To get started do the following to install dependencies:

```
npm install
```

Then run the following to run the script:

```
node app.js
```

Should open a non-headless chromium browser and search for the names in the `lastNames` array
