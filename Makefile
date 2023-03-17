
pre:
	cat ./download/papers/*.bib > ./_bibliography/references.bib

# Build and run web server with drafts
run:
	bundle exec jekyll serve --drafts --future --port 8000 --host 0.0.0.0

# Build and run web server as production
prod:
	JEKYLL_ENV=production bundle exec jekyll serve --port 8000 --host 0.0.0.0

build:
	JEKYLL_ENV=production bundle exec jekyll build
	bundle exec htmlproofer --allow-hash-href --ignore_empty_mailto ./_site
	cp _redirects _site/_redirects
