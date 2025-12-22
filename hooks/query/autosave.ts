import { useMutation } from "@tanstack/react-query";
import createAutoSave from "../../apis/autosave/createAutoSave";

const useCreateAutoSave = () =>
  useMutation({
    mutationFn: createAutoSave,
  });

export default useCreateAutoSave;
