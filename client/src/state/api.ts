import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface product {
    productId: string;
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
}

export interface NewProduct {
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number
}

export interface SalesSummary{
    salesSummaryId: string;
    totalValue: number;
    changePrecentage?: number;
    date: string;
}

export interface PurchaseSummary{
    purchaseSummaryId: string;
    totalPurchased: number;
    changePresentage?: number;
    date: string;
}

export interface ExpenseSummary{
    expenseSummaryId: string;
    totalExpenses: number;
    date: string;
}

export interface ExpenseByCategorySummary{
    expenseByCategorySummaryId: string;
    category: string;
    amount: string;
    date: string;
}


export interface DashboardMetrics {
    popularProducts: product[];
    salesSummary: SalesSummary[];
    purchaseSummary: PurchaseSummary[];
    expenseSummary: ExpenseSummary[];
    expenseByCategorySummary: ExpenseByCategorySummary[];
}

export interface User {
    userId: string;
    name: string;
    email: string;
}

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: "api" ,
    tagTypes:["DashboardMetrics","Products","Users"],
    endpoints: (build) => ({
        //Dashbord Metrics
        getDashboardMetrics: build.query <DashboardMetrics, void> ({
            query: () => "/dashboard",
            providesTags: ["DashboardMetrics"],
        }),
        //Get Products
        getProducts:  build.query <product[], { search?: string; page?: number; limit?: number }> ({
            query: ({ search = "", page = 1, limit = 20 }) => ({
               url:"/products",
               params:{search, page, limit},
        }),
            providesTags: ["Products"],
        }),
        //Create Product
        createProduct : build.mutation<product, NewProduct>({
            query: (newProduct) => ({
                url:"/products",
                method:"POST",
                body: newProduct
         }),
         invalidatesTags: ["Products"]
        }),
        //Get Users
        getUsers: build.query <User[], void> ({
            query: () => "/users",
        }),
        //Delete Product
        deleteProduct: build.mutation<void, string>({
            query: (productId) => ({
                url: `/products/${productId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],

        }),
        //Update Product
        updateProduct: build.mutation<product, { productId: string; updatedData: Partial<product> }>({
            query: ({ productId, updatedData }) => ({
              url: `/products/${productId}`,
              method: "PATCH",
              body: updatedData,
            }),
            invalidatesTags: ["Products"],
        }),
        //Get Reports
        getInventoryReport:build.query<any, { type: string}>({
            query: (type) => `/products/inventory-report?type=${type}`,
        }),
        //Sign_Up
        signup: build.mutation<void, { name: string; email: string; password: string }>({
            query: (body) => ({
                url: "/users/signup",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Users"],

        }),
        //Sign_In
        signin: build.mutation<
        { token: string; user: User },
        { email: string; password: string }>({
            query: (body) => ({
                url: "/users/signin",
                method: "POST",
                body,
            }),

        }),
    }),
});

export const {
    useGetDashboardMetricsQuery , 
    useGetProductsQuery, 
    useCreateProductMutation,
    useGetUsersQuery,
    useDeleteProductMutation,
    useUpdateProductMutation,
    useGetInventoryReportQuery,
    useSignupMutation,
    useSigninMutation
} = api;