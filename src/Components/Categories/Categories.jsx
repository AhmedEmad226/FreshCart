import React, { useEffect, useState } from "react";
import style from "./Categories.module.css";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getCategories() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data.data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>

      {isLoading ? (
        <div className="flex justify-center">
          <Loading />
        </div>
      ) : (
        <div className="flex justify-evenly flex-wrap mx-auto">
          {categories.map((category) => {
            return (
              <div className="w-full sm:w-1/2 lg:w-1/3 p-5 my-3" key={category._id}>
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <div className="h-[150px] lg:h-[300px]">
                      <img
                        className="rounded-t-lg object-cover object-center w-full h-full"
                        src={category.image}
                        alt={category.name}
                      />
                    </div>
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-[var(--main-color)] dark:text-white">
                        {category.name}
                      </h5>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
