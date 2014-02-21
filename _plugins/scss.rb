require 'sass'
require 'compass'
require 'bootstrap-sass'

class SassGenerator < Jekyll::Generator

  def generate(site)

    Dir.mkdir('assets/css/') unless Dir.exists?('assets/css')
    site.static_files.clone.each do |sf|
      if sf.kind_of?(Jekyll::StaticFile) && sf.path =~ /scss\//
        site.static_files.delete(sf)
      end
    end
    site.static_files << SassCssFile.new(site, site.source, 'assets/css', 'application.scss')
    site.static_files << SassCssFile.new(site, site.source, 'assets/css/gtv', 'gtv.scss')
  end

end

class SassCssFile < Jekyll::StaticFile
  def destination(dest)
    File.join(dest, @dir, @name.sub(/scss$/, 'css'))
  end

  def write(dest)
    dest_path = destination(dest)

    options = {
      style: :nested,
      load_paths: ['.'],
      cache: true,
      cache_location: './.sass-cache',
      syntax: :scss,
      filesystem_importer: Sass::Importers::Filesystem
    }

    FileUtils.mkdir_p(File.dirname(dest_path))
    begin
      engine = Sass::Engine.for_file('assets/scss/application.scss', options)
      css = engine.render
      File.open(dest_path, 'w') do |f|
        f.write(css)
      end
    rescue => e
      STDERR.puts "Sass Exception: #{e.message}"
    end

    true
  end
end