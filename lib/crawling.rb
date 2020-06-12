require 'open-uri'

class Crawling
  def crawler
    doc = Nokogiri::HTML(open('https://nokogiri.org/tutorials/installing_nokogiri.html'))
    puts "### Search for nodes by css"
    doc.css('nav ul.menu li a', 'article h2').each do |link|
      puts link.content
    end
  end
end