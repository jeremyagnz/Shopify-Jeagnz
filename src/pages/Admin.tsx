import { useState, useEffect } from 'react';
import type { Product } from '../data/products';
import { productApi } from '../services/api';
import { useToast } from '../contexts/ToastContext';
import ProductForm from '../components/ProductForm';
import { Button } from '../components/Button';
import LoadingBanner from '../components/LoadingBanner';
import ErrorBanner from '../components/ErrorBanner';

// Error message for API unavailability
const API_UNAVAILABLE_MESSAGE = 
  'API not available. Changes will not persist. Deploy to Netlify to enable full functionality.';

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      try {
        const response = await productApi.getAll() as { status: string; data: Product[]; message?: string };
        if (response.status === 'success') {
          setProducts(response.data);
        } else {
          throw new Error(response.message || 'Failed to load products');
        }
      } catch (apiError) {
        // If API fails (e.g., in development without Netlify Dev),
        // fall back to static data
        console.warn('API not available, using static data:', apiError);
        const { products: staticProducts } = await import('../data/products');
        setProducts(staticProducts);
        showToast('Using demo data - API not available', 'info');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load products';
      setError(errorMessage);
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleCreate = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await productApi.delete(id) as { status: string; message?: string };
      if (response.status === 'success') {
        showToast('Product deleted successfully', 'success');
        await loadProducts();
      } else {
        throw new Error(response.message || 'Failed to delete product');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete product';
      showToast(API_UNAVAILABLE_MESSAGE, 'error');
      console.error(errorMessage);
    }
  };

  const handleSubmit = async (productData: Omit<Product, 'id'>) => {
    setIsSubmitting(true);
    try {
      let response: { status: string; data?: Product; message?: string };
      if (editingProduct) {
        response = await productApi.update(editingProduct.id, productData) as { status: string; data?: Product; message?: string };
      } else {
        response = await productApi.create(productData) as { status: string; data?: Product; message?: string };
      }

      if (response.status === 'success') {
        showToast(
          editingProduct ? 'Product updated successfully' : 'Product created successfully',
          'success'
        );
        setShowForm(false);
        setEditingProduct(null);
        await loadProducts();
      } else {
        throw new Error(response.message || 'Failed to save product');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save product';
      showToast(API_UNAVAILABLE_MESSAGE, 'error');
      console.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
        <LoadingBanner />
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorBanner message={error} onRetry={loadProducts} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Product Management</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Manage your product catalog
            </p>
          </div>
          {!showForm && (
            <Button onClick={handleCreate}>
              + Add New Product
            </Button>
          )}
        </div>

        {showForm && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <ProductForm
              product={editingProduct || undefined}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isSubmitting={isSubmitting}
            />
          </div>
        )}

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    Featured
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                      {product.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900 dark:text-white max-w-md truncate">
                      {product.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">
                      {product.featured ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-slate-400">No products found. Add your first product!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
