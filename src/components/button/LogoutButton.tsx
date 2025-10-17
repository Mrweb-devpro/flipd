import { CiLogout } from "react-icons/ci";
import { logoutAction } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await logoutAction(() => {
      navigate("/login");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        className="p-2 text-red-500 flex gap-2 items-center border-[1.4px] border-red-500 rounded-sm hover:bg-red-500 hover:text-white justify-center"
      >
        <CiLogout size="25" />
        Logout
      </button>
    </form>
  );
}
