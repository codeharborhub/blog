import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import BlogSidebar from '@theme/BlogSidebar'

import './BlogLayout.scss' // Import the SCSS file

export default function BlogLayout(props) {
  const { sidebar, toc, children, ...layoutProps } = props
  const hasSidebar = sidebar && sidebar.items.length > 0

  return (
    <Layout {...layoutProps}>
      <div className="blog-layout">
        <div className="blog-layout__row">
          <BlogSidebar sidebar={sidebar} hideOnDesktop />
          <main
            className={clsx('blog-layout__main', {
              'blog-layout__main--full': hasSidebar && !toc,
              'blog-layout__main--with-toc': hasSidebar && toc,
              'blog-layout__main--no-sidebar': !hasSidebar
            })}
          >
            {children}
          </main>
          {toc && <div className="blog-layout__toc">{toc}</div>}
        </div>
      </div>
    </Layout>
  )
}