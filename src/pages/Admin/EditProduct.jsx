import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ImagePlus,
  X,
  Plus,
  ChevronLeft,
  Tag,
  Palette,
  DollarSign,
  Package,
  Type,
  Layers,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { getAllCategories } from "@/store/actions/categoriesActions";
import { getAllBrands } from "@/store/actions/brandsActions";
import {
  getProductDetails,
  updateProduct,
} from "@/store/actions/productsActions";

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const sans = { fontFamily: "'Montserrat', sans-serif" };

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.4, 0, 0.2, 1] },
});

const inputCls =
  "w-full px-4 py-3 text-sm text-neutral-800 bg-neutral-50 border border-neutral-200 rounded-xl outline-none focus:border-neutral-500 transition-colors placeholder:text-neutral-300";

/* ── Section card ── */
function Section({ title, icon: Icon, children, delay = 0 }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      className="bg-white border border-neutral-100 rounded-2xl p-6 shadow-sm"
    >
      <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-neutral-50">
        <div className="w-7 h-7 rounded-lg bg-neutral-50 flex items-center justify-center">
          <Icon size={14} className="text-neutral-500" />
        </div>
        <p
          className="text-[10px] tracking-[0.25em] uppercase text-neutral-400"
          style={sans}
        >
          {title}
        </p>
      </div>
      {children}
    </motion.div>
  );
}

/* ── Field wrapper ── */
function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-[10px] tracking-[0.2em] uppercase text-neutral-500"
        style={sans}
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="text-[11px] text-red-400" style={sans}>
          {error}
        </p>
      )}
    </div>
  );
}

/* ── Skeleton while loading ── */
function Skeleton() {
  return (
    <div className="max-w-3xl mx-auto pb-16 animate-pulse space-y-5">
      <div className="h-8 w-48 bg-neutral-200 rounded mb-8" />
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white border border-neutral-100 rounded-2xl p-6 space-y-4"
        >
          <div className="h-4 w-32 bg-neutral-200 rounded" />
          <div className="h-12 bg-neutral-100 rounded-xl" />
          <div className="h-12 bg-neutral-100 rounded-xl" />
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════
   EDIT PRODUCT PAGE
══════════════════════════════════════ */
export default function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const coverRef = useRef();

  const { product, isLoading } = useSelector((s) => s.products);
  const { categories } = useSelector((s) => s.categories);
  const { brands } = useSelector((s) => s.brands);

  /* ── form state ── */
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    priceAfterDiscount: "",
    quantity: "",
    category: "",
    brand: "",
  });
  const [errors, setErrors] = useState({});
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [colors, setColors] = useState([]);
  const [colorInput, setColorInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ready, setReady] = useState(false);

  /* ── fetch product + lists ── */
  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllBrands());
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  /* ── pre-fill form once product loaded ── */
  useEffect(() => {
    if (!product || product._id !== id) return;
    setForm({
      title: product.title ?? "",
      description: product.description ?? "",
      price: product.price ?? "",
      priceAfterDiscount: product.priceAfterDiscount ?? "",
      quantity: product.quantity ?? "",
      category: product.category ?? "",
      brand: product.brand ?? "",
    });
    setColors(Array.isArray(product.colors) ? product.colors : []);
    setCoverPreview(product.imageCover ?? null);
    setImagePreviews(Array.isArray(product.images) ? product.images : []);
    setReady(true);
  }, [product, id]);

  const set = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  /* ── cover image ── */
  const handleCover = (file) => {
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  /* ── extra images ── */
  const handleImages = (files) => {
    const arr = Array.from(files);
    setImageFiles((p) => [...p, ...arr]);
    setImagePreviews((p) => [...p, ...arr.map((f) => URL.createObjectURL(f))]);
  };
  const removeExtraImage = (i) => {
    setImageFiles((p) => p.filter((_, idx) => idx !== i));
    setImagePreviews((p) => p.filter((_, idx) => idx !== i));
  };

  /* ── colors ── */
  const addColor = () => {
    const c = colorInput.trim();
    if (c && !colors.includes(c)) setColors((p) => [...p, c]);
    setColorInput("");
  };
  const removeColor = (c) => setColors((p) => p.filter((x) => x !== c));

  /* ── validation ── */
  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (form.description.length < 20) e.description = "Min 20 characters";
    if (!form.price || isNaN(form.price)) e.price = "Valid price required";
    if (!form.quantity || isNaN(form.quantity))
      e.quantity = "Valid quantity required";
    if (!form.category) e.category = "Category is required";
    return e;
  };

  /* ── submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      toast.error(Object.values(errs)[0]); // show first error visibly
      return;
    }

    let payload;

    if (coverFile || imageFiles.length > 0) {
      // new files → multipart
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("price", Number(form.price));
      fd.append("quantity", Number(form.quantity));
      fd.append("category", form.category);
      if (form.brand) fd.append("brand", form.brand);
      if (form.priceAfterDiscount) fd.append("priceAfterDiscount", Number(form.priceAfterDiscount));
      if (coverFile) fd.append("imageCover", coverFile);
      imageFiles.forEach((f) => fd.append("images", f));
      colors.forEach((c) => fd.append("colors", c));
      payload = fd;
    } else {
      // no new files → plain JSON (most reliable for PUT)
      payload = {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        quantity: Number(form.quantity),
        category: form.category,
        colors,
        ...(form.brand && { brand: form.brand }),
        ...(form.priceAfterDiscount && { priceAfterDiscount: Number(form.priceAfterDiscount) }),
      };
    }

    setSubmitting(true);
    const result = await dispatch(updateProduct(id, payload));
    setSubmitting(false);

    if (result === true) {
      toast.success("Product updated successfully!");
      setTimeout(() => navigate("/admin/products"), 1200);
    } else {
      toast.error(result || "Failed to update product");
    }
  };

  if (!ready) {
    return (
      <div style={sans}>
        <ToastContainer />
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-16" style={sans}>
      <ToastContainer />

      {/* ── Header ── */}
      <motion.div {...fadeUp(0)} className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/admin/products")}
          className="w-8 h-8 rounded-xl border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:border-neutral-400 transition-all"
        >
          <ChevronLeft size={15} />
        </button>
        <div>
          <h1 className="text-2xl font-light text-neutral-900" style={serif}>
            Edit Product
          </h1>
          <p
            className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mt-0.5"
            style={sans}
          >
            Update the fields below
          </p>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* ── Basic Info ── */}
        <Section title="Basic Information" icon={Type} delay={0.05}>
          <div className="flex flex-col gap-4">
            <Field label="Title *" error={errors.title}>
              <input
                className={inputCls}
                value={form.title}
                onChange={set("title")}
                placeholder="e.g. Classic Wool Coat"
              />
            </Field>
            <Field
              label="Description * (min 20 chars)"
              error={errors.description}
            >
              <textarea
                className={`${inputCls} resize-none`}
                rows={4}
                value={form.description}
                onChange={set("description")}
                placeholder="Describe the product in detail…"
              />
            </Field>
          </div>
        </Section>

        {/* ── Pricing ── */}
        <Section title="Pricing" icon={DollarSign} delay={0.1}>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Price *" error={errors.price}>
              <input
                className={inputCls}
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={set("price")}
                placeholder="0.00"
              />
            </Field>
            <Field label="Price After Discount">
              <input
                className={inputCls}
                type="number"
                min="0"
                step="0.01"
                value={form.priceAfterDiscount}
                onChange={set("priceAfterDiscount")}
                placeholder="0.00 (optional)"
              />
            </Field>
          </div>
        </Section>

        {/* ── Inventory ── */}
        <Section title="Inventory" icon={Package} delay={0.15}>
          <Field label="Quantity *" error={errors.quantity}>
            <input
              className={`${inputCls} max-w-xs`}
              type="number"
              min="0"
              value={form.quantity}
              onChange={set("quantity")}
              placeholder="0"
            />
          </Field>
        </Section>

        {/* ── Cover Image ── */}
        <Section title="Cover Image" icon={ImagePlus} delay={0.2}>
          {errors.cover && (
            <p className="text-[11px] text-red-400 mb-3" style={sans}>
              {errors.cover}
            </p>
          )}
          {coverPreview ? (
            <div className="relative w-full h-52 rounded-xl overflow-hidden border border-neutral-200 group">
              <img
                src={coverPreview}
                alt="cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              <button
                type="button"
                onClick={() => {
                  setCoverFile(null);
                  setCoverPreview(null);
                }}
                className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-red-50 transition-colors"
              >
                <X size={13} className="text-red-400" />
              </button>
              <span
                className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 text-white text-[9px] tracking-widest uppercase rounded"
                style={sans}
              >
                {coverFile ? "New image" : "Current image"}
              </span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => coverRef.current?.click()}
              className="w-full h-40 border-2 border-dashed border-neutral-200 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-neutral-400 hover:bg-neutral-50 transition-all"
            >
              <ImagePlus size={22} className="text-neutral-300" />
              <span
                className="text-[11px] text-neutral-400 tracking-wider"
                style={sans}
              >
                Click to upload cover image
              </span>
            </button>
          )}
          <input
            ref={coverRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleCover(e.target.files[0])}
          />
        </Section>

        {/* ── Extra Images ── */}
        <Section title="Additional Images" icon={Layers} delay={0.25}>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {imagePreviews.map((src, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-xl overflow-hidden border border-neutral-200 group"
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeExtraImage(i)}
                  className="absolute top-1 right-1 w-5 h-5 bg-white/90 rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={10} className="text-red-400" />
                </button>
              </div>
            ))}
            <label className="aspect-square rounded-xl border-2 border-dashed border-neutral-200 flex items-center justify-center cursor-pointer hover:border-neutral-400 hover:bg-neutral-50 transition-all">
              <Plus size={18} className="text-neutral-300" />
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleImages(e.target.files)}
              />
            </label>
          </div>
        </Section>

        {/* ── Colors ── */}
        <Section title="Colors" icon={Palette} delay={0.3}>
          <div className="flex gap-2 mb-3">
            <input
              className={`${inputCls} flex-1`}
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addColor())
              }
              placeholder="e.g. Black, Red, #c9a96e"
            />
            <button
              type="button"
              onClick={addColor}
              className="px-4 py-2 bg-neutral-900 text-white text-[10px] tracking-widest uppercase rounded-xl hover:bg-neutral-700 transition-colors"
            >
              Add
            </button>
          </div>
          {colors.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <span
                  key={c}
                  className="flex items-center gap-1.5 px-3 py-1 bg-neutral-100 rounded-full text-xs text-neutral-700 border border-neutral-200"
                >
                  {c.startsWith("#") && (
                    <span
                      className="w-3 h-3 rounded-full border border-neutral-300 shrink-0"
                      style={{ background: c }}
                    />
                  )}
                  {c}
                  <button type="button" onClick={() => removeColor(c)}>
                    <X
                      size={11}
                      className="text-neutral-400 hover:text-red-400"
                    />
                  </button>
                </span>
              ))}
            </div>
          )}
        </Section>

        {/* ── Classification ── */}
        <Section title="Classification" icon={Tag} delay={0.35}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Category *" error={errors.category}>
              <select
                className={inputCls}
                value={form.category}
                onChange={set("category")}
              >
                <option value="">Select a category</option>
                {categories.filter(Boolean).map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Brand">
              <select
                className={inputCls}
                value={form.brand}
                onChange={set("brand")}
              >
                <option value="">Select a brand (optional)</option>
                {(brands ?? []).filter(Boolean).map((b) => (
                  <option key={b._id} value={b._id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </Section>

        {/* ── Submit ── */}
        <motion.div
          {...fadeUp(0.4)}
          className="flex items-center justify-end gap-3 pt-2"
        >
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="px-6 py-3 border border-neutral-200 text-neutral-500 text-[11px] tracking-[0.2em] uppercase rounded-xl hover:border-neutral-400 hover:text-neutral-700 transition-all"
            style={sans}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 bg-[#0c0c0c] text-white text-[11px] tracking-[0.25em] uppercase rounded-xl hover:bg-neutral-800 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
            style={sans}
          >
            {submitting && (
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            )}
            {submitting ? "Saving…" : "Save Changes"}
          </button>
        </motion.div>
      </form>
    </div>
  );
}
