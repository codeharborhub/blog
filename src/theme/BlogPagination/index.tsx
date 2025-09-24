import React from 'react';
import { useHistory } from '@docusaurus/router';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '../../components/ui/pagination.tsx';
import { clsx } from 'clsx'

import './BlogPagination.scss'; // ✅ Import the SCSS

export const BlogPagination = ({ metadata }) => {
  const history = useHistory();

  const handleParams = () => {
    const path = history.location.pathname;
    const parts = path.split('/');
    const pageNumber = parts[parts.length - 1];
    return isNaN(pageNumber) ? 1 : parseInt(pageNumber);
  };

  const page = handleParams();

  const handlePageChange = (value: number) => {
    if (value === page) return;
    const newPagePath = value === 1 ? '/blog' : `/blog/page/${value}`;
    history.push(newPagePath);
  };

  // Generate array of page numbers with ellipses
  const generatePagination = (currentPage: number, totalPages: number) => {
    const pages: (number | 'ellipsis')[] = [];
    pages.push(1); // Always show first page

    if (currentPage > 3) pages.push('ellipsis');

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push('ellipsis');

    if (totalPages > 1) pages.push(totalPages); // Always show last page

    return pages;
  };

  if (metadata.totalPages <= 1) return null;

  const pages = generatePagination(page, metadata.totalPages);

  return (
    <Pagination className="blog-pagination">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => page > 1 && handlePageChange(page - 1)}
            className={page <= 1 ? 'blog-pagination__disabled' : 'blog-pagination__clickable'}
          />
        </PaginationItem>

        {pages.map((pageNum, index) => (
          <PaginationItem key={`${pageNum}-${index}`}>
            {pageNum === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => handlePageChange(pageNum as number)}
                isActive={page === pageNum}
                className={clsx(
                  'blog-pagination__link',
                  page === pageNum && 'blog-pagination__link--active'
                )}
              >
                {pageNum}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => page < metadata.totalPages && handlePageChange(page + 1)}
            className={page >= metadata.totalPages ? 'blog-pagination__disabled' : 'blog-pagination__clickable'}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default BlogPagination;
