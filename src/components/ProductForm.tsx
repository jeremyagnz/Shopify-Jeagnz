import { useState, useEffect } from 'react';
import type { Product } from '../data/products';
import { Button } from './Button';

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Omit<Product, 'id'>) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

// Price format validation: $XX.XX (e.g., $79.99)
const PRICE_FORMAT_REGEX = /^\$\d+(\.\d{2})?$/;

const ProductForm = ({ product, onSubmit, onCancel, isSubmitting = false }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || '',
    description: product?.description || '',
    featured: product?.featured || false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        featured: product.featured || false,
      });
    }
  }, [product]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (!PRICE_FORMAT_REGEX.test(formData.price)) {
      newErrors.price = 'Price must be in format $XX.XX (e.g., $79.99)';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    await onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Product Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors dark:bg-slate-700 dark:border-slate-600 dark:text-white ${
            errors.name ? 'border-red-500' : 'border-slate-300'
          }`}
          placeholder="e.g., Classic Jeans"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Price *
        </label>
        <input
          type="text"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          disabled={isSubmitting}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors dark:bg-slate-700 dark:border-slate-600 dark:text-white ${
            errors.price ? 'border-red-500' : 'border-slate-300'
          }`}
          placeholder="$79.99"
        />
        {errors.price && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.price}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={isSubmitting}
          rows={4}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors resize-vertical dark:bg-slate-700 dark:border-slate-600 dark:text-white ${
            errors.description ? 'border-red-500' : 'border-slate-300'
          }`}
          placeholder="Describe the product features and benefits..."
        />
        {errors.description && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
          disabled={isSubmitting}
          className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700"
        />
        <label htmlFor="featured" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
          Featured Product
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1 bg-slate-600 hover:bg-slate-700"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
