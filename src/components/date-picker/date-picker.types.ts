export interface BasicDatePickerOptions {
  title: string;
}

export interface DatePickerOptions extends BasicDatePickerOptions{
  startPlaceholder: string | undefined;
  endPlaceholder: string | undefined;
}
