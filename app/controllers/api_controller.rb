class ApiController < ApplicationController
  DEFAULT_API_PER_PAGE = 10.freeze
  ssl_allowed :search
  before_filter :load_affiliate

  def search
    @search_options = search_options_from_params(@affiliate, params).merge(
      format: params[:format], index: params[:index], per_page: DEFAULT_API_PER_PAGE, lat_lon: params[:lat_lon])
    @search = ApiSearch.new(@search_options)
    results = @search.run
    SearchImpression.log(@search, get_vertical(params[:index]), params, request)
    respond_to do |format|
      format.xml { render :xml => results }
      format.json { render(:json => results) }
    end
  end

  private

  def load_affiliate
    @affiliate = Affiliate.find_by_name(params[:affiliate].to_s) if params[:affiliate].present?
    if @affiliate and WhitelistedV1ApiHandle.exists?(handle: @affiliate.name)
      @affiliate.search_engine = 'Bing'
    else
      render :text => 'Not Found', :status => 404
      false
    end
  end

  def get_vertical(index)
    case index
      when "news"
        :news
      when "videonews"
        :news
      when "images"
        :image
      when "docs"
        :docs
      else
        :web
    end
  end
end
