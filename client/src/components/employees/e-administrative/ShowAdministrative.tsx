/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatDay } from "@/utils/helper";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import ConfirmedModel from "@/components/common/models/ConfirmedModel";
import { useDeleteAdministrativeMutation, useFetchAdministrativeQuery } from "../process";

const ShowAdministrative = () => {
  //Prcess...
  const administrative = useFetchAdministrativeQuery() as any;

  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  //Prcess...
  const deleteAdministrativeMutation = useDeleteAdministrativeMutation();

  const confirmDeleteAdministrative = async () => {
    if (selectedId) {
      await deleteAdministrativeMutation.mutateAsync(selectedId);
      setOpenModal(false);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table text-white">
        <thead className=" text-white">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Permission</th>
            <th>Created at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {administrative.isLoading ? (
            <tr>
              <td colSpan={7}>Loading...</td>
            </tr>
          ) : administrative.data.length > 0 ? (
            administrative.data.map((row: any) => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.phone}</td>
                <td>{row.permission}</td>
                <td>{formatDay(row.created_at)}</td>
                <td className="flex items-center gap-3">
                  <RiDeleteBin6Line
                    className="text-lg cursor-pointer text-red-700 hover:text-red-500 transition-all"
                    onClick={() => {
                      setSelectedId(row.id);
                      setOpenModal(true);
                    }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Administrative found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <ConfirmedModel
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleConfirmAction={confirmDeleteAdministrative}
        actionName="Delete Administrative"
      />
    </div>
  );
};

export default ShowAdministrative;
