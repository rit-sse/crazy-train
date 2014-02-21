class YoutubeTag < Liquid::Tag
  def initialize(tag_name, text, tokens)
    super
    @hash = eval(text)
    @tokens = tokens
  end

  def render(context)
    "<iframe width='#{@hash[:width]}' height='#{@hash[:height]}' src='//www.youtube.com/embed/#{@hash[:url]}' frameborder='0' allowfullscreen></iframe>"
  end
end

Liquid::Template.register_tag('youtube', YoutubeTag)