import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  Checkbox,
  Rating,
  Select,
  MenuItem,
  Slider,
  Switch,
  InputLabel,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
  FormHelperText,
  Box,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
// 3rd party packages for customized input fields
//import DatePicker from 'react-multi-date-picker';
//import TimePicker from 'react-multi-date-picker/plugins/time_picker';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment';

type BaseField = {
  name: string;
  label: string;
  type: string;
  validation: any;
  initialValue: any;
  props?: { [key: string]: any };
  options?: { [key: string]: string };
  grid: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    textAlign?: 'left' | 'right' | 'center' | 'justify' | 'inherit';
  };
};

type FormProps = {
  schema: BaseField[];
  onSubmit: (values: { [key: string]: any }) => void;
  autoSubmitOnChange?: boolean;
};

const Form: React.FC<FormProps> = ({
  schema,
  onSubmit,
  autoSubmitOnChange = false,
}) => {
  let validationSchema: { [key: string]: any } = {};
  let initialValues: { [key: string]: any } = {};

  schema.forEach((field) => {
    validationSchema[field.name] = field.validation;
    initialValues[field.name] = field.initialValue;
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape(validationSchema),
    onSubmit: onSubmit,
  });
  const handleChange = (e: React.ChangeEvent<any>) => {
    console.log(e.target.value, '@frminput');
    formik.handleChange(e);
    if (autoSubmitOnChange) {
      formik.submitForm();
    }
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {schema.map((field) => {
            switch (field.type) {
              case 'text':
                return (
                  <Grid {...field.grid}>
                    <TextField
                      key={field.name}
                      type={field.type}
                      name={field.name}
                      label={field.label}
                      value={formik.values[field.name]}
                      onChange={handleChange}
                      error={
                        formik.touched[field.name] &&
                        Boolean(formik.errors[field.name])
                      }
                      helperText={
                        <label>
                          {formik.touched[field.name] &&
                            (formik.errors[field.name] as string)}
                        </label>
                      }
                      {...field.props}
                      fullWidth
                    />
                  </Grid>
                );
                break;
              case 'email':
                return (
                  <Grid {...field.grid}>
                    <TextField
                      key={field.name}
                      type={field.type}
                      name={field.name}
                      label={field.label}
                      value={formik.values[field.name]}
                      onChange={handleChange}
                      error={
                        formik.touched[field.name] &&
                        Boolean(formik.errors[field.name])
                      }
                      helperText={
                        <label>
                          {formik.touched[field.name] &&
                            (formik.errors[field.name] as string)}
                        </label>
                      }
                      {...field.props}
                      fullWidth
                    />
                  </Grid>
                );
                break;
              case 'number':
                return (
                  <Grid {...field.grid}>
                    <TextField
                      key={field.name}
                      type={field.type}
                      name={field.name}
                      label={field.label}
                      value={formik.values[field.name]}
                      onChange={handleChange}
                      error={
                        formik.touched[field.name] &&
                        Boolean(formik.errors[field.name])
                      }
                      helperText={
                        <label>
                          {formik.touched[field.name] &&
                            (formik.errors[field.name] as string)}
                        </label>
                      }
                      {...field.props}
                      fullWidth
                    />
                  </Grid>
                );
                break;
              case 'password':
                return (
                  <Grid {...field.grid}>
                    <TextField
                      key={field.name}
                      type={field.type}
                      name={field.name}
                      label={field.label}
                      value={formik.values[field.name]}
                      onChange={handleChange}
                      error={
                        formik.touched[field.name] &&
                        Boolean(formik.errors[field.name])
                      }
                      helperText={
                        <label>
                          {formik.touched[field.name] &&
                            (formik.errors[field.name] as string)}
                        </label>
                      }
                      {...field.props}
                      fullWidth
                    />
                  </Grid>
                );
                break;
              case 'radio':
                return (
                  <Grid {...field.grid}>
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Gender
                      </FormLabel>
                      <RadioGroup
                        row={true}
                        key={field.name}
                        name={field.name}
                        value={formik.values[field.name]}
                        onChange={handleChange}
                      >
                        {field.options &&
                          Object.keys(field.options).map((key) => (
                            <FormControlLabel
                              key={key}
                              value={key}
                              control={<Radio />}
                              label={field?.options?.[key] ?? ''}
                            ></FormControlLabel>
                          ))}
                      </RadioGroup>
                      <FormHelperText>
                        {formik.touched[field.name] &&
                          (formik.errors[field.name] as string)}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                );
                break;
              case 'checkbox':
                return (
                  <Grid {...field.grid}>
                    <FormControl
                      error={
                        formik.touched[field.name] &&
                        Boolean(formik.errors[field.name])
                      }
                    >
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Hobbies
                      </FormLabel>
                      <FormGroup row>
                        {field.options &&
                          Object.keys(field.options).map((key) => (
                            <FormControlLabel
                              key={key}
                              control={
                                <Checkbox
                                  checked={formik.values[field.name].includes(
                                    key,
                                  )}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      formik.setFieldValue(field.name, [
                                        ...formik.values[field.name],
                                        key,
                                      ]);
                                    } else {
                                      formik.setFieldValue(
                                        field.name,
                                        formik.values[field.name].filter(
                                          (value: string) => value !== key,
                                        ),
                                      );
                                    }
                                  }}
                                  name={field.name}
                                />
                              }
                              label={field?.options?.[key] ?? ''}
                            />
                          ))}
                      </FormGroup>
                      <FormHelperText>
                        {formik.touched[field.name] &&
                          (formik.errors[field.name] as string)}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                );
                break;
              case 'rating':
                return (
                  <Grid {...field.grid}>
                    <FormControl
                      fullWidth
                      error={
                        formik.touched[field.name] &&
                        Boolean(formik.errors[field.name])
                      }
                    >
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Rating
                      </FormLabel>
                      <Rating
                        name={field.name}
                        value={Number(formik.values[field.name])}
                        onChange={handleChange}
                      />
                      <FormHelperText>
                        {formik.touched[field.name] &&
                          (formik.errors[field.name] as string)}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                );
                break;
              case 'select':
                return (
                  <Grid {...field.grid}>
                    <FormControl
                      fullWidth
                      error={
                        formik.touched[field.name] &&
                        Boolean(formik.errors[field.name])
                      }
                    >
                      <InputLabel id="demo-row-radio-buttons-group-label">
                        {field.label}
                      </InputLabel>
                      <Select
                        name={field.name}
                        value={formik.values[field.name]}
                        label={field.label}
                        onChange={handleChange as any}
                        fullWidth
                      >
                        {field.options &&
                          Object.keys(field.options).map((key) => (
                            <MenuItem key={key} value={key}>
                              {field?.options?.[key]}
                            </MenuItem>
                          ))}
                      </Select>

                      <FormHelperText>
                        <label>
                          {formik.touched[field.name] &&
                            (formik.errors[field.name] as string)}
                        </label>
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                );
                break;
              case 'slider':
                return (
                  <Grid {...field.grid}>
                    <FormControl fullWidth>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        {field.label}
                      </FormLabel>
                      <Slider
                        name={field.name}
                        value={formik.values[field.name]}
                        onChange={(e, value) => {
                          formik.setFieldValue(field.name, value);
                        }}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        min={0}
                        max={100}
                      />
                      <FormHelperText>
                        <label>
                          {formik.touched[field.name] &&
                            (formik.errors[field.name] as string)}
                        </label>
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                );
                break;
              case 'switch':
                return (
                  <Grid {...field.grid}>
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label">
                        Switch
                      </FormLabel>
                      <Switch
                        name={field.name}
                        checked={formik.values[field.name]}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Grid>
                );
                break;
              case 'submit':
                return autoSubmitOnChange ? (
                  <></>
                ) : (
                  <Grid {...field.grid}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      {...field.props}
                    >
                      {field.label}
                    </Button>
                  </Grid>
                );
              case 'date':
                return (
                  <Grid {...field.grid}>
                    <FormControl
                      fullWidth
                      error={
                        formik.touched[field.name] &&
                        Boolean(formik.errors[field.name])
                      }
                    >
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          defaultValue={moment(
                            formik.values[field.name],
                            field?.props?.format
                              ? field?.props?.format
                              : moment().format('MM/DD/YYYY'),
                          )}
                          name={field.name}
                          onChange={(value) => {
                            formik.setFieldValue(
                              field.name,
                              moment(value).format(
                                field?.props?.format
                                  ? field?.props?.format
                                  : 'MM/DD/YYYY',
                              ),
                            );
                          }}
                        />
                      </LocalizationProvider>
                      <FormHelperText>
                        {formik.touched[field.name] &&
                          (formik.errors[field.name] as string)}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                );
              case 'time':
                return (
                  <Grid {...field.grid}>
                    <FormControl
                      fullWidth
                      error={
                        formik.touched[field.name] &&
                        Boolean(formik.errors[field.name])
                      }
                    >
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <TimePicker
                          defaultValue={moment(
                            formik.values[field.name],
                            field?.props?.format
                              ? field?.props?.format
                              : moment().format('LT'),
                          )}
                          name={field.name}
                          onChange={(value) => {
                            formik.setFieldValue(
                              field.name,
                              moment(value).format(
                                field?.props?.format
                                  ? field?.props?.format
                                  : 'LT',
                              ),
                            );
                          }}
                        />
                      </LocalizationProvider>
                      <FormHelperText>
                        {formik.touched[field.name] &&
                          (formik.errors[field.name] as string)}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                );
              case 'datetime':
                return (
                  <Grid {...field.grid}>
                    <FormControl
                      fullWidth
                      error={
                        formik.touched[field.name] &&
                        Boolean(formik.errors[field.name])
                      }
                    >
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DateTimePicker
                          defaultValue={moment(
                            formik.values[field.name],
                            field?.props?.format
                              ? field?.props?.format
                              : moment().format('DD MM YYYY hh:mm:ss'),
                          )}
                          name={field.name}
                          onChange={(value) => {
                            formik.setFieldValue(
                              field.name,
                              moment(value).format(
                                field?.props?.format
                                  ? field?.props?.format
                                  : 'DD MM YYYY hh:mm:ss',
                              ),
                            );
                          }}
                        />
                      </LocalizationProvider>
                      <FormHelperText>
                        {formik.touched[field.name] &&
                          (formik.errors[field.name] as string)}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                );
              default:
                return null;
            }
          })}
        </Grid>
      </Box>
    </form>
  );
};

export default Form;
