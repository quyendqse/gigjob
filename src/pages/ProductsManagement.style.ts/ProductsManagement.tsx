import { Box, Typography, Button, Grid } from '@mui/material';
import React, { useState } from 'react';

export const ProductsManagement = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      url: 'https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-blue-1-600x600.jpg',
      name: 'Product 1',
      price: 10.99,
      description: 'Product 1 description...',
    },
    {
      id: 2,
      url: 'https://www.xtmobile.vn/vnt_upload/product/Hinh_DT/Iphone/thumbs/(600x600)_crop_iphone-12-pro-128-gb-xtmobile.jpg',
      name: 'Product 2',
      price: 15.99,
      description: 'Product 2 description...',
    },
    {
      id: 3,
      url: 'https://www.xtmobile.vn/vnt_upload/product/04_2021/thumbs/(600x600)_crop_ip_X_gray_800x800_2.jpg',
      name: 'Product 3',
      price: 12.99,
      description: 'Product 3 description...',
    },
    {
      id: 4,
      url: 'https://prices.vn/storage/photos/7/product/1603023702-djien-thoai-iphone-12.jpg',
      name: 'Product 1',
      price: 10.99,
      description: 'Product 1 description...',
    },
    {
      id: 5,
      url: 'https://www.xtmobile.vn/vnt_upload/product/Hinh_DT/Iphone/thumbs/(600x600)_crop_iphone-12-pro-128-gb-xtmobile.jpg',
      name: 'Product 2',
      price: 15.99,
      description: 'Product 2 description...',
    },
    {
      id: 6,
      url: 'https://www.xtmobile.vn/vnt_upload/product/04_2021/thumbs/(600x600)_crop_ip_X_gray_800x800_2.jpg',
      name: 'Product 3',
      price: 12.99,
      description: 'Product 3 description...',
    },
    {
      id: 7,
      url: 'https://cdn.tgdd.vn/Products/Images/42/223602/iphone-13-blue-1-600x600.jpg',
      name: 'Product 1',
      price: 10.99,
      description: 'Product 1 description...',
    },
    {
      id: 8,
      url: 'https://www.xtmobile.vn/vnt_upload/product/Hinh_DT/Iphone/thumbs/(600x600)_crop_iphone-12-pro-128-gb-xtmobile.jpg',
      name: 'Product 2',
      price: 15.99,
      description: 'Product 2 description...',
    },
    {
      id: 9,
      url: 'https://www.xtmobile.vn/vnt_upload/product/04_2021/thumbs/(600x600)_crop_ip_X_gray_800x800_2.jpg',
      name: 'Product 3',
      price: 12.99,
      description: 'Product 3 description...',
    },
  ]);

  // const handleAddProduct = () => {
  //   const newProduct = {
  //     id: products.length + 1,
  //     url: 'https://example.com/image.jpg',
  //     name: 'New Product',
  //     price: 0.0,
  //     description: 'New Product description...',
  //   };

  //   setProducts([...products, newProduct]);
  // };

  const handleEditProduct = (id:any) => {
    // Tìm sản phẩm theo id và thực hiện các thao tác sửa sản phẩm
    // Sau khi sửa sản phẩm, cập nhật lại danh sách sản phẩm
  };

  const handleDeleteProduct = (id:any) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Box sx={{ border: '1px solid #ccc', p: 2 }}>
              <img style={{ width: '100%', height: 'auto' }} src={product.url} alt={`Image ${product.id}`} />
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body1">Price: ${product.price}</Typography>
              <Typography variant="body2">{product.description}</Typography>
              <Button variant="contained" onClick={() => handleEditProduct(product.id)}>
                Edit
              </Button>
              <Button variant="contained" color="error" onClick={() => handleDeleteProduct(product.id)}>
                Delete
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
