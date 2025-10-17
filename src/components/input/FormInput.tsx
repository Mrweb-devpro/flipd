export default function FormInput({
  type = "text",
  Icon,
  title,
  id,
  placeholder,
  error,
}: {
  type?: string;
  Icon: ({ size }: { size: string }) => React.ReactNode;
  title: string;
  id: string;
  placeholder: string;
  error: string | undefined;
}) {
  return (
    <div className="flex gap-4 items-center w-full justify-center">
      <Icon size="36" />
      <span className="w-full">
        <label htmlFor={id} className="text-stone-600 flex items-center gap-1">
          {title} <i className="text-red-500">*</i>
        </label>
        <input
          type={type}
          autoComplete="off"
          id={id}
          placeholder={placeholder}
          name={id}
          className="bg-[#F6F9F7] border rounded-sm border-[var(--main-light)]  px-4 py-2 w-full max-w-[380px]"
        />
        {error && (
          <p className="text-red-500 text-xs">
            {Array.isArray(error)
              ? error.map((error, i, arr) => {
                  return (
                    <>
                      <span>{error}.</span>
                      {arr.length - 1 !== i && <br />}
                    </>
                  );
                })
              : error}
          </p>
        )}
      </span>
    </div>
  );
}
