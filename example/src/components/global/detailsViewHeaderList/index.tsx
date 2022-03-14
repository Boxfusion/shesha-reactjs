import React, { FC } from 'react';
import { CancelButton } from '../cancelButton';
import { useRouter } from 'next/router';
import { DetailsViewHeaderListContainer } from './styles';
import { IControlItemData } from 'models';

interface IDetailsViewHeaderListProps {
  items: IControlItemData[];
  backUrl: string;
}

export const DetailsViewHeaderList: FC<IDetailsViewHeaderListProps> = ({ items, backUrl }) => {
  const { push } = useRouter();

  let i = 0;

  return (
    <DetailsViewHeaderListContainer>
      <span className="details-view-header-list-container">
        {items.map(({ name, value }) => (
          <span key={i++} className="details-view-header-container">
            <span className="details-view-header-list-item">{name}</span>
            <span className="details-view-header-list-item">{value}</span>
          </span>
        ))}
      </span>
      <span className="details-view-header-list-cancel">
        <CancelButton onCancel={() => push(backUrl)} />
      </span>
    </DetailsViewHeaderListContainer>
  );
};

export default DetailsViewHeaderList;
