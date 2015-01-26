
class BrowserifyGenerator < Jekyll::Generator
  def generate(site)
    site.static_files.clone.each do |sf|
      if sf.kind_of?(Jekyll::StaticFile) && sf.path =~ /tv\//
        site.static_files.delete(sf)
      end
    end
    site.static_files << BrowserifyFile.new(site, site.source, 'assets/js/tv', 'gtv.jsx')
    site.static_files << BrowserifyFile.new(site, site.source, 'assets/js/tv', 'ftv.jsx')
  end

end

class BrowserifyFile < Jekyll::StaticFile
  def destination(dest)
    File.join(dest, @dir, @name.sub(/jsx$/, 'js'))
  end

  def write(dest)
    dest_path = destination(dest)

    FileUtils.mkdir_p(File.dirname(dest_path))
    begin
      template = `node_modules/.bin/browserify --extension .jsx -t [ reactify --es6 ] #{@dir}/#{@name}`
      File.open(dest_path, 'w') do |f|
        f.write(template)
      end
    rescue => e
    end

    true
  end
end
