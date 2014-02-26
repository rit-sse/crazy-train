require 'coffee-script'
class CoffeeScriptGenerator < Jekyll::Generator
  def generate(site)

    Dir.mkdir('assets/js/') unless Dir.exists?('assets/js')
    site.static_files.clone.each do |sf|
      if sf.kind_of?(Jekyll::StaticFile) && sf.path =~ /coffee/
        site.static_files.delete(sf)
      end
    end
    site.static_files << CoffeeFile.new(site, site.source, 'assets/javascripts', 'gtv_runner.coffee')
    site.static_files << CoffeeFile.new(site, site.source, 'assets/javascripts', 'ftv_runner.coffee')
    site.static_files << CoffeeFile.new(site, site.source, 'assets/javascripts', 'tv_runner.coffee')
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