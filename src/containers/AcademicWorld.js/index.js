import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppContext } from '@utils/context';
import { useGoTo } from '@utils/hooks';
import SearchKeywords from '@components/SearchKeywords';
import TopFaculty from '@components/TopFaculty';
import RecommendFaculty from '@components/RecommendProfessors';
import { getProfessors, getPublications, postProfessorsRank } from '@services/academicworld';
import style from './index.module.scss';

const AcademicWorld = () => {
  const [data, setData] = useState(null);
  const [, setStore] = useAppContext();
  const go = useGoTo();

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 5;

  const fetchData = async () => {
    try {
      const universityResponse = await axios.get('/api/universities/');
      setData({
        universities: universityResponse.data,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchKeywords = async (value) => {
    const res = await getProfessors(value);
    const pub = await getPublications(value);

    return {
      res,
      pub,
    };
  };

  const fetchProfessorsRank = async (value) => {
    const res = await postProfessorsRank(value);
    return {
      res,
    };
  };

  useEffect(() => {
    setStore({ closeHeaderHandler: () => go('') });
    fetchData();
  }, []);

  const handlePageChange = (increment) => {
    setCurrentPage((prevPage) => {
      const nextPage = prevPage + increment;
      if (nextPage >= 0 && nextPage < totalPages) {
        return nextPage;
      }
      return prevPage;
    });
  };

  const renderArrows = () => (
    <div className={style.arrows}>
      <button
        type="button"
        className={`${style.arrowButton} ${style.arrowLeft}`}
        onClick={() => handlePageChange(-1)}
        disabled={currentPage === 0}
      >
        {'<'}
      </button>
      <button
        type="button"
        className={`${style.arrowButton} ${style.arrowRight}`}
        onClick={() => handlePageChange(1)}
        disabled={currentPage === totalPages - 1}
      >
        {'>'}
      </button>
    </div>
  );

  const renderUniversityGrid = () => {
    if (!data || currentPage !== 0) return null;

    return (
      <div className={style.container}>
        {data.universities.results.slice(0, 10).map((university) => (
          <div key={university.name} className={style.card}>
            <img
              src={university.photo_url}
              alt={university.name}
              className={style.universityPhoto}
            />
            <div className={style.content}>
              <h3>{university.name}</h3>
              <p>
                Score:
                {' '}
                {Math.round(university.avg_professor_score)}
              </p>
              <a href={`https://www.google.com/search?q=${university.name}`} target="_blank" rel="noreferrer">Read More</a>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={style.container}>
      {renderUniversityGrid()}
      {currentPage === 1 && <SearchKeywords fetchInput={fetchKeywords} isKeywords />}
      {currentPage === 2 && <SearchKeywords fetchInput={fetchProfessorsRank} isKeywords={false} />}
      {currentPage === 3 && <TopFaculty />}
      {currentPage === 4 && <RecommendFaculty />}
      {renderArrows()}
    </div>
  );
};

export default AcademicWorld;
