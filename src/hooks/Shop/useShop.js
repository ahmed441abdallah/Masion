import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "@/store/actions/categoriesActions";
import { getAllProducts } from "@/store/actions/productsActions";

const useShop = () => {
  const dispatch = useDispatch();
  const { products, isLoading, totalProducts } = useSelector((s) => s.products);
  const { categories } = useSelector((s) => s.categories);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [sort, setSort] = useState("");
  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        const filters = {
          search: search.trim(),
          category: selectedCategory,
          page,
          limit,
          sort,
        };
        dispatch(getAllProducts(filters));
      },
      search ? 400 : 0,
    );

    return () => clearTimeout(timer);
  }, [dispatch, search, selectedCategory, page, limit, sort]);

  return {
    products,
    isLoading,
    totalProducts,
    categories,
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    page,
    limit,
    handleNextPage,
    handlePrevPage,
    sort,
    setSort,
  };
};
export default useShop;
