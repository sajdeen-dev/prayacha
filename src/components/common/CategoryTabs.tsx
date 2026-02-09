import React from 'react'

interface CategoryTabsProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {categories.map((name) => (
        <button
          key={name}
          onClick={() => onCategoryChange(name)}
          className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-full font-poppins text-sm sm:text-base transition-all duration-200 ${
            activeCategory === name
              ? 'bg-[#164F84] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {name}
        </button>
      ))}
    </div>
  )
}

export default CategoryTabs
