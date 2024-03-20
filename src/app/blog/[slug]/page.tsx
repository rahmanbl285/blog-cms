import ShareButton from "@/components/share"
import { formatDate } from "@/helper/formatDate"
import { getBlogSlug, getBlogs } from "@/lib/blog"
import { IBlogs } from "@/type/blog"
import { Options, documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import Link from "next/link"

export const revalidate = 3600

export const generateStaticParams = async () => {
    const users = await getBlogs()

    return users.map((blog: IBlogs) => ({
        params: {
            slug: blog.fields.slug
        }
    }))
}

export async function generateMetadata({params}: { params: { slug: string}}) {
    const blog = await getBlogSlug(params.slug)

    return {
        title: blog.fields.title,
        description: blog.fields.title,
        authors: blog.fields.author.fields.name,
        images: `https:${blog.fields.img.fields.file.url}`
    }
}

export default async function BlogDetail({ params }: { params: { slug: string }}) {
    const blog = await getBlogSlug(params.slug)

    const options: Options = {
        renderNode: {
            [BLOCKS.HEADING_1]: (node, children) => <h1 className="my-[2.5px] md:text-3xl sm:text-2xl text-xl">{children}</h1>,
            [BLOCKS.HEADING_2]: (node, children) => <h2 className="my-[2.5px] md:text-2xl sm:text-xl text-lg">{children}</h2>,
            [BLOCKS.HEADING_3]: (node, children) => <h3 className="my-5 md:text-xl sm:text-lg text-base">{children}</h3>,
            [BLOCKS.HEADING_4]: (node, children) => <h4 className="my-5 md:text-lg sm:text-base text-sm">{children}</h4>,
            [BLOCKS.HEADING_5]: (node, children) => <h5 className="my-10 md:text-base sm:text-sm text-xs">{children}</h5>,
            [BLOCKS.HEADING_6]: (node, children) => <h6 className="my-10 mb-20 md:text-base sm:text-sm text-xs">{children}</h6>,
            [BLOCKS.PARAGRAPH]: (node, children) => <p className="mb-2">{children}</p>,
            [BLOCKS.LIST_ITEM]: (node, children) => <li className="ml-10 list-disc">{children}</li>,
        }
    }

    return (
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-[1200px] p-4">
            <div className="flex">
                
                {/* button back */}
                <div className="flex-1 sticky max-md:hidden top-[100px] h-full">
                    <Link href={`/`} className="flex items-center gap-2">
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                        </svg>
                        back
                    </Link>
                <ShareButton slug={blog.fields.slug} className="mt-5"/>
                </div>

                <div className="flex-[2] pr-52 max-lg:pr-0">
                {/* title */}
                    <h5 className="mb-2 text-[32px] max-md:text-[24px] font-bold tracking-tight text-gray-900 dark:text-white">{blog.fields.title}</h5>
                        
                {/* author name & date */}
                        <div className="flex gap-3">
                            <p className="font-bold text-[16px] max-md:text-[14px]">{blog.fields.author.fields.name}</p>
                            <p className="text-[16px] max-md:text-[14px]">{formatDate(blog.fields.date)}</p>
                        </div>
                        <ShareButton slug={blog.fields.slug} className="hidden max-md:block" />
                
                {/* image */}
                    <img className="h-[350px] max-sm:h-[200px] max-md:h-[300px] w-full my-5 shadow" src={`https:${blog.fields.img.fields.file.url}`} alt={blog.fields.title} />
                        
                {/* isi content */}
                        <div className="text-justify">
                            {documentToReactComponents(blog.fields.content, options)}    
                        </div>
                </div>        
            </div>
         </div> 
    )
}