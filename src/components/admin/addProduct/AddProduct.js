import { useState } from "react";
import styles from "./AddProduct.module.scss";
import Card from "../../card/Card";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import Loader from "../../loader/Loader";
import { selectProducts } from "../../../redux/slice/productSlice";

const categories = [
  { id: 1, name: "Headwear" },
  { id: 2, name: "Topwear" },
  { id: 3, name: "Bottomwear" },
  { id: 4, name: "Accessories" },
];

const gender = [
  { id: 1, name: "Men" },
  { id: 2, name: "Women" },
];

const initialState = {
  name: "",
  imageURL: "",
  price: 0,
  category: "",
  gender: "",
  desc: "",
  quantity: 0,
  size: {
    xs: 0,
    s: 0,
    m: 0,
    l: 0,
    xl: 0,
  },
};

const AddProduct = () => {
  const { id } = useParams();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit);
    return newState;
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    } else {
      return f2;
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "xs" ||
      name === "s" ||
      name === "m" ||
      name === "l" ||
      name === "xl"
    ) {
      const newSize = { ...product.size, [name]: Number(value) };
      const newQuantity = Object.values(newSize).reduce((a, b) => a + b, 0);
      setProduct({ ...product, size: newSize, quantity: newQuantity });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const storageRef = ref(storage, `cyberfrog/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(Math.floor(progress));
      },
      (error) => {
        toast.error("ERROR! Upload failed");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("Image uploaded successfully.");
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    console.log(product);

    setIsLoading(true);

    try {
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        gender: product.gender,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
        quantity: Number(product.quantity),
        size: {
          xs: Number(product.size.xs),
          s: Number(product.size.s),
          m: Number(product.size.m),
          l: Number(product.size.l),
          xl: Number(product.size.xl),
        },
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });
      toast.success("Product uploaded successfully.");
      navigate("/admin/all-products");

      console.log(product);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
      toast.error("Uploaded failed!");
    }
  };

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (product.imageURL !== productEdit.imageURL) {
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        gender: product.gender,
        desc: product.desc,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
        quantity: Number(product.quantity),
        size: {
          xs: Number(product.size.xs),
          s: Number(product.size.s),
          m: Number(product.size.m),
          l: Number(product.size.l),
          xl: Number(product.size.xl),
        },
      });
      setIsLoading(false);
      toast.success("Product Edited Successfully");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product_container}>
        <div className={styles.product}>
          <h1>{detectForm(id, "Add New Product", "Edit Product")}</h1>
          <Card cardClass={styles.card}>
            <form onSubmit={detectForm(id, addProduct, editProduct)}>
              <label>Product name:</label>
              <input
                type="text"
                placeholder="Product name"
                required
                name="name"
                value={product.name}
                onChange={(e) => handleInputChange(e)}
              />

              <label>Product image:</label>
              <Card cardClass={styles.group}>
                {uploadProgress === 0 ? null : (
                  <div className={styles.progress}>
                    <div
                      className={styles["progress-bar"]}
                      style={{ width: `${uploadProgress}%` }}
                    >
                      {uploadProgress < 100
                        ? `${uploadProgress}%`
                        : `Upload Complete`}
                    </div>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  placeholder="Product Image"
                  name="image"
                  onChange={(e) => handleImageChange(e)}
                />
                {product.imageURL === "" ? null : (
                  <input
                    className={styles.imageUrl_box}
                    type="text"
                    placeholder="Image URL"
                    required
                    name="imageURL"
                    value={product.imageURL}
                    disabled
                  />
                )}
              </Card>
              <label>Product price:</label>
              <input
                type="number"
                placeholder="Product price"
                required
                name="price"
                value={product.price}
                onChange={(e) => handleInputChange(e)}
              />

              <label>Gender:</label>
              <select
                required
                name="gender"
                value={product.gender}
                onChange={(e) => handleInputChange(e)}
              >
                <option value="" disabled>
                  -- choose gender --
                </option>
                {gender.map((category) => {
                  return (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </select>

              <label>Product category:</label>
              <select
                required
                name="category"
                value={product.category}
                onChange={(e) => handleInputChange(e)}
              >
                <option value="" disabled>
                  -- choose category --
                </option>
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
              </select>

              <label>Size & quantity:</label>
              <div className={styles.size_container}>
                <div>
                  <label>XS</label>
                  <input
                    type="number"
                    placeholder="Qty"
                    required
                    name="xs"
                    value={product.size.xs}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div>
                  <label>S</label>
                  <input
                    type="number"
                    placeholder="Qty"
                    required
                    name="s"
                    value={product.size.s}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div>
                  <label>M</label>
                  <input
                    type="number"
                    placeholder="Qty"
                    required
                    name="m"
                    value={product.size.m}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div>
                  <label>L</label>
                  <input
                    type="number"
                    placeholder="Qty"
                    required
                    name="l"
                    value={product.size.l}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div>
                  <label>XL</label>
                  <input
                    type="number"
                    placeholder="Qty"
                    required
                    name="xl"
                    value={product.size.xl}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div>
                  <label>Total items</label>
                  <input
                    className={styles.quantity}
                    type="number"
                    placeholder="Qty"
                    required
                    name="quantity"
                    value={product.quantity}
                    onChange={(e) => handleInputChange(e)}
                    disabled
                  />
                </div>
              </div>

              <label>Product description:</label>
              <textarea
                name="desc"
                required
                value={product.desc}
                onChange={(e) => handleInputChange(e)}
                cols="30"
                rows="10"
              ></textarea>

              <div className={styles.save_btn}>
                <button>
                  {detectForm(id, "Save Product", "Edit Product")}
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
