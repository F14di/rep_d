import { MatPaginatorIntl } from '@angular/material/paginator';


const hebrewRangeLabel = (page, pageSize, length) => {
  if (length === 0 || pageSize === 0) {
    return '0 מ ' + length;
  }
  length = Math.max(length, 0);
  const startIndex = page * pageSize;
  const endIndex = startIndex < length ?
    Math.min(startIndex + pageSize, length) :
    startIndex + pageSize;
  return startIndex + 1 + ' - ' + endIndex + ' מ ' + length;
};


export function getHebrewPaginatorIntl(): MatPaginatorIntl {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'שורות בעמוד';
  paginatorIntl.nextPageLabel = 'הבא';
  paginatorIntl.previousPageLabel = 'הקודם';
  paginatorIntl.getRangeLabel = hebrewRangeLabel;

  return paginatorIntl;
};
