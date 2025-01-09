import { product, useGetProductsQuery } from "@/state/api";
import React from "react";

interface inventoryTableProps {
    onEdit: (product: product) => void;
}

const inventoryTable: React.FC<inventoryTableProps> = ({onEdit}) => {
    const {data: products, isLoading} = useGetProductsQuery ({ search: "", page: 1, limit: 20});

    if(isLoading) return <div>Loading inventory...</div>;

    return(
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products?.map((product) => (
                    <tr key={product.productId}>
                        <td>{product.name}</td>
                        <td>{product.price.toFixed(2)}</td>
                        <td>{product.stockQuantity}</td>
                        <td>
                            <button onClick={() => onEdit(product)}>Edit</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default inventoryTable;