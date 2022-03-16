import React, { FC, useEffect, useState } from 'react';
import { Popover, Button, Form, notification } from 'antd';
import { ConfigurableForm } from '../';
import { useUi } from '../../providers';
import { useGet } from 'restful-react';
import ValidationErrors from '../validationErrors';

export interface IQuickViewProps {
    /**
     * The id or guid for the entity
     */
    entityId?: string;

    /**
     * Path to the form to display on the modal
     */
    formPath?: string;

    /**
     * The Url that details of the entity are retreived
     */
    getEntityUrl: string;

    /**
     * The property froom the data to use as the label and title for the popover
     */
    displayProperty: string;

    /**
     * The width of the quickview
     */
    width?: number;
}

const QuickView: FC<Omit<IQuickViewProps, 'children'>> = ({
    entityId,
    formPath,
    getEntityUrl,
    displayProperty,
    width = 450
}) => {
    const [formData, setFormData] = useState();
    const [formTitle, setFormTitle] = useState();

    const [form] = Form.useForm();
    const { formItemLayout } = useUi();
    const { refetch, loading, data, error: fetchEntityError } = useGet({
        path: getEntityUrl || '',
        queryParams: { id: entityId },
        lazy: true,
    });

    useEffect(() => {
        if (getEntityUrl && entityId) {
            refetch();
        }
    }, [entityId, getEntityUrl]);

    useEffect(() => {
        if (!loading && data) {
            setFormData(data.result);
            setFormTitle(data.result[displayProperty]);
        }
    }, [loading, data]);

    useEffect(() => {
        if (fetchEntityError) {
            notification.error({ message: <ValidationErrors error={fetchEntityError} renderMode="raw" /> });
        }
    }, [fetchEntityError]);

    const formContent = (
        <ConfigurableForm
            mode="readonly"
            {...formItemLayout}
            form={form}
            path={formPath}
            initialValues={formData} />
    );

    return (
        <Popover
            content={<div style={{ width }}>{formContent}</div>}
            title={formTitle ? formTitle : "Display Property Not Set in Forms Designer"}>
            <Button type="link">{formTitle ? formTitle : "Display Property Not Set in Forms Designer"}</Button>
        </Popover>
    );
};

export default QuickView;