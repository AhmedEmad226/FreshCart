import React, { useEffect, useState } from 'react';
import style from './Products.module.css';
import axios from 'axios';
import Loading from '../Loading/Loading';

export default function Products() {
  const [searchValue, setSearchValue] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // For search results
  const [isLoading, setIsLoading] = useState(true);

  async function getProducts() {
    try {
      setIsLoading(true);
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      setProducts(data.data);
      setFilteredProducts(data.data); // Initially, filtered = all products
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  function startSearch(event) {
    event.preventDefault();
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredProducts(filtered);
  }

  return (
    <>
      {/* Search Form */}
      <form className="flex items-center max-w-sm mx-auto" onSubmit={startSearch}>
        <div className="relative w-full">
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Search product name..."
            required
          />
        </div>
        <button
          type="submit"
          className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800"
        >
          Search
        </button>
      </form>

      {isLoading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <div className="flex justify-evenly flex-wrap mx-auto">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <div className="bg-slate-700 text-white p-4 m-2 w-full sm:w-1/2 lg:w-1/3 rounded-lg" key={item._id}>
                <img src={item.imageCover} alt={item.title} className="w-full h-[200px] object-cover rounded-md"/>
                <h2 className="font-bold">{item.title.split(' ', 3).join(' ')}</h2>
                <p className="text-gray-300">{item.subcategory[0]?.name}</p>
                <p className="text-[gold]"> <i className='fas fa-star'></i> {item.ratingsAverage}</p>
                <p className="text-[var(--main-color)]">${item.price}</p>
              </div>
            ))
          ) : (
            <p className="text-red-500 text-center w-full mt-5">No products have been found <i className="fas fa-face-frown"></i></p>
          )}
        </div>
      )}
    </>
  );
}
