# vijaykumarchsir.github.io

Static site for Mr Vijay Kumar Ch, English educator (Hyderabad). Plain HTML/CSS/JS, no build step.

## Publish on GitHub Pages
1. Push these files to the `main` branch, at the repo root.
2. Repo **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, folder = `/ (root)`. Save.
3. Site goes live at https://vijaykumarchsir.github.io in a minute or two.

## Activate the form (FormSubmit)
`book.html` and `feedback-submit.html` both post to `https://formsubmit.co/vijaykumarchsir@gmail.com`.
1. Submit each form once from the live site.
2. FormSubmit emails vijaykumarchsir@gmail.com a confirmation link. Click it. One confirmation covers that address for later submissions.
3. After that, every submission arrives by email. (Optional: swap the address in the form for the random alias FormSubmit gives you, to hide the email.)

## Editing
- Achievements: `index.html`, look for `<!-- ACHIEVEMENT -->` comments.
- Testimonials (read-only page): `feedback.html`. Replace PLACEHOLDER cards with approved ones only.
- Feedback form: `feedback-submit.html`. Do not put it on `book.html`.
- Substack notes: `writing.html`. Profile: https://substack.com/@vkcsir. Follow the `ADD A POST` comment to add a card.
- Nav/footer: `js/site.js`. Styles: `css/site.css`. Headings use Fraunces. Body text uses Literata.
- Link any page to `book.html?purpose=Tuition|Materials|Other` to preselect the booking form.
