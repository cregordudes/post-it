import React, {useState, useEffect} from 'react';
import moment from 'moment';
import Link from 'next/link';
import { getRecentPosts, getSimilarPosts } from '../services';
import Image from 'next/image';


const PostWidget = ({categories="Web Development", slug}:any) => {
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result);
        //console.log(slug);
      });
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);


  //console.log(relatedPosts);

  return (
  <div className='bg-white shadow-lg rounded-lg p-8 mb-8 text-black'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4 text-cgblue'>
        {slug ? 'Related Posts' : 'Recent Posts'}
      </h3>
      {relatedPosts.map((post)=> (

        <div key={post.title} className='flex items-center w-full mb-4'>
          <div className='w-16 flex-none cursor-pointer'>
          <Link href={`/post/${post.slug}`} passHref >
            <Image alt={post} height="60px" width="60px" src={post.featuredImage.url} className="rounded-lg"/>
          </Link>
          </div>
          <div className='flex-grow ml-4 cursor-pointer'>
            <p className='text-gray-500 font-xs'>
            <Link href={`/post/${post.slug}`} passHref>
              {moment(post.createdAt).format("DD, MMM, YYYY")}
            </Link>
            </p>
            <Link href={`/post/${post.slug}`} passHref>
              <span className='text-md text-gray-700'>{post.title}</span>
            </Link>
          </div>
        </div>
      ))}
  </div>
  );
};

export default PostWidget;
