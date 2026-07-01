// src/components/ui/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <Link 
      to={`/products/${product.id}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-200 hover:-translate-y-1 border border-steel-blue/10 no-underline block h-full flex flex-col"
    >
      <div className="relative h-48 bg-[#EDF0F6] overflow-hidden flex-shrink-0">
        <img 
          src={product.img} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        {product.badge && (
          <div 
            className="absolute top-3 left-3 px-2.5 py-1 rounded text-xs font-bold font-barlow"
            style={{ 
              background: product.badgeColor, 
              color: product.badgeColor === "#F5A800" ? "#0F1A2E" : "#ffffff" 
            }}
          >
            {product.badge}
          </div>
        )}
      </div>
      
      {/* Card Body - Flex column with flex-1 on content area */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs font-semibold uppercase tracking-widest font-barlow text-primary-blue flex-shrink-0">
          {product.category}
        </p>
        <h3 className="font-bold font-barlow-condensed text-lg text-deep-navy leading-tight line-clamp-2 flex-shrink-0">
          {product.name}
        </h3>
        <p className="text-xs font-barlow text-slate-gray mb-4 flex-shrink-0">Brand: {product.brand}</p>
        
        {/* Spacer that pushes the button to the bottom */}
        <div className="flex-1" />
        
        <div className="flex items-center justify-between flex-shrink-0">
          <span className="text-lg font-black font-barlow-condensed text-steel-blue">
            ₱{product.price.toLocaleString()}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded bg-steel-blue text-white hover:bg-opacity-90 transition">
            View Details <ChevronRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;