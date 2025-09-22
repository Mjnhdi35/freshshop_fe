export interface Toast {
  id: string;
  title: string;
  description?: string;
  color?: "green" | "red" | "blue" | "yellow" | "gray";
  duration?: number;
}

export const useToast = () => {
  const toasts = useState<Toast[]>("toasts", () => []);

  const add = (toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      id,
      duration: 5000,
      color: "gray",
      ...toast,
    };

    toasts.value.push(newToast);

    // Auto remove after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        remove(id);
      }, newToast.duration);
    }

    return id;
  };

  const remove = (id: string) => {
    const index = toasts.value.findIndex((toast) => toast.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  const clear = () => {
    toasts.value = [];
  };

  return {
    toasts: readonly(toasts),
    add,
    remove,
    clear,
  };
};
