import { LucideIcon } from 'lucide-react';
import React from 'react';

type StatDetail = {
    title: string;
    amount: string;
    changePresentage: number;
    IconComponent: LucideIcon;
}

type StatCardProps = {
    title: string;
    primaryIcon: JSX.Element;
    details: StatDetail[];
    dateRange: string;
  };
const StatCard = ({title, primaryIcon, details, dateRange,

}: StatCardProps) => {

    const formatPresentage = (value: number) => {
      const signal = value >= 0 ? "+" : "";
      return `${signal} $ {value.toFixed()}%`;
    };

    const getChangeColor = (value: number) =>
      value >= 0 ? "text-green-500" : "text-red-500";

  return (
  <div className='md:row-span-1 xl:row-span-2 bg-white col-span-1 shadow-md rounded-2xl flex flex-col justify-between'>
    StatCard
  </div>
  );
};

export default StatCard;