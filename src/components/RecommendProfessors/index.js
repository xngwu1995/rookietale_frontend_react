import {
  Button, Input, Form, AutoComplete, message,
} from 'antd';
import { useEffect, useState } from 'react';
import { getAllUnvProfessors, getAllUniversities, getRecommendFaculty } from '@services/academicworld';
import style from './index.module.scss';

const RecommendFaculty = () => {
  const [form] = Form.useForm();
  const [allUniversity, setAllUniversity] = useState([]);
  const [allProfessors, setAllProfessors] = useState([]);
  const [inputProfessor, setInputProfessor] = useState('');
  const [inputUnvValue, setInputUnvValue] = useState('');
  const [inputTarValue, setInputTarValue] = useState('');
  const [facultyList, setFacultyList] = useState([]);

  useEffect(() => {
    const init = async () => {
      const universityRes = await getAllUniversities();
      setAllUniversity(universityRes.universities);
    };
    init();
  }, []);

  const filteredKeywords = allProfessors.filter(
    (keyword) => keyword.toLowerCase().includes(inputProfessor.toLowerCase()),
  );

  const filteredUniversity = allUniversity.filter(
    (university) => university.toLowerCase().includes(inputUnvValue.toLowerCase()),
  );

  const filteredTarUniversity = allUniversity.filter(
    (university) => university.toLowerCase().includes(inputTarValue.toLowerCase()),
  );

  const updateProfessorList = async (val) => {
    const res = await getAllUnvProfessors(val);
    console.log('res', res);
    setAllProfessors(res.professors);
  };

  const onSubmit = async () => {
    if (!allUniversity.includes(inputUnvValue) || !allUniversity.includes(inputTarValue)) {
      message.error('Invalid University, please use autocomplete list');
      return;
    }
    if (!allProfessors.includes(inputProfessor)) {
      message.error('Invalid Professor, please use autocomplete list');
      return;
    }
    const values = await form.validateFields();

    if (values) {
      const res = await getRecommendFaculty(values);
      if (res.success) {
        setFacultyList(res.data);
      }
    }
  };

  return (
    <div className={style.form}>
      <div className={style.formTitle}>
        Get Recommend Professor, based on University and Professor
      </div>
      <Form
        className={style.formContainer}
        form={form}
      >
        <Form.Item
          name="University"
          rules={[{ required: true, message: 'Please put University Name!' }]}
        >
          <AutoComplete
            value={inputUnvValue}
            options={filteredUniversity.map((university) => ({ value: university }))}
            onSelect={(value) => updateProfessorList(value)}
            onChange={setInputUnvValue}
          >
            <Input value={inputUnvValue} placeholder="University" className={style.input} />
          </AutoComplete>
        </Form.Item>
        <Form.Item
          name="Professor"
          rules={[{ required: true, message: 'Please put your professor!' }]}
        >
          <AutoComplete
            value={inputProfessor}
            options={filteredKeywords.map((professor) => ({ value: professor }))}
            onChange={setInputProfessor}
          >
            <Input value={inputProfessor} placeholder="Professor" className={style.input} />
          </AutoComplete>
        </Form.Item>
        <div className={style.formTitle}>
          Put Your Target School
        </div>
        <Form.Item
          name="TargetSchool"
          rules={[{ required: true, message: 'Please put Target School Name!' }]}
        >
          <AutoComplete
            value={inputTarValue}
            options={filteredTarUniversity.map((university) => ({ value: university }))}
            onChange={setInputTarValue}
          >
            <Input value={inputTarValue} placeholder="Target University" className={style.input} />
          </AutoComplete>
        </Form.Item>
        <Button onClick={onSubmit}>
          Search
        </Button>
        {facultyList.length > 0 && (
          <div className={style.results}>
            <h2>Recommend Professors</h2>
            {facultyList.map((faculty) => (
              <div key={faculty} className={style.facultyCard}>
                <div className={style.facultyName}>{faculty}</div>
              </div>
            ))}
          </div>
        )}
      </Form>
    </div>

  );
};

export default RecommendFaculty;
