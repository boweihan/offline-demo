import React from 'react';
import PropTypes from 'prop-types';
import UserPicker from './UserPicker';

const styles = {
  header: {
    backgroundColor: '#424347',
    padding: 20,
    margin: 10,
    marginBottom: 0,
  },
  heading: {
    color: 'white',
    fontFamily: 'Open Sans',
    textAlign: 'center',
  },
};

const buildDropDownOptions = users => {
  return users.map(user => ({
    value: user.id,
    label: user.name,
  }));
};

const Header = ({ heading, users, selectedUser, selectUser }) => {
  let options = buildDropDownOptions(users);
  let defaultOption = options.find(
    option => option.value === (selectedUser && selectedUser.id),
  );
  return (
    <div style={styles.header}>
      <h2 style={styles.heading}>{heading}</h2>
      <UserPicker
        options={options}
        defaultOption={defaultOption}
        onChange={selectUser}
      />
    </div>
  );
};

Header.propTypes = {
  heading: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  selectedUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
  selectUser: PropTypes.func.isRequired,
};

export default Header;
