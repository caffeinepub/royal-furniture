import { useState, useEffect } from 'react';
import { useAddProduct, useUpdateProduct } from '../../hooks/useQueries';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { Product } from '../../backend';
import { ProductCategory, ExternalBlob } from '../../backend';

interface ProductFormModalProps {
  open: boolean;
  onClose: () => void;
  product?: Product | null;
}

export default function ProductFormModal({ open, onClose, product }: ProductFormModalProps) {
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [discount, setDiscount] = useState('');
  const [category, setCategory] = useState<ProductCategory>(ProductCategory.sofa);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);

  useEffect(() => {
    if (product) {
      setId(product.id);
      setName(product.name);
      setDescription(product.description);
      setPrice(Number(product.price).toString());
      setStock(Number(product.stock).toString());
      setDiscount(product.discount ? Number(product.discount).toString() : '');
      setCategory(product.category);
    } else {
      resetForm();
    }
  }, [product]);

  const resetForm = () => {
    setId('product_' + Date.now());
    setName('');
    setDescription('');
    setPrice('');
    setStock('');
    setDiscount('');
    setCategory(ProductCategory.sofa);
    setImageFiles([]);
    setUploadProgress([]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
      setUploadProgress(Array.from(e.target.files).map(() => 0));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !description.trim() || !price || !stock) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const images: ExternalBlob[] = [];
      
      if (imageFiles.length > 0) {
        for (let i = 0; i < imageFiles.length; i++) {
          const file = imageFiles[i];
          const arrayBuffer = await file.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
            setUploadProgress((prev) => {
              const newProgress = [...prev];
              newProgress[i] = percentage;
              return newProgress;
            });
          });
          images.push(blob);
        }
      } else if (product) {
        images.push(...product.images);
      }

      const productData: Product = {
        id: product ? product.id : id,
        name: name.trim(),
        description: description.trim(),
        price: BigInt(parseInt(price)),
        stock: BigInt(parseInt(stock)),
        discount: discount ? BigInt(parseInt(discount)) : undefined,
        category,
        images,
        reviews: product?.reviews || [],
        createdAt: product?.createdAt || BigInt(Date.now() * 1000000),
        updatedAt: BigInt(Date.now() * 1000000),
      };

      if (product) {
        await updateProduct.mutateAsync({ id: product.id, product: productData });
        toast.success('Product updated successfully!');
      } else {
        await addProduct.mutateAsync(productData);
        toast.success('Product added successfully!');
      }

      onClose();
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-playfair text-2xl">
            {product ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name *</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="stock">Stock *</Label>
              <Input
                id="stock"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                id="discount"
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                min="0"
                max="100"
              />
            </div>
            <div>
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={(value) => setCategory(value as ProductCategory)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ProductCategory.sofa}>Sofa</SelectItem>
                  <SelectItem value={ProductCategory.familySofa}>Family Sofa</SelectItem>
                  <SelectItem value={ProductCategory.officeChair}>Office Chair</SelectItem>
                  <SelectItem value={ProductCategory.tables}>Tables</SelectItem>
                  <SelectItem value={ProductCategory.beds}>Beds</SelectItem>
                  <SelectItem value={ProductCategory.diningSets}>Dining Sets</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="images">Product Images</Label>
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            {uploadProgress.length > 0 && (
              <div className="mt-2 space-y-1">
                {uploadProgress.map((progress, i) => (
                  <div key={i} className="text-sm text-luxury-dark/60">
                    Image {i + 1}: {progress}%
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={addProduct.isPending || updateProduct.isPending}
              className="bg-gold-600 hover:bg-gold-700"
            >
              {addProduct.isPending || updateProduct.isPending ? 'Saving...' : 'Save Product'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
