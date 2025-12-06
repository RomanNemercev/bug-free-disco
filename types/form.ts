// Типы полей формы
export type FormFieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'number'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'date'
  | 'custom'; // для кастомных компонентов

// Правило валидации для одного поля
export interface ValidationRule {
  required?: boolean;
  message?: string; // сообщение об ошибке
  pattern?: RegExp; // регулярное выражение
  min?: number; // минимальное значение/длина
  max?: number; // максимальное значение/длина
  minLength?: number; // минимальная длина строки
  maxLength?: number; // максимальная длина строки
  custom?: (value: any, formData: Record<string, any>) => string | null; // кастомная валидация
}

// Конфигурация одного поля формы
export interface FormFieldConfig {
  name: string; // имя поля (ключ в formData)
  label: string; // подпись поля
  type: FormFieldType; // тип поля
  placeholder?: string; // placeholder
  required?: boolean; // обязательное поле (для отображения *)
  validation?: ValidationRule; // правила валидации
  options?: Array<{ value: any; name: string } | string>; // для select (формат MyDropdown)
  component?: any; // кастомный компонент (если type === 'custom')
  props?: Record<string, any>; // дополнительные props для компонента
  class?: string; // дополнительные CSS классы
  defaultValue?: any; // значение по умолчанию
  disabled?: boolean; // заблокировано ли поле
  hidden?: boolean; // скрыто ли поле
  maxHeight?: number; // для textarea
  row?: number; // номер строки для группировки полей (поля с одинаковым row будут в одной строке)
  colSpan?: number; // ширина поля в колонках (1-12, по умолчанию 12 - полная ширина)
}

// Конфигурация всей формы
export interface FormConfig {
  fields: FormFieldConfig[]; // список полей
  validationRules?: Record<string, ValidationRule>; // правила валидации (альтернатива validation в поле)
  layout?: 'vertical' | 'horizontal' | 'grid'; // расположение полей
  submitButtonText?: string; // текст кнопки отправки
  cancelButtonText?: string; // текст кнопки отмены
  showCancelButton?: boolean; // показывать ли кнопку отмены
  class?: string; // дополнительные CSS классы для формы
}
