import React, { PropTypes } from 'react';

const Form = ({
  onSubmit,
  error
}) => (
  <article>
      <form action="" className="search__form" role="search" onSubmit={onSubmit}>
        <fieldset>
          <label for="search" className="search__form--hidden">Enter your input</label>
          <input type="text" placeholder="Enter your input" className="search__input" />
          <button type="submit" className="search__submit" value="Search">Calculate</button>
        </fieldset>
      </form>
      {
        error.message ? (
          <p className="search__error-msg">{error.message }</p>
        ) : (
          <p></p>
        )
      }
  </article>
);

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired
};

export default Form;
