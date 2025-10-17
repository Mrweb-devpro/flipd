export default function FormTextarea({
  Icon,
  title,
  id,
  placeholder,
  error,
}: {
  Icon: ({ size, color }: { size: string; color: string }) => React.ReactNode;

  title: string;
  id: string;
  placeholder: string;
  error: string | undefined;
}) {
  return (
    <div className="flex gap-4 items-center w-full justify-center">
      <Icon size="30" color="var(--main)" />
      <span className="w-full">
        <label htmlFor={id} className="text-stone-600 flex items-center gap-1">
          {title} <i className="text-stone-500 text-xs">(optional)</i>
        </label>

        <textarea
          autoComplete="off"
          id={id}
          placeholder={placeholder}
          name={id}
          className="bg-[#F6F9F7] border rounded-sm border-[var(--main-light)]  px-4 py-2 w-full max-w-[380px] resize-none h-36"
        ></textarea>
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
