import PropTypes from 'prop-types';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
} from 'recharts';
import style from './index.module.scss';

const FacultyPage = ({
  professor,
}) => (
  <>
    <div key={professor.id} className={style.professor}>
      <h3>{professor.name}</h3>
      <p>{professor.university}</p>
      <RadarChart
        cx={250}
        cy={200}
        outerRadius={50}
        width={600}
        height={400}
        data={professor.data}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="group" tick={{ fontSize: 10 }} />
        <PolarRadiusAxis angle={30} domain={[1, 5]} />
        <Radar
          name={professor.name}
          dataKey="value"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Legend />
      </RadarChart>
    </div>
    )
  </>
);

FacultyPage.propTypes = {
  professor: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    university: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        group: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      }),
    ),
  }).isRequired,
};

export default FacultyPage;
