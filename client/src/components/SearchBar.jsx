import React from "react";
import { Form, FormControl } from "react-bootstrap";

const SearchBar = ({ handleSubmit, placeholder, handleChange }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <FormControl
          id="searchbar"
          size="lg"
          type="text"
          placeholder={placeholder}
          onChange={handleChange}
          autoComplete="off"
          required
          autoFocus
        />
      </Form.Row>
    </Form>
  );
};

export default SearchBar;
