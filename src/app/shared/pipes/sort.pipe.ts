import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

 transform(products: any[], sortOption: string): any[] {
    if (!products || !sortOption) return products;

    switch (sortOption) {
      case 'Price: Low to High':
        return [...products].sort((a, b) => a.price - b.price);
      case 'Price: High to Low':
        return [...products].sort((a, b) => b.price - a.price);
      case 'A → Z':
        return [...products].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return products;
    }
  }

}
