import { deleteBrand, getAllBrands } from "@/store/actions/brandsActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const useBrands = () => {
  const { brands, isLoading } = useSelector((s) => s.brands);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  const handleDeleteBrand = async (id) => {
    const result = await dispatch(deleteBrand(id));
    if (result === true) {
      toast.success("Brand deleted successfully");
    } else {
      toast.error(result || "Failed to delete brand");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !imageFile) {
      toast.error("Please fill in all fields");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", imageFile);
    const result = await dispatch(addBrand(formData));
    if (result === true) {
      toast.success("Brand added successfully");
      setName("");
      setImageFile(null);
      setPreview(null);
      setOpen(false);
    } else {
      toast.error(result || "Failed to add brand");
    }
  };
  return {
    brands,
    isLoading,
    handleDeleteBrand,
    open,
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
  };
};
export default useBrands;
