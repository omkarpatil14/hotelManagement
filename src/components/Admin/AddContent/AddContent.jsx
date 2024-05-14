import React from "react";
import { useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const AddContent = () => {
  const [slots, setSlots] = useState([]);
  const [time, setTime] = useState([]);

  const nameRef = useRef("");
  const locationRef = useRef("");
  const descriptionRef = useRef("");
  const priceRef = useRef("");
  const imgRef = useRef("");

  const imageStoreKey = import.meta.env.VITE_imageStoreKey;

  useEffect(() => {
    axios
      .get(`https://royalerelaxo-server.onrender.com/services`)
      .then((res) => {
        setSlots(res.data[0].slots);
        setTime(res.data[0].time);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const location = locationRef.current.value;
    const description = descriptionRef.current.value;
    const price = priceRef.current.value;
    const img = imgRef.current.files[0];

    const imgBBUrl = `https://api.imgbb.com/1/upload?key=${imageStoreKey}`;

    const formData = new FormData();
    formData.append("image", img);

    await axios
      .post(imgBBUrl, formData)
      .then((res) => {
        const image = res.data.data.image.url;
        const contentData = {
          hotelName: name,
          location: location,
          description: description,
          price: price,
          img: image,
          slots: slots,
          time: time,
        };
        axios
          .post(
            `https://royalerelaxo-server.onrender.com/services`,
            contentData
          )
          .then((res) => {
            if (res.data) {
              toast.success("Hotel successfully added", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
              e.target.reset();
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

    console.log(name, location, description, price, img);
  };

  return (
    <section className="mx-auto container pb-20">
      <h1 className="text-center font-semibold text-4xl">Add Services</h1>
      <form onSubmit={handleSubmit}>
        <dl className="flex gap-5 items-center flex-col pt-10">
          {/* hotel name */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Hotel Name</span>
            </label>
            <input
              ref={nameRef}
              type="text"
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          {/* location */}
          <select
            className="select select-accent w-full max-w-xs"
            ref={locationRef}
          >
            <option>Dhaka </option>
            <option>Sylhet</option>
            <option>Chattogram</option>
            <option>Khulna</option>
            <option>Barishal</option>
          </select>

          {/* description */}
          <textarea
            className="textarea textarea-accent w-full max-w-xs"
            placeholder="Description"
            ref={descriptionRef}
          ></textarea>

          {/* price */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Price in BDT</span>
            </label>
            <input
              ref={priceRef}
              type="text"
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          {/* img */}
          <div className="flex flex-col gap-2">
            <small>Select an image</small>
            <input
              ref={imgRef}
              type="file"
              className="file-input file-input-bordered file-input-accent w-full max-w-xs"
            />
          </div>

          <button className="btn btn-info">Submit</button>
        </dl>
      </form>
    </section>
  );
};

export default AddContent;
