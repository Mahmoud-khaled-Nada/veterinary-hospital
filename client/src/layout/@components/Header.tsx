import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { AvatarDropdown } from "./AvatarDropdown";
// import NotificationsHeader from "@/components/common/notifications/NotificationsHeader";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-gray-50 md:flex h-14 items-center border-b-2 border-gray-300 dark:bg-dark_header_body dark:border-dark_border gap-4 px-4">
      <button className="md:hidden">
        <HiOutlineChevronLeft className="h-4 w-4" />
        <span className="sr-only">Toggle sidebar</span>
      </button>
      <div className="ml-auto flex items-center space-x-2">
        <button className="btn btn-sm btn-outline">
          <IoSearchOutline className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </button>
        {/*Notifications*/}
        {/* <NotificationsHeader /> */}
        {/* avatar context */}
        <AvatarDropdown />
      </div>
    </header>
  );
};

export default Header;