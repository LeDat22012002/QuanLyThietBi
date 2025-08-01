import { memo } from 'react'
import clsx from 'clsx'
const InputForm = ({
  label,
  disabled,
  register,
  errors,
  id,
  validate,
  type = 'text',
  placeholder,
  fullWith,
  defaultValue,
  style,
  readOnly,
  className,
}) => {
  return (
    <div className={clsx('flex flex-col h-[78px] gap-1', style)}>
      {label && (
        <label className="font-medium" htmlFor={id}>
          {label}
        </label>
      )}

      <input
        type={type}
        id={id}
        {...register(id, validate)}
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={clsx(
          ' px-2 md:px-4 py-2 border bg-white border-gray-500 focus:outline-none cursor-pointer my-auto rounded-sm placeholder:italic placeholder:text-[12px]',
          fullWith && 'w-full',
          style,
          className,
          type === 'number' && 'input-no-spinner '
        )}
        readOnly={readOnly}
      />
      {errors[id] && <small className="text-xs italic text-error">{errors[id]?.message}</small>}
    </div>
  )
}

export default memo(InputForm)
