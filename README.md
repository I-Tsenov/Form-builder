Title:
Form Builder

Description: 
A dynamic builder component for managing fields with selectable choices and default values.
Project uses React and SASS.

Features: 
- ✅ Responsive
- ✅ Persist values in local storage
- ✅ Sanitizes user input to strip HTML
- ✅ Basic validation
- ✅ Minimalistic server for post request handle

Validation:
- Label field required
- Default must be one of the choices
- If default value is missing and choices list < 50 → auto-injected
- If default value is missing and choices === 50 → error shown
- choices input entry should not be more than 40 characters long
- All inputs sanitized 

Dependancies: 
- React (frontend)
- SASS (frontend)
- Express (server)
- Cors (server)
  
Setup and run:
- npm install
- :root/frontend : npm run dev
- :root/server : npm start
