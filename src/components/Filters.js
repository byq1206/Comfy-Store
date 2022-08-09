import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const {
    filter: {
      text,
      category,
      company,
      color,
      min_price,
      price,
      max_price,
      shipping },
    updateFilters,
    clearFilters,
    all_products,
  } = useFilterContext();

  const categories = getUniqueValues(all_products, "category")
  const companys = getUniqueValues(all_products, "company")
  let colors = getUniqueValues(all_products, "colors")
  return <Wrapper>
    <div className="content">
      <form onSubmit={(e) => e.preventDefault()}>
        {/* search input */}
        <div className="form-control">
          <input type="text"
            name='text'
            id='text'
            className='search-input'
            placeholder='search'
            value={text}
            onChange={updateFilters}
          />
        </div>
        {/* Categories */}
        <div className="form-control">
          <h5>Categories</h5>
          {
            categories.map((c, index) => {
              return <button
                key={index}
                value={c}
                name="category"
                onClick={updateFilters}
                className={`${category === c.toLowerCase()
                  ? "active" : null}`}
              >
                {c}
              </button>
            })
          }
        </div>
        {/* companys */}
        <div className="form-control">
          <h5>Companys</h5>
          <select name="company"
            id="company"
            onChange={updateFilters}
            className="company"
            value={company}
          >
            {companys.map((c, index) => {
              return <option
                key={index}
                value={c}
              >{c}</option>
            })}
          </select>
        </div>
        {/* colors */}
        <div className="form-control">
          <h5>Colors</h5>
          <div className="colors">
            {
              colors.map((c, index) => {
                if (c === "all") {
                  return <button
                    className={`${color === c ? "all-btn active" : "all-btn"}`}
                    key={index} name="color"
                    onClick={updateFilters}
                    data-color={"all"}
                  >
                    all
                  </button>
                }
                return <button
                  style={{ background: c }}
                  className={`${color === c ? "color-btn active" : "color-btn"}`}
                  key={index} name="color"
                  onClick={updateFilters}
                  data-color={c}
                >
                  {color === c ? <FaCheck /> : null}
                </button>
              })
            }
          </div>
        </div>
        {/* price */}
        <div className="form-control">
          <h5>price</h5>
          <p>{formatPrice(price)}</p>
          <input type="range"
            name='price'
            min={min_price}
            max={max_price}
            onChange={updateFilters}
            value={price}
          />
        </div>
        {/* shipping */}
        <div className="form-control shipping">
          <label htmlFor="shipping">free shipping</label>
          <input type="checkbox"
            name="shipping"
            id="shipping"
            onChange={updateFilters}
            checked={shipping}
          // className="shipping"
          />
        </div>
      </form>
      <button type='button'
        onClick={clearFilters}
        className='clear-btn'
      >
        Clear Filters
      </button>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .shipping input{
    width:16px;
    height:16px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters