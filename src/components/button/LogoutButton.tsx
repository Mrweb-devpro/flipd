import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../actions/authActions";

export default function LogoutButton({
  onlyIcon = false,
}: {
  onlyIcon?: true | false;
}) {
  const navigate = useNavigate();

  const handleClick = async () => {
    const confirmedLogout = window.confirm(
      "You are about to logout of your account. Are you sure you want to proceed with this action ?"
    );
    if (!confirmedLogout) return;

    await logoutAction(() => {
      navigate("/login");
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="p-2 text-red-500 flex gap-2 items-center border-[1.4px] border-red-500 rounded-sm hover:bg-red-500 hover:text-white justify-center"
    >
      <CiLogout size="25" />
      {onlyIcon || "Logout"}
    </button>
  );
}
