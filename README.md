# vijaykumarchsir.github.io

Static site for Mr Vijay Kumar Ch, English educator (Hyderabad). Plain HTML/CSS/JS, no build step.

The default page (`index.html`) is The English Lantern store. An older `/lantern.html` address redirects there.

## Publish on GitHub Pages
1. Push these files to the `main` branch, at the repo root.
2. Repo **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, folder = `/ (root)`. Save.
3. Site goes live at https://vijaykumarchsir.github.io in a minute or two.

## Activate the form (FormSubmit)
`book.html` and the form on `feedback.html` both post to `https://formsubmit.co/vijaykumarchsir@gmail.com`.
1. Submit each form once from the live site.
2. FormSubmit emails vijaykumarchsir@gmail.com a confirmation link. Click it. One confirmation covers that address for later submissions.
3. After that, every submission arrives by email. (Optional: swap the address in the form for the random alias FormSubmit gives you, to hide the email.)

## Editing
- About (photo, name, qualifications, page links): `about.html`.
- Testimonials and the feedback form: `feedback.html`. Replace PLACEHOLDER cards with approved ones only. The form is at `#submit`.
- Older `/feedback-submit.html` and `/lantern.html` addresses redirect; do not delete those files.
- Substack notes: `writing.html`. Profile: https://substack.com/@vkcsir. Follow the `ADD A POST` comment to add a card.
- Nav/footer: `js/site.js`. Styles: `css/site.css`. Headings use Newsreader. Body text uses Inter.
- Link any page to `book.html?purpose=Tuition|Materials|Other` to preselect the booking form.
