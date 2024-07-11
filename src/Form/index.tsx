import CoreForm from './Form';
import * as Yup from 'yup';
import moment from 'moment';
const schema: any = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    validation: Yup.string()
      .min(3, 'First Name should be more than 3 characters')
      .max(10)
      .required('Required'),
    initialValue: '',
    grid: { xs: 12, sm: 6 },
    props: { className: 'input-firstname' },
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    validation: Yup.string().email('Invalid email').required('Required'),
    initialValue: '',
    grid: { xs: 12, sm: 6 },
    props: { className: 'input-email' },
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    validation: Yup.string().min(8).required('Required'),
    initialValue: '',
    grid: { xs: 12, sm: 6 },
    props: { className: 'input-password' },
  },
  {
    name: 'number',
    label: 'Number',
    type: 'number',
    validation: Yup.number().required('Required'),
    initialValue: '',
    grid: { xs: 12, sm: 6 },
    props: { className: 'input-number' },
  },
  {
    name: 'occupation',
    label: 'Occupation',
    type: 'radio',
    options: { student: 'Student', teacher: 'Teacher', engineer: 'Engineer' },
    initialValue: 'student',
    validation: Yup.string().required('Required'),
    grid: { xs: 12, sm: 6 },
    props: { className: 'input-occupation' },
  },
  {
    name: 'hobbies',
    label: 'Hobbies',
    type: 'checkbox',
    options: { painting: 'Painting', reading: 'Reading', coding: 'Coding' },
    initialValue: ['painting'],
    validation: Yup.array()
      .of(Yup.string())
      .min(1, 'Select at least one hobby.'),
    grid: { xs: 12, sm: 6 },
    props: { className: 'input-hobbies' },
  },
  {
    name: 'rating',
    label: 'Rating',
    type: 'rating',
    initialValue: '0',
    validation: Yup.number().required('Required'),
    grid: { xs: 12, sm: 6 },
    props: { className: 'input-rating' },
  },
  {
    name: 'gender',
    label: 'Gender',
    type: 'select',
    initialValue: '',
    options: { male: 'Male', female: 'Female', other: 'Other' },
    validation: Yup.string().required('Required'),
    grid: { xs: 12, sm: 6 },
    props: { className: 'input-gender' },
  },
  {
    name: 'percentage',
    label: 'Percentage',
    type: 'slider',
    initialValue: 50,
    validation: Yup.number().required('Required'),
    grid: { xs: 12, sm: 6 },
    props: { className: 'input-percentage' },
  },
  {
    name: 'activate',
    label: 'Activate',
    type: 'switch',
    initialValue: false,
    validation: Yup.boolean().required('Required'),
    grid: { xs: 12, sm: 6 },
    props: { className: 'input-activate' },
  },
  {
    name: 'date',
    label: 'Date Time',
    type: 'date',
    initialValue: moment().format('MMMM Do YYYY'),
    validation: Yup.string()
    .required('Date is required')
    .test('is-before', 'Date must be less than the current date', function(value) {
      const dateToCheck = moment(value, 'MMMM Do YYYY');
      return dateToCheck.isBefore(moment());
    }),
    props: {
      format: 'MMMM Do YYYY',
      disableFuture: true,
      className: 'input-datetime',
    },
    grid: { xs: 12, sm: 6 },
  },
  
  {
    name: 'time',
    label: 'Time',
    type: 'time',
    initialValue: moment().format('LT'),
    validation: Yup.string()
    .required('Time is required')
    .test('is-before', 'Time must be less than the current time', function(value) {
      const timeToCheck = moment(value, 'LT');
      return timeToCheck.isBefore(moment());
    }),
    props: {
      format: 'LT',
      className: 'input-time',
    },
    grid: { xs: 12, sm: 6 },
  },
  {
    name: 'datetime',
    label: 'Date Time',
    type: 'datetime',
    initialValue: moment().format('MMMM Do YYYY LT'),
    validation: Yup.string()
    .required('Date Time is required')
    .test('is-before', 'Date Time must be less than the current date time', function(value) {
      const dateTimeToCheck = moment(value, 'MMMM Do YYYY LT');
      return dateTimeToCheck.isBefore(moment());
    }),
    props: {
      format: 'MMMM Do YYYY LT',
      disableFuture: true,
      className: 'input-datetime',
    },
    grid: { xs: 12, sm: 6 },
  },
  {
    name: 'submit',
    label: 'Submit',
    type: 'submit',
    grid: { xs: 12, sm: 12, md: 12, lg: 12 },
    props: {
      color: 'primary',
      variant: 'contained',
      alignItems: 'center',
      className: 'input-submit',
    },
  },
];

function Form() {
  return (
    <>
      <CoreForm
        schema={schema}
        onSubmit={(values) => {
          console.log(JSON.stringify(values));
        }}
        autoSubmitOnChange={true}
      />
    </>
  );
}

export default Form;
