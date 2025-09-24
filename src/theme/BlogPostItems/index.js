import React from "react";
import Link from "@docusaurus/Link";
import Image from "@theme/IdealImage";
import useBaseUrl from "@docusaurus/useBaseUrl";

import BlogPostItem from "@theme/BlogPostItem";
import TagsListInline from "@theme/TagsListInline";

import TimeStamp from "../../components/TimeStamp";
import { Avatar } from "../../components/ui/avatar";
import { Card, CardContent, CardFooter } from "../../components/ui/card";

import "./BlogPostItems.scss"; // ✅ Import SCSS

export default function BlogPostItems({
  items,
  component: BlogPostItemComponent = BlogPostItem,
}) {
  return (
    <div className="blog-items">
      {items.map((blog) => (
        <div
          key={blog.content.metadata.permalink}
          className="blog-items__card-wrapper"
        >
          <Card className="blog-items__card">
            <Link
              to={blog.content.metadata.permalink}
              className="blog-items__image-link"
            >
              <Image
                className="blog-items__image"
                img={useBaseUrl(blog.content.metadata.frontMatter.image)}
                alt={blog.content.metadata.title}
                loading="lazy"
              />
            </Link>

            <CardContent className="blog-items__content">
              <Link
                to={blog.content.metadata.permalink}
                className="blog-items__title-link"
              >
                <p className="blog-items__title">
                  {blog.content.metadata.title.slice(0, 60) +
                    (blog.content.metadata.title.length > 60 ? "..." : "")}
                </p>
              </Link>

              <p className="blog-items__description">
                {blog.content.metadata.description.slice(0, 120) +
                  (blog.content.metadata.description.length > 120 ? "..." : "")}
              </p>

              <div className="blog-items__meta">
                {blog.content.metadata.authors.map((author, index) => (
                  <Link
                    href={author.page.permalink}
                    title={author.name}
                    key={index}
                    className="blog-items__author"
                  >
                    <Avatar>
                      <Image
                        alt={author.name}
                        img={useBaseUrl(author.imageURL)}
                        className="blog-items__author-avatar"
                      />
                    </Avatar>
                  </Link>
                ))}

                <div className="blog-items__timestamp">
                  <span>
                    <TimeStamp timestamp={blog.content.metadata.date} />
                  </span>
                  <span className="blog-items__dot">•</span>
                  <span>{Math.ceil(blog.content.metadata.readingTime)} min read</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="blog-items__footer">
              {blog.content.metadata.tags.length > 0 && (
                <div className="blog-items__tags">
                  <TagsListInline tags={blog.content.metadata.tags} />
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
