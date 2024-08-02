import ClapButton from "@/components/ClapButton";
import { delay } from "@/lib/utils";
import { BlogPost, BlogPostsResponse } from "@/models/BlogPost";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogPostPageProps {
  params: { postId: string };
}

export async function generateStaticParams() {
  const response = await fetch("https://dummyjson.com/posts");
  const { posts }: BlogPostsResponse = await response.json();

  return posts.map((el) => el.id);
}

export async function generateMetadata({
  params: { postId },
}: BlogPostPageProps): Promise<Metadata> {
  const response = await fetch(`https://dummyjson.com/posts/${postId}`);
  const { title, body }: BlogPost = await response.json();

  // const resPhoto = await fetch(
  //   `https://jsonplaceholder.typicode.com/photos/${postId}`
  // );
  // const { url } = await resPhoto.json();
  return {
    title: title || "Empty",
    description: body,
    // openGraph: {
    //   images: [{ url }],
    // },
  };
}

export default async function BlogPostPage({
  params: { postId },
}: BlogPostPageProps) {
  const response = await fetch(`https://dummyjson.com/posts/${postId}`);
  const { title, body }: BlogPost = await response.json();

  await delay(1000);

  if (response.status === 404) return notFound();

  return (
    <article className="max-w-prose m-auto space-y-5">
      <h1 className="text-3xl text-center font-bold">{title}</h1>
      <p className="text-lg">{body}</p>
      <ClapButton />
    </article>
  );
}
