import React, { Component } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { Highlight, connectAutoComplete } from 'react-instantsearch-dom';
import AutoSuggest from 'react-autosuggest';
import './autocomplete.css';

class AutoComplete extends Component {
  static propTypes = {
    hits: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentRefinement: PropTypes.string.isRequired,
    refine: PropTypes.func.isRequired,
    onSuggestionSelected: PropTypes.func.isRequired,
    onSuggestionCleared: PropTypes.func.isRequired,
  };

  state = {
    value: this.props.currentRefinement,
  };

  onChange = (_, { newValue }) => {
    if (!newValue) {
      this.props.onSuggestionCleared();
    }

    this.setState({
      value: typeof newValue !== 'undefined' ? newValue : '',
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.refine(value);
  };

  onSuggestionsClearRequested = () => {
    this.props.refine();
  };

  getSuggestionValue(hit) {
    return hit.name;
  }

  renderSuggestion(hit) {
    return (
      <Link className={'ais-InfiniteHits-item__link'} to={`/${hit.path}`}>
        {/* <div className="image-wrapper">
          <img
            className={'ais-InfiniteHits-item__image'}
            src={`${hit.image.asset.url}?w=240&h=240&fit=crop&fm=webp`}
            alt={hit.image.alt}
          />
        </div> */}
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </Link>
    );
  }

  render() {
    const { hits, onSuggestionSelected } = this.props;
    const { value } = this.state;

    const inputProps = {
      placeholder: 'Search for articles, products or brands...',
      onChange: this.onChange,
      value,
    };

    return (
      <AutoSuggest
        suggestions={hits.slice(0, 4)}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default connectAutoComplete(AutoComplete);
