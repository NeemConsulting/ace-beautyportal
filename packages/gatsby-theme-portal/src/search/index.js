import React, { useState, useRef, createRef } from 'react';
import { Link } from 'gatsby';
import {
  InstantSearch,
  RefinementList,
  ClearRefinements,
  Highlight,
  SortBy,
  HitsPerPage,
  Panel,
  Configure,
  InfiniteHits,
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import Autocomplete from './autocomplete';
import {
  ClearFiltersMobile,
  NoResults,
  ResultsNumberMobile,
  SaveFiltersMobile,
} from './widgets';
import withURLSync from './URLSync';
import './theme.css';
import './search.css';
import './search.mobile.css';

const searchClient = algoliasearch(
  process.env['app_local_algolia_app_id'] || 'XBFIS787BV',
  process.env['app_local_algolia_search_api_key'] ||
    '7d73d09b89c03c358d0f1a3ac49fd828'
);

const Hit = ({ hit }) => {
  console.log('Hit', hit);
  const { path, title, image } = hit;

  return (
    <>
      <Link
        className={'ais-InfiniteHits-item__link'}
        to={`/${path}/`}
        aria-label={title}
      >
        <article className="hit">
          {/* {pageType !== 'product' && (
            <span class="hit-article-type">{pageType}</span>
          )} */}
          <header className="hit-image-container">
            <picture>
              <source
                media="(max-width: 799px)"
                srcset={image.mobileImage.fixed.srcWebp}
              />
              <source
                media="(min-width: 800px)"
                srcset={image.desktopImage.fixed.srcWebp}
              />
              <img src={image.desktopImage.fixed.src} alt={image.alt} />
            </picture>
          </header>

          <div className="hit-info-container">
            <p className="hit-category"></p>
            <h1>
              <Highlight attribute="title" tagName="mark" hit={hit} />
            </h1>
            {/* <p className="hit-description">
              <Snippet attribute="ingredientBody" hit={hit} tagName="mark" />
              <Snippet attribute="usageBody" hit={hit} tagName="mark" />
              <Snippet attribute="galleryBody" hit={hit} tagName="mark" />
              <Snippet attribute="howTobody" hit={hit} tagName="mark" />
              <Snippet attribute="featureBody" hit={hit} tagName="mark" />
            </p> */}
          </div>
        </article>
      </Link>
    </>
  );
};

const Search = props => {
  const containerRef = useRef(null);
  const [query, setQuery] = useState('');
  const headerRef = useRef(null);
  const ref = createRef();
  const onSuggestionSelected = (_, { suggestion }) => {
    setQuery(suggestion.name);
  };

  const onSuggestionCleared = () => {
    setQuery('');
  };

  function openFilters() {
    document.body.classList.add('filtering');
    typeof window !== 'undefined' && window.scrollTo(0, 0);
    typeof window !== 'undefined' && window.addEventListener('keyup', onKeyUp);
    typeof window !== 'undefined' && window.addEventListener('click', onClick);
  }

  function closeFilters() {
    document.body.classList.remove('filtering');
    containerRef.current.scrollIntoView();
    typeof window !== 'undefined' &&
      window.removeEventListener('keyup', onKeyUp);
    typeof window !== 'undefined' &&
      window.removeEventListener('click', onClick);
  }

  function onKeyUp(event) {
    if (event.key !== 'Escape') {
      return;
    }

    closeFilters();
  }

  function onClick(event) {
    if (event.target !== headerRef.current) {
      return;
    }

    closeFilters();
  }

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={props.indices[0].name}
      searchState={props.searchState}
      createURL={props.createURL}
      onSearchStateChange={props.onSearchStateChange}
      root={{ props: { ref } }}
    >
      {props.authors !== 'true' && props.filterProducts !== 'true' && (
        <header className="search-header" ref={headerRef}>
          <p className="search-header-title">
            Stop looking for an item — find it.
          </p>
          <div className="ais-SearchBox">
            <Autocomplete
              onSuggestionSelected={onSuggestionSelected}
              onSuggestionCleared={onSuggestionCleared}
            />
          </div>
        </header>
      )}

      {props.authors === 'true' ? (
        <Configure facetFilters={[`author.name: ${props.slug}`]} />
      ) : (
        <Configure
          snippetEllipsisText="…"
          removeWordsIfNoResults="allOptional"
        />
      )}
      <div
        className={
          props.authors !== 'true' ? 'show-results' : 'show-author-results'
        }
      >
        {props.authors !== 'true' ? (
          <ResultsNumberMobile />
        ) : (
          <ResultsNumberMobile authorName={props.authorName} />
        )}
      </div>

      <main className="search-container" ref={containerRef}>
        <div className="container-wrapper">
          <section className="container-filters" onKeyUp={onKeyUp}>
            <div className="container-header">
              {/* {props.authors === 'true' && (
              <ResultsNumberMobile authorName={props.authorName} />
            )} */}
              <h2>Filters</h2>

              <div className="clear-filters" data-layout="desktop">
                <ClearRefinements
                  translations={{
                    reset: (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="11"
                          viewBox="0 0 11 11"
                        >
                          <g fill="none" fillRule="evenodd" opacity=".4">
                            <path d="M0 0h11v11H0z" />
                            <path
                              fill="#000"
                              fillRule="nonzero"
                              d="M8.26 2.75a3.896 3.896 0 1 0 1.102 3.262l.007-.056a.49.49 0 0 1 .485-.456c.253 0 .451.206.437.457 0 0 .012-.109-.006.061a4.813 4.813 0 1 1-1.348-3.887v-.987a.458.458 0 1 1 .917.002v2.062a.459.459 0 0 1-.459.459H7.334a.458.458 0 1 1-.002-.917h.928z"
                            />
                          </g>
                        </svg>
                        Clear filters
                      </>
                    ),
                  }}
                />
              </div>

              <div className="clear-filters" data-layout="mobile">
                <ResultsNumberMobile />
              </div>
            </div>

            <div className="container-body">
              {props.filterProducts === 'true' ? (
                <>
                  <Panel header="Category">
                    <RefinementList attribute="tag" limit={6} showMore={true} />
                  </Panel>
                  <Panel header="All brands">
                    <RefinementList attribute="brand" />
                  </Panel>
                </>
              ) : (
                <>
                  <Panel header="Tag">
                    <RefinementList attribute="tag" limit={6} showMore={true} />
                  </Panel>
                  <Panel header="Category">
                    <RefinementList
                      attribute="category"
                      limit={6}
                      showMore={true}
                    />
                  </Panel>
                  <Panel header="Page Type">
                    <RefinementList attribute="pageType" />
                  </Panel>
                  <Panel header="Duration">
                    <RefinementList attribute="duration" />
                  </Panel>
                </>
              )}
            </div>
          </section>

          <footer className="container-filters-footer" data-layout="mobile">
            <div className="container-filters-footer-button-wrapper">
              <ClearFiltersMobile containerRef={containerRef} />
            </div>

            <div className="container-filters-footer-button-wrapper">
              <SaveFiltersMobile onClick={closeFilters} />
            </div>
          </footer>
        </div>

        <section className="container-results">
          <header className="container-header container-options">
            {props.filterProducts !== 'true' && (
              <SortBy
                className="container-option"
                defaultRefinement={props.indices[0].name}
                items={[
                  { label: 'Sort by Date', value: 'howtoArticle' },
                  {
                    label: 'Latest',
                    value: 'howtoArtcile_publishedAt_desc',
                  },
                  {
                    label: 'Oldest',
                    value: 'howtoArtcile_publishedAt_asc',
                  },
                ]}
              />
            )}
            <HitsPerPage
              className="container-option"
              items={[
                {
                  label: '9 hits per page',
                  value: 9,
                },
                {
                  label: '18 hits per page',
                  value: 18,
                },
                {
                  label: '27 hits per page',
                  value: 27,
                },
              ]}
              defaultRefinement={9}
            />
          </header>

          <InfiniteHits showPrevious={false} hitComponent={Hit} />

          <NoResults />
        </section>
      </main>

      <aside data-layout="mobile">
        <button
          className="filters-button"
          data-action="open-overlay"
          onClick={openFilters}
        >
          <svg xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 1H1l5.6 6.3v4.37L9.4 13V7.3z"
              stroke="#fff"
              strokeWidth="1.29"
              fill="none"
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Filters
        </button>
      </aside>
    </InstantSearch>
  );
};

export default withURLSync(Search);
