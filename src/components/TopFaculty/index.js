import {
  Button, Input, Form, AutoComplete, message,
} from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getFaculty } from '@services/academicworld';
import style from './index.module.scss';

const TopFaculty = () => {
  const [form] = Form.useForm();
  const [allUniversity, setAllUniversity] = useState([]);
  const [allKeywords, setAllKeywords] = useState([]);
  const [inputKeywordValue, setInputKeywordValue] = useState('');
  const [inputUnvValue, setInputUnvValue] = useState('');
  const [facultyList, setFacultyList] = useState([]);

  useEffect(() => {
    const init = async () => {
      const keywordRes = await axios.get('/api/keywords/get_all_keywords/');
      setAllKeywords(keywordRes.data.keywords);
      const universityRes = await axios.get('api/universities/all_universities');
      setAllUniversity(universityRes.data.universities);
    };
    init();
  }, []);

  const filteredKeywords = allKeywords.filter(
    (keyword) => keyword.toLowerCase().includes(inputKeywordValue.toLowerCase()),
  );

  const filteredUniversity = allUniversity.filter(
    (university) => university.toLowerCase().includes(inputUnvValue.toLowerCase()),
  );

  const onSubmit = async () => {
    if (!allUniversity.includes(inputUnvValue)) {
      message.error('Invalid University, please use autocomplete list');
      return;
    }
    if (!allKeywords.includes(inputKeywordValue)) {
      message.error('Invalid Keyword, please use autocomplete list');
      return;
    }
    const values = await form.validateFields();
    if (values) {
      const res = await getFaculty(values);
      console.log('res', res);
      if (res.success) {
        setFacultyList(res.data);
      }
    }
  };
  return (
    <div className={style.form}>
      <div className={style.formTitle}>
        Get Top 10 Faculty, based on University and Keyword
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
            onChange={setInputUnvValue}
          >
            <Input value={inputUnvValue} placeholder="University" className={style.input} />
          </AutoComplete>
        </Form.Item>
        <Form.Item
          name="Keyword"
          rules={[{ required: true, message: 'Please put your keyword!' }]}
        >
          <AutoComplete
            value={inputKeywordValue}
            options={filteredKeywords.map((keyword) => ({ value: keyword }))}
            onChange={setInputKeywordValue}
          >
            <Input value={inputKeywordValue} placeholder="Keyword" className={style.input} />
          </AutoComplete>
        </Form.Item>
        <Button onClick={onSubmit}>
          Search
        </Button>
        {facultyList.length > 0 && (
        <div className={style.results}>
          <h2>Results</h2>
          {facultyList.map((faculty) => (
            <div key={faculty.name} className={style.facultyCard}>
              <div className={style.facultyName}>{faculty.name}</div>
              <div className={style.facultyKRC}>
                <span className={style.krcLabel}>KRC:</span>
                {' '}
                {faculty.KRC}
              </div>
            </div>
          ))}
        </div>
        )}
      </Form>
    </div>

  );
};

export default TopFaculty;
