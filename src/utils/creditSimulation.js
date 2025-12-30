const commonTenors = [12, 24, 36, 48, 60, 72, 84];

const formatRupiah = (number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);

const formatInputDisplay = (number) => {
  if (number === 0 || number === null || number === undefined || isNaN(number)) return '';
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
  return `Rp ${formatted}`;
};
const cleanInputToNumber = (value) => {
  if (!value) return 0;
  const cleanValue = value.replace(/[^0-9]/g, '');
  return Number(cleanValue) || 0;
};
const hitungAngsuran = (otrNumber, dp, tenor, bunga) => {
  if (otrNumber <= 0 || tenor <= 0) return 0;
  const loanAmount = otrNumber - dp;
  const totalBunga = loanAmount * bunga * (tenor / 12);
  return (loanAmount + totalBunga) / tenor;
};
const toSlug = (text) => {
  if (!text) return '';
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};
const slugToModelName = (targetSlug, models) => {
  return models.find(item => toSlug(item.model) === targetSlug)?.model;
};
export {commonTenors, formatRupiah, formatInputDisplay, cleanInputToNumber, hitungAngsuran, toSlug, slugToModelName}