import { fetchAdminProductDetails, updateProductAction } from "@/utils/actions"
import FormContainer from "@/components/form/FormContainer"
import FormInput from "@/components/form/FormInput"
import PriceInput from "@/components/form/PriceInput"
import TextAreaInput from "@/components/form/TextAreaInput"
import { SubmitButton } from "@/components/form/Buttons"
import CheckboxInput from "@/components/form/CheckboxInput"
import CategoryDropdownList from "@/components/form/CategoryDropdownList"
import ImageInputContainer from "@/components/form/ImageInputContainer"

async function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const product = await fetchAdminProductDetails(id)
  const { name, price, description, featured, category, image } = product
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>update product</h1>
      <div className='border p-8 rounded'>
        <FormContainer action={updateProductAction}>
          <div className='grid gap-4 md:grid-cols-2 my-4'>
            <input type='hidden' name='id' value={id} />
            <FormInput
              name='name'
              type='text'
              label='დასახელება'
              defaultValue={name}
            />
            <PriceInput defaultValue={price} />
            <CategoryDropdownList defaultValue={category} />
          </div>
          <ImageInputContainer name={name} currentImg={image} />
          <TextAreaInput
            name='description'
            labelText='პროდუქტის აღწერა'
            defaultValue={description}
          />
          <div className='mt-6'>
            <CheckboxInput
              name='featured'
              label='რჩეული'
              defaultChecked={featured}
            />
          </div>
          <SubmitButton text='update product' className='mt-8' />
        </FormContainer>
      </div>
    </section>
  )
}
export default EditProductPage
