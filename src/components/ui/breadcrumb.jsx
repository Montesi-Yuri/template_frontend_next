import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import PropTypes from 'prop-types';

export function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center space-x-2 text-sm bg-white/50 dark:bg-prussian-darker/50 backdrop-blur-sm 
      px-4 py-2 rounded-xl shadow-sm mb-6">
      <Link 
        href="/dashboard" 
        className="flex items-center text-ivory hover:text-indigo-light transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4 text-ash-darker dark:text-ash" />
          {item.href ? (
            <Link 
              href={item.href}
              className="text-ivory hover:text-ash-darker dark:text-ash transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-prussian-darker dark:text-ivory font-medium">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string
    })
  ).isRequired
}; 