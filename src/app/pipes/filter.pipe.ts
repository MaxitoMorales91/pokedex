import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'Filter', pure: false })
export class FilterList implements PipeTransform {
  transform(items: any, filter: any): any {
    if (!filter.getVisibleItems) {
      filter.getVisibleItems = function () {
        return !items || !filter
          ? items
          : items.filter((item: any) => this.applyFilter(item, filter));
      }.bind(this);
    }
    if (!filter.getHideItems) {
      filter.getHideItems = function () {
        return !items || !filter
          ? []
          : items.filter((item: any) => !this.applyFilter(item, filter));
      }.bind(this);
    }

    return !items || !filter
      ? items
      : items.filter((item: any) => this.applyFilter(item, filter));
  }

  applyFilter(book: any, filter: any): boolean {
    if (book.object) {
      book = book.object;
    }
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          let campo1 = book[field] ? String(book[field]).toLowerCase() : '';
          let campo2 = filter[field] ? String(filter[field]).toLowerCase() : '';
          if (
            this.removeSpecial(campo1).indexOf(this.removeSpecial(campo2)) ===
            -1
          ) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (book[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }

  removeSpecial(s: string) {
    var r = s.toLowerCase();
    r = r.replace(new RegExp(/\s/g), '');
    r = r.replace(new RegExp(/[àáâãäå]/g), 'a');
    r = r.replace(new RegExp(/æ/g), 'ae');
    r = r.replace(new RegExp(/ç/g), 'c');
    r = r.replace(new RegExp(/[èéêë]/g), 'e');
    r = r.replace(new RegExp(/[ìíîï]/g), 'i');
    r = r.replace(new RegExp(/ñ/g), 'n');
    r = r.replace(new RegExp(/[òóôõö]/g), 'o');
    r = r.replace(new RegExp(/œ/g), 'oe');
    r = r.replace(new RegExp(/[ùúûü]/g), 'u');
    r = r.replace(new RegExp(/[ýÿ]/g), 'y');
    r = r.replace(new RegExp(/\W/g), '');
    return r;
  }
}
