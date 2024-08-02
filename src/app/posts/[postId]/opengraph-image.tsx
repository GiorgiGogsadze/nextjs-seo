import Image from "next/image";
import { ImageResponse } from "next/og";

export const size = { width: 600, height: 600 };
export const contentType = "image/png";
export const runtime = "edge";

type opengraphImageProps = {
  params: { postId: string };
};
export default async function opengraphImage({
  params: { postId },
}: opengraphImageProps) {
  const resTitle = await fetch(`https://dummyjson.com/posts/${postId}`);
  const { title } = await resTitle.json();

  const resPhoto = await fetch(
    `https://jsonplaceholder.typicode.com/photos/${postId}`
  );
  const { url } = await resPhoto.json();
  console.log(title, url);

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
        }}
      >
        {/* eslint-disable */}
        <img
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            filter: "brightness(50%)",
          }}
          src={url}
        />
        <h1
          style={{
            color: "#fff",
            fontSize: "32px",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          {title}
        </h1>
      </div>
    ),
    {
      ...size,
    }
  );
}
