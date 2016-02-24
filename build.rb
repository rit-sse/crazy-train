require 'fileutils'

Dir.chdir('governing-docs') do
  constitution = File.open('constitution.md').read
  popol = File.open('primary-officers-policy.md').read
  constitution = "---\nlayout: page\ntitle: \nsidebars: _constitution.html\npermalink: constitution/\n---\n#{constitution}"
  popol = "---\nlayout: page\ntitle: \nsidebars:\n- _constitution.html\npermalink: primary-officers-policy/\n---\n#{popol}"

  File.open('constitution.md', 'w') {|f| f.write(constitution)}
  File.open('primary-officers-policy.md', 'w'){|f| f.write(popol)}
end
