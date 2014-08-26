require 'handlebars'
class HandlebarsGenerator < Jekyll::Generator
  def generate(site)
    site.static_files.clone.each do |sf|
      if sf.kind_of?(Jekyll::StaticFile) && sf.path =~ /handlebars$/
        site.static_files.delete(sf)
      end
    end
    Dir.open('assets/js/handlebars').each do |x|
      next if x == '.' or x == '..'
      site.static_files << HandlebarsFile.new(site, site.source, 'assets/js/handlebars', x)
    end
  end

end

class HandlebarsFile < Jekyll::StaticFile
  def destination(dest)
    File.join(dest, @dir, @name.sub(/handlebars$/, 'js'))
  end

  def write(dest)
    dest_path = destination(dest)

    FileUtils.mkdir_p(File.dirname(dest_path))
    begin
      template = `node_modules/.bin/handlebars assets/js/handlebars/#{@name}`
      File.open(dest_path, 'w') do |f|
        f.write(template)
      end
    rescue => e
       #STDERR.puts "Handlebars Exception: #{e.message}"
    end

    true
  end
end