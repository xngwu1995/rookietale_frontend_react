import FacultyPage from '@components/FacultyRadar';
import PropTypes from 'prop-types';
import style from '../index.module.scss';

const ShowResults = ({
  searchResults,
  isLeft,
  isKeywords,
}) => (
  <>
    {isKeywords && isLeft && (
      <div className={style.professorsContainer}>
        <h3 className={style.heading}>Top Five Professors</h3>
        <ul className={style.professorsList}>
          {searchResults.professorResults.map((professor) => (
            <li key={professor.id} className={style.professorItem}>
              <img src={professor.photo_url} alt={professor.name} className={style.photo} />
              <div className={style.professorInfo}>
                <h4 className={style.professorName}>{professor.name}</h4>
                <p className={style.universityName}>{professor.university_name}</p>
                <ul className={style.keywordsList}>
                  {professor.faculty_keywords.map((keyword) => (
                    <li key={keyword.keyword} className={style.keywordItem}>
                      <span className={style.keywordLabel}>
                        {keyword.keyword}
                        :
                      </span>
                      <span className={style.keywordScore}>{keyword.score}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )}
    {!isKeywords && isLeft && <FacultyPage professor={searchResults.professorsRank[0]} /> }
    {isKeywords && !isLeft && (
      <div className={style.publicationsContainer}>
        <h3 className={style.heading}>Top Five Publications</h3>
        <ul className={style.publicationsList}>
          {searchResults.publicationResults.map((publication) => (
            <li key={publication.id} className={style.publicationItem}>
              <div className={style.publicationInfo}>
                <h4 className={style.title}>{publication.title}</h4>
                <p className={style.venue}>{publication.venue}</p>
                <p className={style.year}>{publication.year}</p>
                <p className={style.numCitations}>
                  {publication.num_citations}
                  {' '}
                  citations
                </p>
                <ul className={style.keywordsList}>
                  {publication.publication_keywords.map((keyword) => (
                    <li key={keyword.keyword} className={style.keywordItem}>
                      <span className={style.keywordLabel}>
                        {keyword.keyword}
                        :
                      </span>
                      <span className={style.keywordScore}>{keyword.score}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )}
    {!isKeywords && !isLeft && <FacultyPage professor={searchResults.professorsRank[1]} /> }
  </>
);

ShowResults.propTypes = {
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

ShowResults.defaultProps = {
  isLeft: false,
  searchResults: {
    professorResults: [],
    publicationResults: [],
    professorsRank: [],
  },
};
export default ShowResults;
