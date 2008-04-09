require 'rake'
require 'rake/packagetask'

ROOT     = File.expand_path(File.dirname(__FILE__))
SRC_DIR  = File.join(ROOT, 'src')
DIST_DIR = File.join(ROOT, 'dist')
PAGINATOR_VERSION  = '0.1'

task :default => [:test]

task :clean do
  rm_rf DIST_DIR
end

desc "Builds the distribution"
task :dist do
  $:.unshift File.join(ROOT, 'lib')
  require 'protodoc'
  
  mkdir DIST_DIR rescue
  Dir.chdir(SRC_DIR) do
    File.open(File.join(DIST_DIR, "paginator-#{PAGINATOR_VERSION}.js"), 'w+') do |dist|
      dist << Protodoc::Preprocessor.new('paginator.js')
    end
  end
end

desc "Builds the distribution, runs the JavaScript unit tests and collects their results."
task :test => [:dist, "test:run"]

namespace :test do
	require 'test/lib/jstest'
	desc "Runs all the JavaScript unit tests and collects the results"
	JavaScriptTestTask.new(:run) do |t|
	  testcases        = ENV['TESTCASES']
	  tests_to_run     = ENV['TESTS'] && ENV['TESTS'].split(',')
	  browsers_to_test = ENV['BROWSERS'] && ENV['BROWSERS'].split(',')
	  
	  t.mount("/dist")
	  t.mount("/test")
	  
	  Dir["test/unit/*.html"].sort.each do |test_file|
	    tests = testcases ? { :url => "/#{test_file}", :testcases => testcases } : "/#{test_file}"
	    test_filename = test_file[/.*\/(.+?)\.html/, 1]
	    t.run(tests) unless tests_to_run && !tests_to_run.include?(test_filename)
	  end
	  
	  %w( safari firefox ie konqueror opera ).each do |browser|
	    t.browser(browser.to_sym) unless browsers_to_test && !browsers_to_test.include?(browser)
	  end
	end
end


