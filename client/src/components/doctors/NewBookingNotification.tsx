import dog from "@/__assets__/images/static-dog.jpg";
import { getbookingNotificationsThunk } from "@/store/notification/notificationThunk";
import { AppDispatch, RootState } from "@/store";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readBookingNotificationsAPI } from "@/utils/apis";
import { toast } from "react-toastify";
const NewBookingNotification = () => {
  const dispatch = useDispatch<AppDispatch>();
  const notification = useSelector((state: RootState) => state.notification.notifications);
  const memoizedNotification = useMemo(() => notification, [notification]);
  useEffect(() => {
    notification.length === 0 && dispatch(getbookingNotificationsThunk());
  }, []);

  function readNotification(notificationId: string) {
    readBookingNotificationsAPI(notificationId).then((response) => {
      toast.info("read notification");
      dispatch(getbookingNotificationsThunk());
    });
  }

  return (
    <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 p-4">
      {memoizedNotification &&
        memoizedNotification?.map((row, index: number) => (
          <li
            key={index}
            className={` pb-3 sm:pb-4 ${
              !row.notification_unread ? "opacity-40 cursor-not-allowed" : " cursor-pointer"
            }`}
          >
            <div
              className="flex items-center space-x-4 rtl:space-x-reverse"
              onClick={() => readNotification(row.notification_id)}
            >
              <div className="flex-shrink-0">
                <img className="w-8 h-8 rounded-full" src={dog} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center text-left gap-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {row.owner_name}
                  </p>
                </div>
                <div className="flex items-center text-left gap-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {row.animal_name}
                  </p>
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {row.booking_date}
                  </p>
                </div>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">{row.booking_at}</p>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default NewBookingNotification;