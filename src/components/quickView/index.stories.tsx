import React from 'react';
import { QuickView, IQuickViewProps } from '../..';
import { Meta } from '@storybook/react/types-6-0';
import { Story } from '@storybook/react';
import { ShaApplicationProvider } from '../../providers';
import AuthContainer from '../authedContainer';
import { Button } from 'antd';

// #region Storybook Metadata & Configuration

export default {
    title: 'Components/QuickView',
    component: QuickView,
} as Meta;

const backendUrl = process.env.STORYBOOK_BASE_URL;

// #endregion

// #region Base Mapping Template and Props

const BaseTemplate: Story<IQuickViewProps> = props => {
    return (
        <ShaApplicationProvider backendUrl={backendUrl}>
            <AuthContainer layout>
                <QuickView {...props}>
                    <Button type="link">Hello</Button>
                </QuickView>
            </AuthContainer>
        </ShaApplicationProvider>
    );
};

const baseProps: IQuickViewProps = {
    entityId: '0cdad6b0-a3b2-4cf6-9b7d-238d753f0657',
    formPath: 'quickview-his-health-facilities-details',
    getEntityUrl: '/api/services/Common/HisHealthFacility/Get',
    displayProperty: null
};

export const Base = BaseTemplate.bind({});
Base.args = { ...baseProps };

// #endregion
