FROM ruby:2

RUN mkdir -p /setup/
COPY Gemfile /setup/
#COPY Gemfile.lock /setup/

WORKDIR /setup
#	sudo apt-get install ruby-dev
RUN gem install bundler -v 2.4.22
#RUN bundle install
#RUN bundle update --bundler
