class WidgetsController < ApplicationController
  def top_searches
    @active_top_searches = TopSearch.find_active_entries
    render :layout => false
  end

  def trending_searches
    @active_top_searches = TopSearch.find_active_entries
    render :partial => 'shared/trending_searches', :layout => true
  end
end

