require 'stringex'

desc "Create a new post"
task :new_post, :title do |t, args|
  if args.title
    title = args.title
  else
    title = get_stdin("Enter a title for your post: ")
  end
  time = Time.now
  filename = "_posts/#{time.strftime('%Y-%m-%d')}-#{title.to_url}.md"
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end
  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/&/,'&amp;')}\""
    post.puts "date: #{time.strftime('%Y-%m-%d %H:%M:%S %z')}"
    post.puts "---"
  end
end

def get_stdin(message)
  print message
  STDIN.gets.chomp
end

def ask(message, valid_options)
  if valid_options
    answer = get_stdin("#{message} #{valid_options.to_s.gsub(/"/, '').gsub(/, /,'/')} ") while !valid_options.include?(answer)
  else
    answer = get_stdin(message)
  end
  answer
end


desc "Pre build stuff"
task :pre_build do |t, args|
  Dir.chdir('governing-docs') do
    constitution = File.open('constitution.md').read
    popol = File.open('primary-officers-policy.md').read
    constitution = "---\nlayout: page\ntitle: \nsidebars: _constitution.html\npermalink: constitution/\n---\n#{constitution}"
    popol = "---\nlayout: page\ntitle: \nsidebars:\n- _constitution.html\npermalink: primary-officers-policy/\n---\n#{popol}"

    File.open('constitution.md', 'w') {|f| f.write(constitution)}
    File.open('primary-officers-policy.md', 'w'){|f| f.write(popol)}
  end
  FileUtils.rm_r('assets/images/pages', force: true)
  FileUtils.cp_r('pages/images/.', 'assets/images/pages')

  FileUtils.rm_r('assets/images/posts', force: true)
  FileUtils.cp_r('_posts/images/.', 'assets/images/posts')
end
