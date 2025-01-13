import { useState } from 'react';

const ReviewCard = ({ author, content, createdAt }) => {
  const maxLength = 250;
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine truncated or full content
  const shouldTruncate = content.length > maxLength;
  const displayedContent =
    isExpanded || !shouldTruncate
      ? content
      : content.slice(0, maxLength) + '...';
  return (
    <li className="bg-gray-50 p-4 rounded-md shadow-sm">
      <p className="text-gray-700">
        {displayedContent}
        {shouldTruncate && !isExpanded}
      </p>
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-400 text-sm font-semibold focus:outline-none mt-1"
        >
          {isExpanded ? 'Show less' : 'Read more...'}
        </button>
      )}

      <span className="text-sm text-gray-400 font-mono block">
        - {author} | {createdAt.substring(0, 10)}
      </span>
    </li>
  );
};

export default ReviewCard;
