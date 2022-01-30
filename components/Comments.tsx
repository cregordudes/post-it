import React, {useState, useEffect} from 'react';
import moment from 'moment';
import parse  from 'html-react-parser';
import { getComments } from '../services';

const Comments = ({slug}:any) => {
   const [comments, setComments] = useState([]);

   useEffect(()=> {
      getComments(slug)
         .then((result) => setComments(result))
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

  return (
   <div>
      {comments.length > 0 && (
         <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 text-black'>
            <div className='text-xl mb-8 font-semibold border-b pb-4 text-cgblue'>
             <span>{comments.length}</span> 
             <span> Comments</span> 
            </div>
            {comments.map((comment):any => (
               <div key={comment.createdAt} className='border-b border-gray-100 mb-4 pb-4'>
                  <p className='mb-4'>
                     <span className='font-semibold text-aqua'>{comment.name}</span>

                     <span> on </span> 

                     <span className='font-bold'>{ moment(comment.createdAt).format('DD, MMM, YYYY')}</span> 
                  </p>
                  <p className='whitespace-pre-line text-gray-600 w-full'>
                     {parse(comment.comment)}
                  </p>
               </div>
            ))}
         </div>
      )}
   </div>
   );
};

export default Comments;
