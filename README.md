Title:
Form Builder

Description: 
A dynamic builder component for managing fields with selectable choices and default values. 

Features: 
- ✅ Responsive
- ✅ Persist values in local storage
- ✅ Sanitizes user input to strip HTML
- ✅ Basic validation

Validation:
- Label field required
- Default must be one of the choices
- If default value is missing and choices list < 50 → auto-injected
- If default value is missing and choices === 50 → error shown
- choices input entry should not be more than 40 characters long
- All inputs sanitized 

Setup and run:
- npm install
- :root/frontend : npm run dev
- :root/server : npm start
