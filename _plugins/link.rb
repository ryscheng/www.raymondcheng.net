=begin
  Jekyll tag to include link from _data directory
  Usage:
    {% link <key> %}
=end

module Jekyll
  class LinkTag < Liquid::Tag
    def initialize(tag_name, key, tokens)
      super
      @key = key.strip
    end

    def render(context)
      site = context.registers[:site]
      name = site.data["links"][@key]["name"]
      url = site.data["links"][@key]["url"]
      <<-MARKUP.strip
      <a href="#{url}">
        #{name}
      </a>
      MARKUP
    end
  end
end
Liquid::Template.register_tag('link', Jekyll::LinkTag)
