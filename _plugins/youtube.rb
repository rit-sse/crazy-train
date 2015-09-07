require 'yaml'

class YoutubeTag < Liquid::Tag
  def initialize(tag_name, text, tokens)
    super
    @hash = YAML.load(text).inject({}) { |h, (k,v)| h[k.to_sym] = v ; h}
    @tokens = tokens
  end

  def render(context)
    "<iframe width='#{@hash[:width]}' height='#{@hash[:height]}' src='//www.youtube.com/embed/#{@hash[:url]}' frameborder='0' allowfullscreen></iframe>"
  end
end

Liquid::Template.register_tag('youtube', YoutubeTag)
