import styled from 'styled-components';

const MARGIN_LR = 10;
const BORDER = `0.75px solid lightgrey`;

export const DetailsViewHeaderListContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 12.5px;

  .details-view-header-list-container {
    display: flex;

    .details-view-header-container {
      display: flex;
      flex-direction: column;
      padding: 0 ${MARGIN_LR};
      border-left: ${BORDER};
      border-right: ${BORDER};

      &:first-child {
        border-left: unset;
      }

      .details-view-header-list-item {
        &:first-child {
          font-weight: 600;
        }

        &:last-child {
          .ant-tag {
            margin: unset;
          }
        }
      }
    }
  }

  .details-view-header-list-cancel {
    border-left: ${BORDER};
    padding-left: ${MARGIN_LR};
  }
`;
