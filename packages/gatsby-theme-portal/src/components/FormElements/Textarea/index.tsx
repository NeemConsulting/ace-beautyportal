import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import useStyles from '../styles';

const Textarea: FunctionComponent<TextareaInterface> = ({
  label,
  id,
  value,
  onChange,
}) => {
  const classes = useStyles();
  return (
    <div
      className={classNames('c-form__field', classes.field, classes.textField)}
    >
      <textarea
        id={id}
        autoComplete={id}
        onChange={onChange}
        aria-label={label}
      ></textarea>
      <label htmlFor={id} aria-hidden="true">
        {label}
      </label>
    </div>
  );
};

export default Textarea;

interface TextareaInterface {
  label: string;
  id: string;
  value: string;
  onChange: any;
}
