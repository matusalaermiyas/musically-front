import { css } from "@emotion/react";

const pageStyle = css`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
`;

const filtersStyle = css`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const cardStyle = css`
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const buttonGroupStyle = css`
  display: flex;
  gap: 10px;
`;

const resetButtonStyle = css`
  margin-left: 20px;
  background-color: #007bff;
`;

const editButtonStyle = css`
  background-color: #007bff;
`;

const formStyles = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 500px;
  margin: auto;

  input,
  select {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  label {
    font-weight: bold;
  }

  button {
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #45a049;
    }
  }
`;

export {
  pageStyle,
  filtersStyle,
  cardStyle,
  buttonGroupStyle,
  resetButtonStyle,
  editButtonStyle,
  formStyles,
};
