import PropTypes from 'prop-types';

/**
 * Show or hide another components
 */
const Show = ({
  visible,
  children,
}) => (
  <div style={{ display: visible ? 'block' : 'none' }}>
    {children}
  </div>
);

Show.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Show;
