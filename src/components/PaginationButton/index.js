import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';

const CustomPagination = ({
  current,
  total,
  pageSize,
  onChange,
  onShowSizeChange,
}) => {
  const handlePageChange = (page, size) => {
    onChange(page, size);
  };

  const handlePageSizeChange = (page, size) => {
    onShowSizeChange(page, size);
  };

  return (
    <Pagination
      current={current}
      total={total}
      pageSize={pageSize}
      onChange={handlePageChange}
      onShowSizeChange={handlePageSizeChange}
    />
  );
};

CustomPagination.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onShowSizeChange: PropTypes.func.isRequired,
};

export default CustomPagination;
