# frozen_string_literal: true

class Admin::SearchgovDomainsController < Admin::AdminController
  active_scaffold :searchgov_domain do |config|
    config.label = 'Search.gov Domains'
    config.actions = %i[create update list search export nested]
    config.create.columns = [:domain]
    config.columns = %i[
      id domain canonical_domain status activity
      urls_count unfetched_urls_count created_at
    ]
    config.nested.add_link(:searchgov_urls, label: 'URLs', page: false)
    config.nested.add_link(:sitemaps, page: false)
    config.action_links.add(
      'reindex',
      label: 'Reindex',
      type: :member,
      crud_type: :update,
      method: :post,
      position: false,
      inline: true,
      confirm: 'Are you sure you want to reindex this entire domain?'
    )

    config.action_links.add(
      'stop_indexing',
      confirm:   'Are you sure you want to stop indexing this domain?',
      crud_type: :update,
      inline:    true,
      label:     'stop indexing',
      method:    :post,
      position:  false,
      type:      :member
    )

    config.update.columns = %i[js_renderer]
    config.columns[:js_renderer].label = 'Render Javascript'
  end

  def stop_indexing
    process_action_link_action do |searchgov_domain|
      searchgov_domain.stop_indexing!

      flash[:info] = t(:'.indexing_stopped', name: searchgov_domain.domain)
    end
  end

  def after_create_save(record)
    flash[:info] = "#{record.domain} has been created. Sitemaps will automatically begin indexing."
  end

  def reindex
    process_action_link_action do |searchgov_domain|
      SearchgovDomainReindexerJob.perform_later(searchgov_domain: searchgov_domain)

      searchgov_domain.update(status: SearchgovDomain::INDEXING_STARTED)

      flash[:info] = "Reindexing has been enqueued for #{searchgov_domain.domain}"
    end
  end
end
