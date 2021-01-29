import styled from 'styled-components/native';

export const TransparentButton = styled.View`
  display: flex;
  width: 100%;
  height: 100%;

  border-radius: 3px;
  border-style: solid;
  border-width: 1px;
  border-color: #e3e3e3;
  margin-bottom: 8px;

  justify-content: center;
  align-items: center;
  background: rgba(235, 87, 87, 0.03);
  color: #333;
  opacity: 1;

  &:hover {
    opacity: 0.5;
  }
  &:active {
    opacity: 0.5;
  }
`;

export const WhiteButton = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  border-style: solid;
  border-width: 1px;
  margin-bottom: 8px;

  justify-content: center;
  align-items: center;
  opacity: 1;

  &:hover {
    opacity: 0.5;
  }
  &:active {
    opacity: 0.5;
  }
`;
