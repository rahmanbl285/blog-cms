import { splitStr } from "@/helper/splitStr"
import Link from "next/link"

interface ICardBlog {
    title: string
    img: string
    img_profile: string
    email: string
    author: string
    slug: string
}

export const CardBlog: React.FC<ICardBlog> = ({ title, img, img_profile, email, author, slug }) => {
    return (


<div className="w-[300px] h-fit bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    
    {/* image */}
    <img className="rounded-t-lg object-cover h-[200px] w-full" 
    src={`https:${img}`} 
    alt={title} />
    
    {/* title */}
    <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{splitStr(title, 55)}</h5>
    
    <div className="flex items-center my-5">
    {/* author image */}
        <div className=" flex-shrink-0 ">
            <img src={`https:${img_profile}`} 
            alt="Author Image"
            className="h-10 w-10 object-cover rounded-full" />
        </div>
    
    {/* author name & email */}
        <div className="flex-1 min-w-0 ms-4">
            <p className="text-sm font-medium text-gray-700 truncate">{author}</p>
            <p className="text-sm font-medium text-gray-400 truncate">{email}</p>
        </div>
    </div>

    {/* button */}
        <Link href={`/blog/${slug}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </Link>

    </div>
</div>

    )
}