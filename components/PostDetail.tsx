import moment from 'moment';
import Image from 'next/image';
import React from 'react';

const PostDetail = ({post}:any) => {
   const getContentFragment = (index:any, text:any, obj:any, type?:any) => {
      let modifiedText = text;
  
      if (obj) {
        if (obj.bold) {
          modifiedText = (<b key={index}>{text}</b>);
        }
  
        if (obj.italic) {
          modifiedText = (<em key={index}>{text}</em>);
        }
  
        if (obj.underline) {
          modifiedText = (<u key={index}>{text}</u>);
        }
      }
  
      switch (type) {
        case 'heading-three':
          return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item:any, i:any) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
        case 'paragraph':
          return <p key={index} className="mb-8">{modifiedText.map((item:any, i:any) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
        case 'heading-four':
          return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item:any, i:any) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
        case 'image':
          return (
            <Image
              key={index}
              alt={obj.title}
              height={obj.height}
              width={obj.width}
              src={obj.src}
            />
          );
        default:
          return modifiedText;
      }
    };
  



  return (
      <div className='bg-white text-black shadow-lg rounded-lg lg:p-8 pb-12 mb-8'>
         <div className='relative overflow-hidden shadow-md mb-6'>
            <Image src={post.featuredImage.url} alt="post" 
            width="100%" height="50%" layout='responsive'
            className='object-top object-fill h-full w-full rounded-t-lg' />
         </div>
         <div className='px-4 lg:px-0'>
            <div className='flex items-center mb-8 w-full'>
            <div className='block lg:flex text-center items-center justify-center mb-8 w-full'>
               <div className='font-medium flex align-center justify-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
                     <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span className='text-dark font-semibold'>
                  &nbsp; {moment(post.createdAt).format("DD, MMM, YYYY")}
                  </span>
               </div>
               </div>
            </div>
            <h1 className='mb-8 text-3xl text-bgblue font-semibold'>{post.title}</h1>
            {post.content.raw.children.map((typeObj:any, index:any) => {
               const children = typeObj.children.map((item:any,itemIndex:any) => getContentFragment(itemIndex, item.text, item))
               
               return getContentFragment(index, children, typeObj, typeObj.type)
            })}
         </div>
      </div>
  );
};

export default PostDetail;
