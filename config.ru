require "rack/jekyll"

builder = Rack::Builder.new do
  map '/' do
    run Rack::Jekyll.new(destination: '/_site')
  end

  require ::File.expand_path('/events/config/environment',  __FILE__)

  map "/admin" do
    run Wtf::Application
  end

  require '/pinocchio/app.rb'

  map "/go" do
    secret_file_path = '/events/session_key'
    secret_key = "Ouppvx4UKRIJ7zHCDuFEYh7IOwaJ3dIClmROlIzj5Y5RkSVeN2CIZMOar6FxwYL"
    if File.exist? secret_file_path
      secret_key = File.read(secret_file_path).chomp
    end
    use Rack::Session::Cookie, key: "_sse_session",
                               secret: secret_key
    run Pinocchio
  end
end

run builder
