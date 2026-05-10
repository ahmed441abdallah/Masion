import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { sans, serif } from "@/lib/fonts";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { ToastContainer } from "react-toastify";
import useBrands from "@/hooks/Brands/useBrands";

export const AddBrandDialog = () => {
  const {
    open,
    isLoading,
    setOpen,
    name,
    setName,
    imageFile,
    setImageFile,
    preview,
    setPreview,
    handleFileChange,
    clearImage,
    handleSubmit,
  } = useBrands();

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="gap-2 rounded-none text-[10px] tracking-[0.2em] uppercase cursor-pointer"
            style={sans}
          >
            <Plus size={13} />
            Add Brand
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle
              className="text-xl font-light text-neutral-800"
              style={serif}
            >
              Add Brand
            </DialogTitle>
            <DialogDescription
              className="text-[10px] tracking-[0.22em] uppercase text-neutral-400 mt-1"
              style={sans}
            >
              Fill in the details below
            </DialogDescription>
          </DialogHeader>

          {/* form is INSIDE DialogContent so the submit button triggers it */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                className="block text-[10px] tracking-[0.22em] uppercase text-neutral-500"
                style={sans}
              >
                Brand Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Nike, Adidas…"
                className="w-full px-4 py-3 text-sm text-neutral-800 bg-neutral-50 border border-neutral-200 outline-none focus:border-neutral-400 transition-colors duration-150 placeholder:text-neutral-300"
                style={sans}
              />
            </div>

            <div className="space-y-1.5">
              <label
                className="block text-[10px] tracking-[0.22em] uppercase text-neutral-500"
                style={sans}
              >
                Image
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full h-20 cursor-pointer px-4 py-3 text-sm text-neutral-800 bg-neutral-50 border border-neutral-200 outline-none focus:border-neutral-400 transition-colors duration-150"
                style={sans}
                accept="image/*"
              />
              {preview && (
                <div className="relative w-full h-40 bg-neutral-100 rounded-sm overflow-hidden border border-neutral-200">
                  <img
                    src={preview}
                    alt="Brand Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <button
                type="button"
                onClick={clearImage}
                className="text-[10px] tracking-[0.22em] uppercase text-neutral-500 hover:text-neutral-700 transition-colors duration-150 cursor-pointer"
                style={sans}
              >
                Clear
              </button>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="px-5 py-2.5 text-[10px] tracking-[0.22em] uppercase text-neutral-500 border border-neutral-200 hover:border-neutral-400 hover:text-neutral-700 transition-all duration-150 cursor-pointer"
                  style={sans}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="px-6 py-2.5 text-[10px] tracking-[0.22em] uppercase bg-neutral-900 text-white hover:bg-neutral-700 transition-colors duration-150 cursor-pointer"
                style={sans}
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add Brand"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </div>
  );
};
