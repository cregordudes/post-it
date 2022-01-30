import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';

const PostCard = ({ post }:any) => {
  console.log(post);
  return (
   <div className='bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8'>
     <div className='relative overflow-hidden shadow-md pb-80 mb-6 cursor-pointer'>
        <Link href={`/post/${post.slug}`} passHref>
          <Image src={post.featuredImage.url} layout='fill'  alt="blog" className='absolute h-100 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg'/>
        </Link>
     </div>
     <h1 className='transition duration-500 text-center mb-8 cursor-pointer text-bgblue
     hover:text-cgblue text-3xl font-semibold'>
       <Link href={`/post/${post.slug}`}>
         {post.title}
       </Link>
     </h1>
      <div className='block lg:flex text-center items-center justify-center mb-8 w-full'>
        <div className='flex items-center justify-center mb-4  lg:mb-0 w-full lg:w-auto mr-8'>
            <Image alt="author" src={post.authors[0].photo.url} height="64px" width="64px" className="align-middle rounded-full" />
            <p className='text-gray-700 font-bold px-4 inline align-middle'>{post.authors[0].name}</p>
        </div>
        <div className='font-medium flex align-center justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <span className='text-dark font-semibold'>
          &nbsp; {moment(post.createdAt).format("DD, MMM, YYYY")}
          </span>
        </div>
      </div>
      <p className='text-gray-700 p-4 text-center text-lg font-normal px-4 lg:p-8'>{post.excerpt}</p>
      <div className='text-center'>
        <Link href={`/post/${post.slug}`} passHref>
          <span className='text-white italic font-medium cursor-pointer text-center
          transition duration-500 transform hover:-translate-y-1 inline-block bg-aqua text-lg
          rounded-full px-8 py-4'>Continue Reading</span>
        </Link>
      </div>
   </div>
  );
};

export default PostCard;

