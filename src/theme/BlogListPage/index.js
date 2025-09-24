import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import BlogLayout from "@theme/BlogLayout";
import SearchMetadata from "@theme/SearchMetadata";
import BlogPostItems from "@theme/BlogPostItems";
import Image from "@theme/IdealImage";
import useBaseUrl from "@docusaurus/useBaseUrl";

import { BlogPagination } from "../BlogPagination";
import "./BlogListPage.scss"; // ✅ Import SCSS

function BlogListPageMetadata(props) {
  const { metadata } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === "/";
  const title = isBlogOnlyMode ? siteTitle : blogTitle;

  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogHomepageBanner(props) {
  const blogMetadata = props.metadata;
  const imageDefault = {
    urlBannerBg: "/img/blog-banner-4.jpg",
    urlAvatar: "/img/avatar.jpg",
  };

  return (
    <div className="blog-banner">
      <div className="blog-banner__image-wrapper">
        <Image
          img={useBaseUrl(imageDefault.urlBannerBg)}
          alt="Blog banner"
          className="blog-banner__image"
          loading="lazy"
        />

        {/* Optional Avatar (if needed) */}
        {/* <Image
          img={useBaseUrl(imageDefault.urlAvatar)}
          alt="avatar blog"
          className="blog-banner__avatar"
          width={100}
          height={100}
          loading="lazy"
        /> */}
      </div>

      <div className="blog-banner__content">
        {/* <h2 className="blog-banner__title">{blogMetadata.blogTitle}</h2> */}
        <p className="blog-banner__description">
          {blogMetadata.blogDescription}
        </p>
      </div>
    </div>
  );
}

function BlogListPageContent(props) {
  const { metadata, items, sidebar } = props;

  return (
    <BlogLayout sidebar={sidebar}>
      <BlogHomepageBanner {...props} />
      <BlogPostItems items={items} />
      <BlogPagination metadata={metadata} />
    </BlogLayout>
  );
}

export default function BlogListPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage
      )}
    >
      <BlogListPageMetadata {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
