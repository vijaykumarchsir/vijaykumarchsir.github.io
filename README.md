# vijaykumarchsir.github.io

Static site for Mr Vijay Kumar Ch, English educator (Hyderabad). Plain HTML/CSS/JS, no build step.

## Publish on GitHub Pages
1. Push these files to the `main` branch, at the repo root.
2. Repo **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, folder = `/ (root)`. Save.
3. Site goes live at https://vijaykumarchsir.github.io in a minute or two.

## Activate the form (FormSubmit)
The form on `book.html` posts to `https://formsubmit.co/vijaykumarchsir@gmail.com`.
1. Submit the form once from the live site.
2. FormSubmit emails vijaykumarchsir@gmail.com a confirmation link. Click it.
3. After that, every submission arrives by email. (Optional: swap the address in the form for the random alias FormSubmit gives you, to hide the email.)

## Editing
- Achievements: `index.html`, look for `<!-- ACHIEVEMENT -->` comments.
- Testimonials: `feedback.html`, replace PLACEHOLDER cards with approved ones only.
- Nav/footer: `js/site.js`. Styles: `css/site.css`.
- Link any page to `book.html?purpose=Tuition|Materials|Feedback|Other` to preselect the form.
