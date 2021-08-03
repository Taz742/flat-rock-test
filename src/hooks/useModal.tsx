import { useMemo } from "react";
import { useState, useCallback } from "react";

const useModal = <T extends any>(
  initialState = false,
  initState = {}
): IReturn<T> => {
  const [isOpen, setOpen] = useState(initialState);
  const [showSuccess, setSuccess] = useState(false);
  const [showProgress, setProgress] = useState(false);
  const [showError, setError] = useState(false);
  const [item, setSelectedItem] = useState<any>(initState);

  const closeModal = useCallback(() => {
    setSelectedItem(null);
    setOpen(false);
  }, [setOpen]);

  const openModal = useCallback(
    (setItem = null) => {
      setSelectedItem(setItem);
      setSuccess(false);
      setProgress(false);
      setError(false);
      setOpen(true);
    },
    [setSuccess, setProgress, setError, setOpen]
  );

  const state = useMemo(() => {
    return {
      isOpen,
      showSuccess,
      showProgress,
      showError,
      setSuccess,
      setProgress,
      setError,
      closeModal,
      openModal,
      // @ts-ignore
      item,
    };
  }, [
    isOpen,
    showSuccess,
    showProgress,
    showError,
    setSuccess,
    setProgress,
    setError,
    closeModal,
    openModal,
    // @ts-ignore
    item,
  ]);

  return state;
};

interface IReturn<T> {
  isOpen: boolean;
  showSuccess: boolean;
  showProgress: boolean;
  showError: boolean;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setProgress: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal: () => void;
  openModal: (setItem?: any) => void;
  item: T;
}

export default useModal;
