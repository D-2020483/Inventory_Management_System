import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface product {
    productId: string;
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
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

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: "api" ,
    tagTypes:["DashboardMetrics"],
    endpoints: (build) => ({
        getDashboardMetrics: build.query <DashboardMetrics, void> ({
            query: () => "/dashboard",
            providesTags: ["DashboardMetrics"],
        }),
    }),
});

export const {useGetDashboardMetricsQuery} = api;