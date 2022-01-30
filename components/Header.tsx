
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { getCategories } from '../services';
  
const Header = () => {

   const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    getCategories()
      .then((newCategories) => setCategories(newCategories))
  }, []);

  return (
   <div className='container mx-auto px-10 mb-8 text-white'>
      <div className='border-b w-full inline-block border-blue-100 py-8'>
         <div className='md:float-left block'>
            <Link href="/" passHref>
               <span className='cursor-pointer font-bold text-4xl text-white'>
                  Post-It
               </span>
            </Link>
         </div>
         <div className='hidden md:float-left md:contents'>
            {categories.map((category:any) => (
               <Link key={category.slug} href={`/category/${category.slug}`} passHref>
                  <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
                     {category.name}
                  </span>
               </Link>
            ))}
         </div>
      </div>

   </div>
   );
};

export default Header;
