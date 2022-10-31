import { convertPLNToUSD } from './../convertPLNtoUSD';
describe('ConvertPLNtoUSD', () => {

  it('should return proper value when good input', () => {
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
  });

  it('should return NaN when value is string', () => {
    expect(convertPLNToUSD("1")).toBeNaN();
    expect(convertPLNToUSD("fsdfds")).toBeNaN();
    expect(convertPLNToUSD("abc")).toBeNaN();
  });

  it('should return NaN when value empty', () => {
    expect(convertPLNToUSD()).toBeNaN();
  })

  it('should return error when value is not empty and not string and not number', () => {
    expect(convertPLNToUSD([])).toBe('Error');
    expect(convertPLNToUSD({})).toBe('Error');
    expect(convertPLNToUSD(function() {})).toBe('Error');
    expect(convertPLNToUSD(true)).toBe('Error');
  })

  it('should return $0.00 when value is lower than 0', () => {
    expect(convertPLNToUSD(-1)).toBe('$0.00');
    expect(convertPLNToUSD(-0.67)).toBe('$0.00');
    expect(convertPLNToUSD(-21)).toBe('$0.00');
    expect(convertPLNToUSD(-323123)).toBe('$0.00');
  })
});
export const convertPLNToUSD = (PLN) => {
  if (typeof PLN === "undefined")
    return NaN;
  if (typeof PLN === "string")
    return NaN;
  if (typeof PLN !== "number")
    return "Error";
  if (PLN < 0)
    return "$0.00";

  const PLNtoUSD = PLN / 3.5;
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
}