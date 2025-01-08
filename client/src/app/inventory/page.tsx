"use client"

import { useGetProductsQuery , useDeleteProductMutation } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useState } from "react";


const Inventory = () => {
    const {data: products, isError, isLoading, refetch} = useGetProductsQuery();
    const [deleteProduct] = useDeleteProductMutation();
    const [deleting, setDeleting] = useState(false);

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
                color="error"
                size="small"
                disabled={deleting}
                onClick={() => handleDelete(params.row.productId)}
            >
                Delete
            </Button>
            <br></br>
            <Button 
                variant="contained"
                size="small"
                disabled={deleting}
                onClick={() => handleDelete(params.row.productId)}
            >
                update
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

  return <div className="flex flex-col">
    <Header name = "Inventory" />
    <DataGrid 
       rows={products}
       columns={columns}
       getRowId={(row) => row.productId}
       checkboxSelection
       className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
    />
  </div>
  
};

export default Inventory;