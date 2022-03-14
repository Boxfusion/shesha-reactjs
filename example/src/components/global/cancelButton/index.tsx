import React, { FC } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { transitionMixin } from 'src/theme';

interface ICancelButtonContainerProps {
  onCancel: (args: any) => void;
}

const CancelButtonContainer = styled.div`
  cursor: pointer;
  .cross {
    ${transitionMixin}
  }
`;

export const CancelButton: FC<ICancelButtonContainerProps> = ({ onCancel }) => (
  <CancelButtonContainer onClick={onCancel}>
    <CloseOutlined />
  </CancelButtonContainer>
);

export default CancelButton;
