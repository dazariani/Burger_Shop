const fieldClass =
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"

function CategoryDropdownList() {
  return (
    <div className='flex flex-col mb-4'>
      <label className='flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 mb-2.5 capitalize'>
        კატეგორია
      </label>
      <select
        required
        defaultValue=''
        className={fieldClass + "mb-2"}
        name='category'
      >
        {/*  */}
        <option disabled className='bg-background' value=''>
          აირჩიეთ კატეგორია
        </option>
        <option className='bg-background' value='ბურგერი'>
          ბურგერი
        </option>
        <option className='bg-background' value='ჰოთ-დოგი'>
          ჰოთ-დოგი
        </option>
        <option className='bg-background' value='ტაკო & ბურიტო'>
          ტაკო & ბურიტო
        </option>
        <option className='bg-background' value='გარნირები & სალათები'>
          გარნირები & სალათები
        </option>
        <option className='bg-background' value='სოუსი'>
          სოუსი
        </option>
        <option className='bg-background' value='სასმელები'>
          სასმელები
        </option>
      </select>
    </div>
  )
}
export default CategoryDropdownList
