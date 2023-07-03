import { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Layer as Dialog,
  Box,
  Text,
  Button,
  FormField,
  TextInput,
  Select,
  Spinner,
  ResponsiveContext,
} from 'grommet';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  fetchHazardFeatures,
  createHazardFeature,
  fetchHazardCategories,
  fetchHazardTypes,
  hazardSelector,
} from 'store/hazard/slice';
import { HazardCategory } from 'types/hazard/HazardCategories';
import { HazardType } from 'types/hazard/HazardType';
import { ApiState } from 'types/apiState';

type EditDialogProps = {
  coords: [number, number];
  onClose: () => void;
};

type HazardFormFieldValues = {
  category: HazardCategory | undefined;
  hazard_type: HazardType | undefined;
  comment: string | undefined;
};

const PostHazardSchema = Yup.object().shape({
  category: Yup.object().required('Category is required'),
  hazard_type: Yup.object().required('Hazard type is required'),
  comment: Yup.string().required('Comment is required'),
});

const EditDialog = (props: EditDialogProps) => {
  const { coords, onClose } = props;
  const dispatch = useDispatch<any>();
  const size = useContext(ResponsiveContext);
  const { hazardCategories, hazardTypes, service, status } =
    useSelector(hazardSelector);
  const handleSubmit = (values: HazardFormFieldValues) => {
    dispatch(
      createHazardFeature({
        Longitude: coords[0],
        Latitude: coords[1],
        'Category.Id': values.category?.id,
        'HazardType.Id': values.hazard_type?.id,
        Comment: values.comment || '',
      }),
    );
  };

  useEffect(() => {
    if (service === 'createHazardFeature' && status === ApiState.fulfilled) {
      dispatch(fetchHazardFeatures());
      onClose();
    }
  }, [service, status]);

  useEffect(() => {
    dispatch(fetchHazardCategories());
    dispatch(fetchHazardTypes());
  }, []);

  return (
    <Dialog
      modal={true}
      responsive={false}
      onEsc={onClose}
      onClickOutside={onClose}
    >
      <Box pad="small" width={size === 'small' ? '100%' : '400px'}>
        <Box
          pad={{ vertical: 'small' }}
          margin={{ bottom: 'small' }}
          border={{
            size: 'xsmall',
            style: 'solid',
            color: 'brand',
            side: 'bottom',
          }}
        >
          <Text size="medium">Create a new hazard data</Text>
        </Box>
        <Formik
          validationSchema={PostHazardSchema}
          initialValues={{
            category: undefined,
            hazard_type: undefined,
            comment: undefined,
          }}
          onSubmit={values => handleSubmit(values)}
        >
          {({ values, errors, handleChange, setFieldValue }) => (
            <Form>
              <FormField
                name="category"
                label="Category"
                error={errors.category}
              >
                <Select
                  name="category"
                  options={hazardCategories}
                  placeholder="Select category"
                  labelKey="name"
                  valueKey="id"
                  value={values.category}
                  onChange={({ option }) => setFieldValue('category', option)}
                />
              </FormField>
              <FormField
                name="hazard_type"
                label="Hazard type"
                error={errors.hazard_type}
              >
                <Select
                  name="hazard_type"
                  options={hazardTypes}
                  placeholder="Select hazard type"
                  labelKey="name"
                  valueKey="id"
                  value={values.hazard_type}
                  onChange={({ option }) =>
                    setFieldValue('hazard_type', option)
                  }
                />
              </FormField>
              <FormField name="comment" label="Comment" error={errors.comment}>
                <TextInput
                  name="comment"
                  size="small"
                  value={values.comment || ''}
                  onChange={handleChange}
                />
              </FormField>
              <Box
                pad={{ vertical: 'small' }}
                direction="row"
                align="center"
                justify="end"
                gap="small"
              >
                <Button label="Cancel" onClick={onClose} />
                <Button
                  type="submit"
                  primary={true}
                  icon={
                    service === 'createHazardFeature' &&
                    status === ApiState.pending ? (
                      <Spinner size="small" color="white" />
                    ) : undefined
                  }
                  label="Submit"
                />
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Dialog>
  );
};

export default EditDialog;
