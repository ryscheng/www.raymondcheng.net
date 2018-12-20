# To install `bundle`
#	sudo apt-get install ruby-dev
#	gem install bundler
#
# Install dependencies
setup:
	bundle install

pre:
	cat ./download/papers/*.bib > ./_bibliography/references.bib

# Build and run web server with drafts
run:
	bundle exec jekyll serve --drafts --port 8000 --host 0.0.0.0

# Build and run web server as production
prod:
	JEKYLL_ENV=production bundle exec jekyll serve --port 8000 --host 0.0.0.0
