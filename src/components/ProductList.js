import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const { filtered_products: products, gird_view } = useFilterContext()
  if (products?.length < 1) {
    return <h2 style={{ textTransform: "none" }}>
      Sorry,no producst matched your search...
    </h2>
  }
  if (gird_view === false) {
    return <ListView products={products} />
  }
  return <GridView products={products}
  >product list</GridView>
}

export default ProductList
