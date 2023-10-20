export const DOI_CHECK_REGEX = /doi:10\.\d+\/\S+/;

export function formatDate(date: string) {
  const opts: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
  const fmtd = new Intl.DateTimeFormat('en-US', opts).format(new Date(date));
  return fmtd;
}
