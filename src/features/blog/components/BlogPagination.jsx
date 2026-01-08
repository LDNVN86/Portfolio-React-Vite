import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const DOTS = Symbol("dots");

const getPaginationRange = (currentPage, totalPages, siblingCount = 1) => {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + siblingCount * 2;
    const leftRange = Array.from(
      { length: leftItemCount },
      (_, index) => index + 1
    );
    return [...leftRange, DOTS, totalPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + siblingCount * 2;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, index) => totalPages - rightItemCount + 1 + index
    );
    return [firstPageIndex, DOTS, ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSiblingIndex - leftSiblingIndex + 1 },
    (_, index) => leftSiblingIndex + index
  );
  return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
};

const BlogPagination = ({ currentPage, totalPages, onPageChange, strings }) => {
  if (totalPages <= 1) return null;

  const paginationRange = getPaginationRange(currentPage, totalPages);

  return (
    <nav
      className="mt-8 flex justify-center"
      aria-label={strings?.paginationLabel ?? "Pagination"}
    >
      <div className="flex items-center gap-2 rounded-2xl bg-[var(--surface-elevated)]/60 px-2 py-2 shadow-sm">
        {/* Previous */}
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          aria-label={strings?.paginationPrev ?? "Previous page"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[var(--accent-soft)]"
        >
          <FiChevronLeft className="text-base" />
        </button>

        {/* Page numbers */}
        {paginationRange.map((item, index) => {
          if (item === DOTS) {
            return (
              <span
                key={`dots-${index}`}
                className="px-2 text-sm font-medium text-[var(--text-muted)]"
              >
                …
              </span>
            );
          }

          const pageNumber = item;
          const isActive = currentPage === pageNumber;
          return (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onPageChange(pageNumber)}
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-xl px-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-[var(--accent-soft)] text-[var(--accent-contrast)] shadow"
                  : "text-[var(--text-primary)] hover:bg-[var(--accent-soft)]/60"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        {/* Next */}
        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          aria-label={strings?.paginationNext ?? "Next page"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-[var(--accent-soft)]"
        >
          <FiChevronRight className="text-base" />
        </button>
      </div>
    </nav>
  );
};

export default BlogPagination;
