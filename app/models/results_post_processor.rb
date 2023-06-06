# frozen_string_literal: true

class ResultsPostProcessor
  MAX_PAGES = 500

  def initialize(*args); end

  def total_pages(total_results)
    pages = total_results.to_i / 20
    pages += 1 if (total_results.to_i % 20).positive?
    return MAX_PAGES if pages >= MAX_PAGES

    pages
  rescue
    0
  end

  def translate_highlights(body)
    return if body.nil?

    body.gsub(/\uE000/, '<strong>').gsub(/\uE001/, '</strong>')
  end
end
