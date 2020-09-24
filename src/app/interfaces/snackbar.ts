export interface Snackbar {
  message: string;
  type: "error" | "success" | "warning";
  duration?: number;
}
