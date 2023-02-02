import { useMutation } from '@tanstack/react-query';
import createAutoSave from '../../apis/autosave/createAutoSave';

const useCreateAutoSave = () => useMutation(createAutoSave);

export default useCreateAutoSave;
