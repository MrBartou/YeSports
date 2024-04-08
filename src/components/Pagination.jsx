import PropTypes from 'prop-types';

function Pagination({ currentPage, totalPages, onPageChange, perPage, totalItems }) {
  const firstItemIndex = (currentPage - 1) * perPage + 1;
  const lastItemIndex = Math.min(firstItemIndex + perPage - 1, totalItems);

  return (
    <div className="flex flex-col items-center pt-5">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Teams <span className="font-semibold text-gray-900 dark:text-white">{firstItemIndex}</span> à <span className="font-semibold text-gray-900 dark:text-white">{lastItemIndex}</span> sur <span className="font-semibold text-gray-900 dark:text-white">{totalItems}</span> Teams
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          disabled={currentPage <= 1}
        >
          Précédent
        </button>
        <button
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          disabled={currentPage >= totalPages}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  perPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
};

export default Pagination;
