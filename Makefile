# To install `bundle`
#	sudo apt-get install ruby-dev
#	gem install bundler
#
#
setup:
	bundle install

run:
	bundle exec jekyll serve --drafts

prod:
	bundle exec jekyll serve
