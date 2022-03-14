import { Row } from 'antd';
import styled from 'styled-components';

export const BackupPageContainer = styled(Row)`
  font-size: 24px;

  .table-container {
    .maintenance-table-body {
    }

    .maintenance-table-btn-container {
      margin-top: 12px;
    }
  }

  .sha-index-table {
    width: 100%;

    .ant-row {
      margin: unset !important;
    }

    .index-table-controls {
      width: 100%;
      margin-bottom: unset;
      padding-right: 0;
    }
  }
`;
