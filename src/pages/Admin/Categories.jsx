import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, ImagePlus, X, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
} from "@/store/actions/categoriesActions";
import { toast, ToastContainer } from "react-toastify";
import useCategories from "@/hooks/categories/useCategories";

const sans = { fontFamily: "'Montserrat', sans-serif" };
const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };

function CategoryDialog({
  trigger,
  title = "Add Category",
  initialData,
  onSubmit,
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(initialData?.name ?? "");
  const [image, setImage] = useState(initialData?.image ?? "");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const { isLoading } = useSelector((s) => s.categories);
  const fileRef = useRef();
  const dispatch = useDispatch();

  // Sync initial data when dialog opens
  const handleOpenChange = (val) => {
    setOpen(val);
    if (val) {
      setName(initialData?.name ?? "");
      setImage(initialData?.image ?? "");
      setImageFile(null);
      setPreview("");
    }
  };

  const handleFile = (file) => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setImageFile(file);
    setImage("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) handleFile(file);
  };

  const clearImage = () => {
    setImage("");
    setImageFile(null);
    setPreview("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (imageFile) {
      formData.append("image", imageFile);
    } else if (image) {
      formData.append("image", image);
    }
    const result = await dispatch(addCategory(formData));
    if (result === true) {
      toast.success("Category added successfully");
      setOpen(false);
    } else {
      toast.error(result || "Failed to add category");
    }
  };

  const displayImg = preview || image;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="max-w-md p-0 overflow-hidden gap-0 border border-neutral-200 shadow-xl rounded-none">
        {/* Header */}
        <DialogHeader className="px-7 pt-7 pb-0">
          <DialogTitle
            className="text-xl font-light text-neutral-800 tracking-wide"
            style={serif}
          >
            {title}
          </DialogTitle>
          <p
            className="text-[10px] tracking-[0.22em] uppercase text-neutral-400 mt-1"
            style={sans}
          >
            Fill in the details below
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-7 pt-6 pb-7 space-y-6">
          {/* ── Name ─────────────────────────────── */}
          <div className="space-y-1.5">
            <label
              className="block text-[10px] tracking-[0.22em] uppercase text-neutral-500"
              style={sans}
            >
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Women, Accessories…"
              className="w-full px-4 py-3 text-sm text-neutral-800 bg-neutral-50 border border-neutral-200 outline-none focus:border-neutral-400 transition-colors duration-150 placeholder:text-neutral-300"
              style={sans}
            />
          </div>

          {/* ── Image ────────────────────────────── */}
          <div className="space-y-1.5">
            <label
              className="block text-[10px] tracking-[0.22em] uppercase text-neutral-500"
              style={sans}
            >
              Image
            </label>

            <AnimatePresence mode="wait">
              {displayImg ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-44 bg-neutral-100 overflow-hidden group"
                >
                  <img
                    src={displayImg}
                    alt="preview"
                    className="w-full h-full object-cover"
                    onError={clearImage}
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={clearImage}
                      className="p-2 bg-white/90 hover:bg-white transition-colors rounded-full"
                    >
                      <X size={14} className="text-neutral-700" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="dropzone"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-44 border-2 border-dashed border-neutral-200 bg-neutral-50 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors duration-200 hover:border-neutral-400 hover:bg-neutral-100"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileRef.current?.click()}
                >
                  <ImagePlus size={22} className="text-neutral-300" />
                  <p
                    className="text-[10px] tracking-[0.18em] uppercase text-neutral-400"
                    style={sans}
                  >
                    Drop image or click to upload
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />

            <div className="flex items-center gap-3 pt-1">
              <div className="flex-1 h-px bg-neutral-200" />
              <span
                className="text-[9px] tracking-[0.2em] uppercase text-neutral-400"
                style={sans}
              >
                or URL
              </span>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>

            <input
              type="text"
              value={image}
              onChange={(e) => {
                clearImage();
                setImage(e.target.value);
              }}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 text-sm text-neutral-800 bg-neutral-50 border border-neutral-200 outline-none focus:border-neutral-400 transition-colors duration-150 placeholder:text-neutral-300"
              style={sans}
            />
          </div>

          {/* ── Actions ──────────────────────────── */}
          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-5 py-2.5 text-[10px] tracking-[0.22em] uppercase text-neutral-500 border border-neutral-200 hover:border-neutral-400 hover:text-neutral-700 transition-all duration-150 cursor-pointer"
              style={sans}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-[10px] tracking-[0.22em] uppercase bg-neutral-900 text-white hover:bg-neutral-700 transition-colors duration-150 cursor-pointer"
              style={sans}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Category"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export const Categories = () => {
  const { categories, loading, handleDelete } = useCategories();

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-neutral-800" style={serif}>
            Categories
          </h1>
          <p
            className="text-[10px] tracking-[0.22em] uppercase text-neutral-400 mt-1"
            style={sans}
          >
            {categories.length} collection{categories.length !== 1 ? "s" : ""}
          </p>
        </div>

        <CategoryDialog
          title="Add Category"
          trigger={
            <Button
              className="gap-2 rounded-none text-[10px] tracking-[0.2em] uppercase cursor-pointer"
              style={sans}
            >
              <Plus size={13} />
              Add Category
            </Button>
          }
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-neutral-100 animate-pulse rounded-sm"
            />
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        >
          {categories.filter(Boolean).map((category) => (
            <motion.div
              key={category._id}
              className="group relative overflow-hidden bg-neutral-100"
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Overlay actions */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <button
                  onClick={() => handleDelete(category._id)}
                  className="p-2 bg-white/90 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
                >
                  <Trash2 size={13} className="text-rose-500" />
                </button>
              </div>

              <div className="px-3 py-2.5 bg-white border-t border-neutral-100">
                <p
                  className="text-sm font-light text-neutral-700 truncate"
                  style={serif}
                >
                  {category.name}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
      <ToastContainer />
    </div>
  );
};
