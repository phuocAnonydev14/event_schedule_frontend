import NumericFormat, { NumberFormatProps } from 'react-number-format';

function NumberFormat({ ...passProps }: NumberFormatProps) {
  return <NumericFormat thousandSeparator {...passProps} />;
}

export default NumberFormat;
