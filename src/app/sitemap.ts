import { BlogPostsResponse } from "@/models/BlogPost";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.BASE_URL || process.env.VERCEL_URL;
  const response = await fetch("https://dummyjson.com/posts");
  const { posts }: BlogPostsResponse = await response.json();

  const postUrls: MetadataRoute.Sitemap = posts.map((el) => ({
    url: `${baseUrl}/posts/${el.id}`,
    // lastModified: new Date(el.updateAt)
    // changeFrequency: "daily"
    // priority: el.id
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
    },
    {
      url: `${baseUrl}/privacy`,
    },
    ...postUrls,
  ];
}
