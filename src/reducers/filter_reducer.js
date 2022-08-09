import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((p) => p.price)
      maxPrice = Math.max(...maxPrice);
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filter: { ...state.filter, max_price: maxPrice, price: maxPrice }
      }
    case SET_GRIDVIEW:
      return { ...state, gird_view: true };
    case SET_LISTVIEW:
      return { ...state, gird_view: false }
    case UPDATE_SORT:
      return { ...state, sort: action.payload }
    case SORT_PRODUCTS:
      const { filtered_products, sort } = state
      let tempProducts = []
      if (sort === "price-lowest") {
        tempProducts = filtered_products.sort((a, b) => a.price - b.price)
      }
      if (sort === "price-highest") {
        tempProducts = filtered_products.sort((a, b) => b.price - a.price)
      }
      if (sort === "name-a") {
        tempProducts = filtered_products.sort((a, b) => a.name.localeCompare(b.name))
      }
      if (sort === "name-z") {
        tempProducts = filtered_products.sort((a, b) => b.name.localeCompare(a.name))
      }
      return { ...state, filter_reducer: tempProducts }
    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return {
        ...state, filter: {
          ...state.filter, [name]: value
        }
      }
    case FILTER_PRODUCTS:
      const { all_products } = state
      const { text,
        category,
        company,
        color,
        price,
        shipping } = state.filter
      let temp_products = [...all_products]
      // text
      if (text) {
        temp_products = temp_products.filter((product) => {
          return product.name.toLowerCase().startsWith(text)
        })
      }
      // category
      if (category !== "all") {
        temp_products = temp_products.filter((product) => {
          return product.category === category
        })
      }
      // company
      if (company !== "all") {
        temp_products = temp_products.filter((product) => {
          return product.company === company
        })
      }
      // colors
      if (color !== "all") {
        temp_products = temp_products.filter((product) => {
          return product.colors.find((c) => c === color)
        })
      }
      // price
      temp_products = temp_products.filter((product) => product.price <= price)
      // shipping
      if (shipping) {
        temp_products = temp_products.filter((product) => {
          return product.shipping === true
        })
      }
      return { ...state, filtered_products: temp_products }
    case CLEAR_FILTERS:
      return {
        ...state,
        filter: {
          ...state.filter,
          text: "",
          category: "all",
          company: "all",
          color: "all",
          price: state.filter.max_price,
          shipping: false,
        }
      }
    default:
      break;
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
