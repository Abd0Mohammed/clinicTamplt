# Nex Growth — Clinic Landing Page Prototype 01

A responsive Arabic RTL clinic landing page prototype built with plain HTML, CSS and JavaScript.

## Files
- `index.html` — page structure and demo content
- `styles.css` — responsive styling and Nex Growth brand palette
- `config.js` — clinic configuration (WhatsApp, address, hours, phone)
- `script.js` — mobile navigation, date validation and WhatsApp form behavior

## Run locally
Open `index.html` in a browser. For a more realistic local setup, use VS Code Live Server or another static local server.

## Required changes before delivery
1. Open `config.js`.
2. Replace `whatsappNumber` with the clinic's WhatsApp number in international digits only, without `+`, spaces or punctuation (for Egypt, normally starts with `20`).
3. Replace phone display, address, opening hours and clinic name.
4. Replace all demo service descriptions and doctor placeholders with clinic-approved, verified information.
5. Add a verified map URL if desired; map linking is not wired into the page yet.
6. Replace the demo page title and meta description in `index.html`.
7. Obtain permission for every real photo, logo, doctor name and qualification used.
8. Review healthcare advertising rules and privacy obligations before publishing.

## Important behavior
- The top banner explicitly labels this as a demo.
- The booking form does not send or store data on a server. It creates a WhatsApp message and opens WhatsApp after the user submits.
- Until a real WhatsApp number is configured, the form shows a setup notice and does not pretend a booking was sent.
- The form says appointment requests are not confirmed until the clinic responds.
- The form is for administrative contact only. Do not ask patients to submit diagnoses, medical records, or sensitive health information.
- No testimonials, performance figures, or real clinic claims are included.

## Brand
- Ink: `#171717`
- White: `#FFFFFF`
- Lime: `#B8FF38`

## Production considerations
This is a static front-end prototype, not a complete booking system. It has no database, CRM integration, server-side validation, analytics, or appointment availability sync. Add those only if the client needs them and the implementation, privacy, security and cost are agreed.
