import PropTypes from 'prop-types';
import style from '../index.module.scss';
import ShowResults from '../ShowResults';

const SearchResults = ({
  searchResults,
  isLeft,
  isKeywords,
}) => (
  <>
    { isLeft && (
    <div className={style.leftPanel}>
      {
        searchResults.professorResults
        && searchResults.professorResults.length > 0
        && isKeywords && (
        <ShowResults searchResults={searchResults} isLeft isKeywords />
        )
}
      {
        searchResults.professorsRank
        && searchResults.professorsRank.length > 0
        && !isKeywords && (
        <ShowResults searchResults={searchResults} isLeft isKeywords={isKeywords} />
        )
}
    </div>
    )}
    { !isLeft && (
    <div className={style.rightPanel}>
      {
        searchResults.publicationResults
        && searchResults.publicationResults.length > 0
        && isKeywords && (
        <ShowResults searchResults={searchResults} isKeywords />
        )
}
      {
        searchResults.professorsRank
        && searchResults.professorsRank.length > 0
        && !isKeywords && (
        <ShowResults searchResults={searchResults} isKeywords={isKeywords} />
        )
}
    </div>
    )}
  </>
);

SearchResults.propTypes = {
  isLeft: PropTypes.bool,
  isKeywords: PropTypes.bool.isRequired,
  searchResults: PropTypes.shape({
    professorResults: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        photo_url: PropTypes.string,
        university_name: PropTypes.string.isRequired,
        faculty_keywords: PropTypes.arrayOf(
          PropTypes.shape({
            keyword: PropTypes.string.isRequired,
            score: PropTypes.number.isRequired,
          }),
        ).isRequired,
      }),
    ),
    publicationResults: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        venue: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
        num_citations: PropTypes.number.isRequired,
        publication_keywords: PropTypes.arrayOf(
          PropTypes.shape({
            keyword: PropTypes.string.isRequired,
            score: PropTypes.number.isRequired,
          }),
        ).isRequired,
      }),
    ),
    professorsRank: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        university: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(
          PropTypes.shape({
            group: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
          }),
        ).isRequired,
      }),
    ),
  }),
};

SearchResults.defaultProps = {
  isLeft: false,
  searchResults: {
    professorResults: [],
    publicationResults: [],
    professorsRank: [],
  },
};

export default SearchResults;
