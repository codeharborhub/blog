import clsx from 'clsx'
import Layout from '@theme/Layout'
import BlogSidebar from '@theme/BlogSidebar'

export default function BlogLayout(props) {
  const { sidebar, toc, children, ...layoutProps } = props
  const hasSidebar = sidebar && sidebar.items.length > 0

  return (
    <Layout {...layoutProps}>
      <div className='px-4 py-8 mt-4'>
        <div className='row'>
          <BlogSidebar sidebar={sidebar} />
          <main
            className={clsx('col', {
              'col--9': hasSidebar && !toc,
              'col--7': hasSidebar && toc,
              'col--3 col--offset-1': !hasSidebar
            })}
          >
            {children}
          </main>
          {toc && <div className='col col--2'>{toc}</div>}
        </div>
      </div>
    </Layout>
  )
}
