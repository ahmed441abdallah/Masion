import { addCoupon, deleteCoupon, getAllCupons } from "@/store/actions/cuponActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const useCupon = () => {
    const { cupons, loading, error } = useSelector((state) => state.cupon);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [discount, setDiscount] = useState("");
  const [expire, setExpire] = useState("");

  const resetForm = () => {
    setName("");
    setDiscount("");
    setExpire("");
  };

  const handleOpenChange = (val) => {
    setOpen(val);
    if (!val) resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !discount || !expire) {
      toast.error("Please fill in all fields");
      return;
    }
    const result = await dispatch(
      addCoupon({ name: name.trim(), discount: Number(discount), expire })
    );
    if (result === true) {
      toast.success("Coupon created successfully!");
      setOpen(false);
      resetForm();
    } else {
      toast.error(result || "Failed to create coupon");
    }
  };
   
  useEffect(() => {
    dispatch(getAllCupons());
  }, []);

  const handleDelete = async (id) => {
    const result = await dispatch(deleteCoupon(id));
    if (result === true) {
      toast.success("Coupon deleted successfully");
    } else {
      toast.error(result || "Failed to delete coupon");
    }
  };

  const activeCoupons = cupons.filter((c) => new Date(c.expire) >= new Date());
  const expiredCoupons = cupons.filter((c) => new Date(c.expire) < new Date());


  return {
    cupons,
    error,
    open,
    name,
    discount,
    expire,
    loading,
    dispatch,
    resetForm,
    handleOpenChange,
    handleSubmit,
    activeCoupons,
    expiredCoupons,
    handleDelete,
  };

}
export default useCupon;