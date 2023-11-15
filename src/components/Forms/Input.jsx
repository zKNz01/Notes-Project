import React from 'react';
import styles from './Input.module.css';

const Input = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  onBlur,
  className,
  placeholder,
  defaultValue,
  autoComplete,
}) => {
  return (
    <>
      <label htmlFor={name}>
        {label}
        <input
          autoComplete={autoComplete}
          className={className}
          placeholder={placeholder}
          id={name}
          name={name}
          type={type}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
        />
      </label>
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
};

export default Input;
