"use client"

import { useGetProductsQuery , useDeleteProductMutation , useUpdateProductMutation, product } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Modal, TextField } from "@mui/material";
import { useState } from "react";


const Inventory = () => {
    const {data: products, isError, isLoading, refetch} = useGetProductsQuery({
        search: "",
        page:1,
        limit: 20,
    });
    const [deleteProduct] = useDeleteProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleting, setDeleting] = useState(false);
    const [editProduct , setEditProduct] = useState<product | null>(null);

const columns: GridColDef[] =[
    {field: "productId", headerName:"ID", width: 90},
    {field: "name", headerName:"Product Name", width: 200},
    {
        field: "price", 
        headerName:"Price", 
        width: 110, 
        type: "number", 
        valueGetter: (value, row) =>`$${row.price}`
    },

    {
        field: "rating", 
        headerName:"Rating", 
        width: 110, 
        type: "number", 
        valueGetter: (value, row) => row.rating ? row.rating : "N/A",
    },

    {
        field: "stockQuantity", 
        headerName:"Stock Quantity", 
        width: 150, 
        type: "number", 
    },

    {
        field: "actions",
        headerName:"Actions",
        width: 150,
        renderCell: (params) => (
            <div>
            <Button 
                variant="contained"
                size="small"
                onClick={() => setEditProduct(params.row)}
            > 
            <button type = "button" className="mt-1 px-1 py-0">
               Update
            </button>
            </Button>
            <Button 
                variant="contained"
                color="error"
                size="small"
                disabled={deleting}
                onClick={() => handleDelete(params.row.productId)}
            >
               <button type = "button" className="mt-1 px-1 py-0">
               Delete
            </button>
            </Button>
            
            </div>
        ),
    },
    
];

const handleDelete = async(productId: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
        try {
            setDeleting(true);
            await deleteProduct(productId).unwrap();
            alert("Product deleted successfully!")
            refetch();
        } catch (error) {
            alert("Failed to delete the product. Please try again.");
        } finally {
            setDeleting(false);
        }
    }
};

const handleUpdate = async() => {
    if (!editProduct || !editProduct.productId) return;
    try {
        const {productId, ...updatedData} = editProduct;
        await updateProduct({ productId, updatedData}).unwrap();
        alert("Product updated successfully!");
        setEditProduct(null);
        refetch();
      } catch (error) {
        console.error(error);
        alert("Failed to update the product. Please try again.");
      }
};

    if(isLoading) {
        return <div className="py-4">Loading...</div>;
    }

    if(isError || !products) {
        return(
            <div className="text-center text-red-500 py-4">
                Error while loading products
            </div>
        );
    };

  return (
  <div className="flex flex-col">
    <Header name = "Inventory" />
    <DataGrid 
       rows={products}
       columns={columns}
       getRowId={(row) => row.productId}
       checkboxSelection
       className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
    />

    <Modal open= {!!editProduct} onClose={() => setEditProduct(null)}>
        <div className="p-6 bg-white shadow-lg rounded-lg mx-auto mt-24 w-96">
            <h2 text-xl font-semibold mb-4>Update Product</h2>
            <TextField
                label="Product Name"
                fullWidth
                margin="normal"
                value={editProduct?.name || ""}
                onChange={(e) => 
                    setEditProduct((prev) => 
                   prev ? {...prev, name: e.target.value}: null 
                 )
               }
            />
            <TextField
            label="Price"
            fullWidth
            margin="normal"
            type="number"
            value={editProduct?.price || ""}
            onChange={(e) => 
                setEditProduct((prev) => 
                    prev ? {...prev, price: parseFloat(e.target.value) || 0 }: null 
                  )
            }   
          />
           <TextField
            label="Stock Quantity"
            fullWidth
            margin="normal"
            type="number"
            value={editProduct?.stockQuantity|| ""}
            onChange={(e) => 
                setEditProduct((prev) => 
                    prev ? {...prev, stockQuantity: parseInt(e.target.value, 10) || 0 }
            : null 
                  )
            }   
          />
        <div className="mt-4 flex justify-end space-x-2">
            <button type="button" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={handleUpdate}>
              Update
            </button>
            <button type="button" className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700" onClick={() => setEditProduct(null)}>
              Cancel
            </button>
           </div> 
        </div>
    </Modal>
  </div>
  );
};

export default Inventory;