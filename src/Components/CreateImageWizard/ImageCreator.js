import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import Pf4FormTemplate from '@data-driven-forms/pf4-component-mapper/form-template';
import { componentMapper } from '@data-driven-forms/pf4-component-mapper';
import { Spinner } from '@patternfly/react-core';
import PropTypes from 'prop-types';
import Review from './formComponents/ReviewStep';
import TargetEnvironment from './formComponents/TargetEnvironment';
import Packages from './formComponents/Packages';
import RadioWithPopover from './formComponents/RadioWithPopover';
import AzureAuthButton from './formComponents/AzureAuthButton';
import Select from '@data-driven-forms/pf4-component-mapper/select';

const ImageCreator = ({ schema, onSubmit, onClose, customComponentMapper, defaultArch, className, ...props }) => {
    return schema ? <FormRenderer
        schema={ schema }
        className={ `image-builder${className ? ` ${className}` : ''}` }
        subscription={ { values: true } }
        FormTemplate={ (props) => <Pf4FormTemplate { ...props } showFormControls={ false } /> }
        onSubmit={ (formValues) => onSubmit(formValues) }
        componentMapper={ {
            ...componentMapper,
            review: Review,
            output: TargetEnvironment,
            select: Select,
            'package-selector': {
                component: Packages,
                defaultArch
            },
            'radio-popover': RadioWithPopover,
            'azure-auth-button': AzureAuthButton,
            ...customComponentMapper
        } }
        onCancel={ onClose }
        { ...props } /> : <Spinner />;
};

ImageCreator.propTypes = {
    schema: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    customComponentMapper: PropTypes.shape({
        [PropTypes.string]: PropTypes.oneOfType([ PropTypes.node, PropTypes.shape({
            component: PropTypes.node
        }) ])
    }),
    defaultArch: PropTypes.string,
    className: PropTypes.string
};

export default ImageCreator;
