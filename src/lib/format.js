const numberFormat = new Intl.NumberFormat('az-AZ');
const timeFormat = new Intl.DateTimeFormat('az-AZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

export const formatNumber = (value) => numberFormat.format(value);
export const formatTime = (date) => timeFormat.format(date);