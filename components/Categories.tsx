import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { getCategories } from '../services';

const Categories = () => {
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    getCategories()
      .then((newCategories) => setCategories(newCategories))
  }, []);
  //console.log(categories)

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8 text-black pb-12'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4 text-cgblue'>
        Categories
      </h3>
      {categories.map((category:any, index:any) => (
          <Link key={index} href={`/category/${category.slug}`} passHref>
            <span className='cursor-pointer block pb-3 mb-3 text-emerald-600 font-semibold'>
              {category.name}
            </span>
          </Link>
      ))
      }
    </div>
  );
};

export default Categories;
