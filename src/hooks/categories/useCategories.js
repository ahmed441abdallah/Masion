import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllCategories } from "@/store/actions/categoriesActions";
import { deleteCategory } from "@/store/actions/categoriesActions";
import { toast } from "react-toastify";

const useCategories = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector((s) => s.categories);
  const [search, setSearch] = useState("");

  const filtered = categories.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase()),
  );
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const result = await dispatch(deleteCategory(id));
    if (result === true) {
      toast.success("Category deleted successfully");
    } else {
      toast.error(result || "Failed to delete category");
    }
  };
  return { categories, isLoading, handleDelete, filtered, search, setSearch };
};
export default useCategories;
