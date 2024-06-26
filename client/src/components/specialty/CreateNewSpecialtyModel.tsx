import { FC } from "react";
import FormModelContainer from "../common/models/FormModelContainer";
import InputFieldWithError from "../common/inputs/InputFieldWithError";
import { FieldErrorsImpl, SubmitHandler, useForm } from "react-hook-form";
import { SpecialtyParam } from "@/utils/types";
import { createSpecialtyMutation } from "./process";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateNewSpecialtyModel: FC<Props> = ({ openModal, setOpenModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SpecialtyParam>();

  // handle call API
  const mutation = createSpecialtyMutation();

  const onSubmit: SubmitHandler<SpecialtyParam> = async (data: SpecialtyParam) => mutation.mutateAsync(data);

  return (
    <>
      {openModal && (
        <FormModelContainer
          onClose={() => setOpenModal(false)}
          title="Add Specialty"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputFieldWithError
            title="specialty medical name *"
            name="specialty_name"
            register={register} 
            errors={errors as FieldErrorsImpl<SpecialtyParam>}
          />
        </FormModelContainer>
      )}
    </>
  );
};

export default CreateNewSpecialtyModel;
