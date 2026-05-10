import { AddBrandDialog } from "@/components/brands/AddBrandDialog";
import BrandCard from "@/components/brands/BrandCard";
import { Button } from "@/components/ui/button";

import { sans, serif } from "@/lib/fonts";
import { deleteBrand, getAllBrands } from "@/store/actions/brandsActions";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import useBrands from "@/hooks/Brands/useBrands";

export const Brands = () => {
  const { brands, isLoading, handleDeleteBrand } = useBrands();
  return (
    <div>
      <header className="flex  justify-between ">
        <h1 className="text-2xl font-light text-neutral-800" style={serif}>
          Manage Brands
        </h1>
        <AddBrandDialog />
      </header>
      <div className=" mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {brands.map((brand) => {
          return (
            <div>
              <BrandCard key={brand._id} brand={brand} />
              <Button
                onClick={() => handleDeleteBrand(brand._id)}
                className=" mt-2 bg-red-500 text-white gap-2 rounded-none text-[10px] tracking-[0.2em] uppercase cursor-pointer"
                style={sans}
                disabled={isLoading}
              >
                <Trash2 size={13} />

                {isLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
};
