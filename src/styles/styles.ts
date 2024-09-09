import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Global styles to apply the font across the app
const globalStyles = css`
  body {
    font-family: "Poppins", sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const sectionStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px 0;
`;

const contentStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
`;

const cardStyle = css`
  width: 200px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
`;

const imageStyle = css`
  width: 100%;
  height: 150px;
  border-radius: 10px;
  object-fit: cover;
`;

const buttonStyle = css`
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #0056b3;
  }
`;

const navbarStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
`;

const StyledLink = styled(Link)`
  margin-left: 20px;
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  &:hover {
    color: #007bff;
  }
`;

export {
  sectionStyle,
  contentStyle,
  cardStyle,
  imageStyle,
  buttonStyle,
  StyledLink,
  navbarStyle,
  globalStyles,
};
