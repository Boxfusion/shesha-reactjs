import { IStoredFile } from '@shesha/reactjs/dist/providers/storedFiles/contexts';
import FormItem from 'antd/lib/form/FormItem';
import { StoredFileProvider } from 'providers';
import React, { FC, Fragment } from 'react';
import { capitalizeFirstLetter } from 'utils/string';
import { FileUpload } from '@shesha/reactjs';
import { BASE_URL } from 'src/api/utils/constants';

interface ICustomUploaderProps {
  readonly data: any;
  readonly ownerId: string;
  readonly ownerType: string;
  readonly config: any;
  readonly allowDelete?: boolean;
  readonly allowReplace?: boolean;
  readonly allowUpload?: boolean;
  readonly callback?: (key: string, file: IStoredFile) => any;
}

export const CustomUploader: FC<ICustomUploaderProps> = ({
  data,
  ownerId,
  ownerType,
  config,
  allowDelete = true,
  allowReplace = true,
  allowUpload = true,
  callback,
}) => {
  const cb = (key: any, e: any) => {
    if (callback) callback(key, e);
  };

  const values = Object.entries(data || {})
    .filter(([key]) => key.endsWith('File'))
    .map(([key, value]) => [key, value, config?.[key]?.name, config?.[key]?.visibility, config?.[key]?.order]);

  return (
    <Fragment>
      {values
        .filter((i) => i[3])
        .sort((a, b) => a[4] - b[4])
        .map(([key, _value, label]) => (
          <FormItem key={key} label={label || 'File'}>
            <StoredFileProvider
              baseUrl={BASE_URL}
              ownerId={ownerId}
              ownerType={ownerType}
              propertyName={capitalizeFirstLetter(key)}
            >
              <FileUpload
                allowDelete={allowDelete}
                allowReplace={allowReplace}
                allowUpload={allowUpload}
                callback={(e) => cb(key, e)}
              />
            </StoredFileProvider>
          </FormItem>
        ))}
    </Fragment>
  );
};

export default CustomUploader;
