import { CardBlog } from "@/components/card";
import { getBlogs } from "@/lib/blog";
import { IBlogs } from "@/type/blog";


export default async function Home() {

  const blogs = await getBlogs()

  return (
    <div className="flex flex-wrap h-screen items-center justify-center">
      <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">

      {
        blogs.map((items: IBlogs) => {
          return (
            <CardBlog
              key={items.sys.id}
              title={items.fields.title}
              slug={items.fields.slug} 
              img={items.fields.img.fields.file.url}
              img_profile={items.fields.author.fields.image.fields.file.url}
              author={items.fields.author.fields.name}
              email={items.fields.author.fields.email}
              />
          )
        })
      }
      </div>
    </div>
  );
}
