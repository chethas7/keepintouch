import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfileAPI } from "../../api/userAPI";
import { updateUser } from "../../redux/slices/authSlice";

const DEFAULT_AVATAR = "https://i.pravatar.cc/150?img=12";

// ✅ MOVE OUTSIDE (IMPORTANT FIX)
const Field = ({
  label,
  name,
  form,
  setForm,
  editingField,
  setEditingField,
  handleSave,
}) => {
  return (
    <div className="flex justify-between items-start py-3 border-b border-gray-200 dark:border-gray-700">
      <div className="w-[80%]">
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>

        {editingField === name ? (
          <input
            autoFocus
            value={form[name]}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                [name]: e.target.value,
              }))
            }
            className="w-full bg-transparent outline-none text-sm mt-1
                       text-gray-800 dark:text-white
                       placeholder-gray-400"
          />
        ) : (
          <p className="text-sm mt-1 text-gray-800 dark:text-gray-200">
            {form[name] || "Not added"}
          </p>
        )}
      </div>

      <button
        onClick={() =>
          editingField === name ? handleSave(name) : setEditingField(name)
        }
        className="text-blue-500 text-sm"
      >
        {editingField === name ? "Save" : "Edit"}
      </button>
    </div>
  );
};

const ProfileModal = ({ onClose }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [editingField, setEditingField] = useState(null);

  const [form, setForm] = useState({
    name: user?.name || "",
    username: user?.username || "",
    bio: user?.bio || "",
    pronouns: user?.pronouns || "",

    website: user?.website || "",
    phone: user?.phone || "",
    secondaryEmail: user?.secondaryEmail || "",

    currentCity: user?.currentCity || "",
    hometown: user?.hometown || "",
    workplace: user?.workplace || "",
    jobTitle: user?.jobTitle || "",

    relationshipStatus: user?.relationshipStatus || "",
    interests: user?.interests?.join(", ") || "",
    hobbies: user?.hobbies?.join(", ") || "",
  });

  // 🔥 SAVE
  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        interests: form.interests
          ? form.interests.split(",").map((i) => i.trim())
          : [],
        hobbies: form.hobbies
          ? form.hobbies.split(",").map((i) => i.trim())
          : [],
      };

      const res = await updateProfileAPI(payload);

      dispatch(updateUser(res.data.user));
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setEditingField(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#1f1f1f] w-[95%] max-w-2xl rounded-xl p-6 max-h-[90vh] overflow-y-auto"
      >
        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Edit Profile
          </h2>
          <button className="text-gray-600 dark:text-white" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* AVATAR */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={user?.avatar || DEFAULT_AVATAR}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <button className="text-blue-500 text-sm mt-2">Change Photo</button>
        </div>

        {/* IDENTITY */}
        <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">
          Identity
        </h3>
        <Field
          {...{
            label: "Full Name",
            name: "name",
            form,
            setForm,
            editingField,
            setEditingField,
            handleSave,
          }}
        />
        <Field
          {...{
            label: "Username",
            name: "username",
            form,
            setForm,
            editingField,
            setEditingField,
            handleSave,
          }}
        />
        <Field
          {...{
            label: "Bio",
            name: "bio",
            form,
            setForm,
            editingField,
            setEditingField,
            handleSave,
          }}
        />
        <Field
          {...{
            label: "Pronouns",
            name: "pronouns",
            form,
            setForm,
            editingField,
            setEditingField,
            handleSave,
          }}
        />

        {/* CONTACT */}
        <h3 className="font-semibold mt-5 mb-2 text-gray-800 dark:text-white">
          Contact
        </h3>
        <Field
          {...{
            label: "Website",
            name: "website",
            form,
            setForm,
            editingField,
            setEditingField,
            handleSave,
          }}
        />
        <Field
          {...{
            label: "Phone",
            name: "phone",
            form,
            setForm,
            editingField,
            setEditingField,
            handleSave,
          }}
        />
        <Field
          {...{
            label: "Secondary Email",
            name: "secondaryEmail",
            form,
            setForm,
            editingField,
            setEditingField,
            handleSave,
          }}
        />

        {/* WORK */}
        <h3 className="font-semibold mt-5 mb-2 text-gray-800 dark:text-white">
          Work & Location
        </h3>
        <Field
          {...{
            label: "Current City",
            name: "currentCity",
            form,
            setForm,
            editingField,
            setEditingField,
            handleSave,
          }}
        />
        <Field
          {...{
            label: "Hometown",
            name: "hometown",
            form,
            setForm,
            editingField,
            setEditingField,
            handleSave,
          }}
        />
        <Field
          {...{
            label: "Workplace",
            name: "workplace",
            form,
            setForm,
            editingField,
            setEditingField,
            handleSave,
          }}
        />
        <Field
          {...{
            label: "Job Title",
            name: "jobTitle",
            form,
            setForm,
            editingField,
            setEditingField,
            handleSave,
          }}
        />

        {/* PERSONAL */}
        <h3 className="font-semibold mt-5 mb-2 text-gray-800 dark:text-white">
          Personal
        </h3>
        <Field
          {...{
            label: "Relationship Status",
            name: "relationshipStatus",
            form,
            setForm,
            editingField,
            setEditingField,
            handleSave,
          }}
        />
        <Field
          {...{
            label: "Interests",
            name: "interests",
            form,
            setForm,
            editingField,
            setEditingField,
            handleSave,
          }}
        />
        <Field
          {...{
            label: "Hobbies",
            name: "hobbies",
            form,
            setForm,
            editingField,
            setEditingField,
            handleSave,
          }}
        />
      </div>
    </div>
  );
};

export default ProfileModal;
