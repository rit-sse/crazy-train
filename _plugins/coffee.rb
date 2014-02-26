require 'coffee-script'
class CoffeeScriptGenerator < Jekyll::Generator
  def generate(site)

    FileUtils.mkdir_p('assets/js/') unless Dir.exists?('assets/js')
    site.static_files.clone.each do |sf|
      if sf.kind_of?(Jekyll::StaticFile) && sf.path =~ /coffee/
        site.static_files.delete(sf)
      end
    end
    Dir.open('assets/js/').each do |x|
      next if not x =~ /.coffee$/
      site.static_files << CoffeeFile.new(site, site.source, 'assets/javascripts', x)
    end
  end

end

class CoffeeFile < Jekyll::StaticFile
  def destination(dest)
    File.join(dest, @dir, @name.sub(/coffee$/, 'js'))
  end

  def write(dest)
    dest_path = destination(dest)

    FileUtils.mkdir_p(File.dirname(dest_path))
    begin
      content = File.open("assets/js/#{@name}").read
      js = CoffeeScript.compile(content)
      File.open(dest_path, 'w') do |f|
        f.write(js)
      end
    rescue => e
      STDERR.puts "CoffeeScript Exception: #{e.message}"
    end

    true
  end
end