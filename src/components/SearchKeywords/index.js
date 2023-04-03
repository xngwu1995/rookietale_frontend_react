import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Input, Button, List, message, AutoComplete,
} from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SearchResults from './SearchResults';
import style from './index.module.scss';

const SearchBar = ({
  fetchInput,
  isKeywords,
}) => {
  const [keywords, setKeywords] = useState([]);
  const [allKeywords, setAllKeywords] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState({
    professorResults: [],
    publicationResults: [],
    professorsRank: [],
  });
  useEffect(() => {
    const init = async () => {
      try {
        if (isKeywords) {
          const res = await axios.get('/api/keywords/get_all_keywords/');
          setAllKeywords(res.data.keywords);
        } else {
          const res = await axios.get('/api/faculty/get_all_professors/');
          setAllKeywords(res.data.professors);
        }
      } catch (error) {
        message.error('Error fetching data:', error);
      }
    };
    init();
  }, []);

  const handleKeywordAdded = (value) => {
    const keyword = value.trim(); // Trim whitespace from input value
    if (isKeywords && keywords.includes(keyword)) {
      message.error('Already Added This Keyword');
      return;
    }
    if (isKeywords && !allKeywords.includes(keyword)) {
      message.error('Invalid Keyword');
      return;
    }
    if (keywords.includes(keyword)) {
      message.error('Already Added This Professor');
      return;
    }
    if (!allKeywords.includes(keyword)) {
      message.error('Invalid Professor');
      return;
    }
    if (keyword) {
      setKeywords([...keywords, keyword]);
    }
  };

  const handleSearchResult = async () => {
    if (isKeywords && keywords.length === 0) {
      message.error('No Keywords Added');
      return;
    }
    if (!isKeywords && keywords.length < 2) {
      message.error('Needed Two Professors');
      return;
    }
    if (isKeywords) {
      const { res, pub } = await fetchInput(keywords);
      setSearchResults({ professorResults: res, publicationResults: pub });
    } else {
      const { res } = await fetchInput(keywords);
      setSearchResults({ professorsRank: res.professors_group_scores });
    }
  };

  const handleKeywordRemove = (index) => {
    setKeywords([...keywords.slice(0, index), ...keywords.slice(index + 1)]);
  };

  const filteredKeywords = allKeywords.filter(
    (keyword) => keyword.toLowerCase().includes(inputValue.toLowerCase()),
  );

  return (
    <div className={style.container}>
      {isKeywords && <SearchResults searchResults={searchResults} isLeft isKeywords />}
      {
        !isKeywords
        && <SearchResults searchResults={searchResults} isLeft isKeywords={isKeywords} />
      }
      <div className={style.searchBar}>
        <AutoComplete
          value={inputValue}
          options={filteredKeywords.map((keyword) => ({ value: keyword }))}
          onSelect={handleKeywordAdded}
          onChange={setInputValue}
          className={style.input}
        >
          <Input
            placeholder={isKeywords ? 'Add favorite keyword' : 'Add professor'}
            onPressEnter={(e) => {
              handleKeywordAdded(e.target.value);
              e.target.value = ''; // Clear input field
            }}
            addonAfter={(
              <Button
                onClick={() => {
                  const input = document.querySelector('.ant-input');
                  handleKeywordAdded(input.value);
                  input.value = ''; // Clear input field
                }}
                className={style.addButton}
              >
                Add
              </Button>
            )}
          />
        </AutoComplete>
        {keywords.length > 0 && (
          <List
            dataSource={keywords}
            renderItem={(item, index) => (
              <List.Item className={style.keywordItem}>
                <Button type="link" danger icon={<CloseOutlined className={style.closeIcon} />} onClick={() => handleKeywordRemove(index)} />
                <span className={style.keyword}>{item}</span>
              </List.Item>
            )}
            bordered
            className={style.favoriteKeywordsList}
          />
        )}
        <Button
          icon={<SearchOutlined />}
          className={style.searchButton}
          onClick={() => handleSearchResult()}
        >
          Search
        </Button>
      </div>
      {isKeywords && <SearchResults searchResults={searchResults} isKeywords />}
      {
        !isKeywords
        && <SearchResults searchResults={searchResults} isKeywords={isKeywords} />
      }
    </div>
  );
};

SearchBar.propTypes = {
  isKeywords: PropTypes.bool.isRequired,
  fetchInput: PropTypes.func.isRequired,
};

export default SearchBar;
