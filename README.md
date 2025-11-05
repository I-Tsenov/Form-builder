Title:
Form Builder

Description: 
A dynamic builder component for managing fields with selectable choices and default values. 

Features: 
- 🧠 Automatic default injection if missing and space allows
- 🚫 Prevents exceeding 50 choices
- ✅ Sanitizes user input to strip HTML
- 🔄 Updates state and payload before saving
- 💾 Integrates with `FieldService.saveField` for persistence

Validation:
- Label field required
- Default must be one of the choices
- If default value is missing and choices list < 50 → auto-injected
- If default value is missing and choices === 50 → error shown
- choices input entry should not be more than 40 characters long
- All inputs sanitized 

Setup and run:
npm install
:root/frontend : npm run dev
:root/server : npm start
