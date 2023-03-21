import React, { useState } from 'react';
import { GridContainer, Grid } from '@trussworks/react-uswds';

import './SearchBar.css';

const logoImg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjI0Ij48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZD0iTTE1LjUgMTRoLS43OWwtLjI4LS4yN0MxNS40MSAxMi41OSAxNiAxMS4xMSAxNiA5LjUgMTYgNS45MSAxMy4wOSAzIDkuNSAzUzMgNS45MSAzIDkuNSA1LjkxIDE2IDkuNSAxNmMxLjYxIDAgMy4wOS0uNTkgNC4yMy0xLjU3bC4yNy4yOHYuNzlsNSA0Ljk5TDIwLjQ5IDE5bC00Ljk5LTV6bS02IDBDNy4wMSAxNCA1IDExLjk5IDUgOS41UzcuMDEgNSA5LjUgNSAxNCA3LjAxIDE0IDkuNSAxMS45OSAxNCA5LjUgMTR6Ii8+PC9zdmc+';
interface SearchBarProps {
  query: string
  results: {
    title: string,
    unescapedUrl: string,
    thumbnail: {
      url: string
    },
    content: string
  }[];
}

const getUriWithParam = (baseUrl: string, urlParam: string, urlParamQuery: string): string => {
  const Url = new URL(baseUrl);
  const urlParams: URLSearchParams = new URLSearchParams(Url.search);
  urlParams.set(urlParam, urlParamQuery);
  Url.search = urlParams.toString();
  return Url.toString();
};

export const SearchBar = (props: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(props.query);
  const searchUrlParam = 'query';

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const querySubmit = (event) => {
    event.preventDefault();
    window.location.assign(getUriWithParam(window.location.href, searchUrlParam, searchQuery));
  };

  return (
    <div id="serp-search-bar-wrapper">
      <GridContainer>
        <Grid row>
          <Grid tablet={{ col: true }}>
            <form 
              className="usa-search usa-search--small" 
              role="search" 
              onSubmit={querySubmit}>
              <label className="usa-sr-only" htmlFor="search-field">Search</label>
              <input 
                className="usa-input" 
                id="search-field" 
                placeholder="Please enter a search term."
                type="search" 
                name="searchQuery" 
                value={searchQuery} 
                onChange={handleSearchQueryChange}
                data-testid="search-field" 
              />
              <button className="usa-button" type="submit" data-testid="search-submit-btn">
                <img src={logoImg} className="usa-search__submit-icon" alt="Search"/>
              </button>
            </form>
          </Grid>
        </Grid>
        {props.results.length === 0 &&
        <Grid row>
          <Grid tablet={{ col: true }}><h4>Please enter a search term in the box above.</h4></Grid>
        </Grid>}
      </GridContainer>
      
      <GridContainer>
        <Grid row className="vertical-wrapper">
          <a href="#Everything" key="Everything" className="vertical-button">
            <span>Everything</span>
          </a>
          <a href="#News" key="News" className="vertical-button">
            <span>News</span>
          </a>
          <a href="#Images" key="Images" className="vertical-button">
            <span>Images</span>
          </a>
          <a href="#Videos" key="Videos" className="vertical-button">
            <span>Videos</span>
          </a>
          
          <a href="#relatedSites" key="relatedSites" className="vertical-button vertical-button-rel-sites">
            <span>Related Sites</span>
          </a>
        </Grid>
      </GridContainer>
    </div>
  );
};
