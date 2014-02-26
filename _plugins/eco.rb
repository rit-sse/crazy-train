require 'eco'
class EcoGenerator < Jekyll::Generator
  def generate(site)
    site.static_files.clone.each do |sf|
      if sf.kind_of?(Jekyll::StaticFile) && sf.path =~ /jst.eco/
        site.static_files.delete(sf)
      end
    end
    Dir.open('assets/js/templates').each do |x|
      next if x == '.' or x == '..'
      site.static_files << EcoFile.new(site, site.source, 'assets/javascripts/templates', x)
    end
  end

end

class EcoFile < Jekyll::StaticFile
  def destination(dest)
    File.join(dest, @dir, @name.sub(/jst.eco$/, 'js'))
  end

  def write(dest)
    dest_path = destination(dest)

    FileUtils.mkdir_p(File.dirname(dest_path))
    begin
      content = File.open("assets/js/templates/#{@name}").read
      #js = Eco.compile(content)
      js = "(function() { this.JST || (this.JST = {}); this.JST['templates/#{@name.sub(/.jst.eco$/, '')}'] = #{Eco.compile(content)}}).call(this);"
      File.open(dest_path, 'w') do |f|
        f.write(js)
      end
    rescue => e
       STDERR.puts "Eco Exception: #{e.message}"
    end

    true
  end
end
