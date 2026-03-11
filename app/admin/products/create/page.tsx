import { SubmitButton } from "@/components/form/Buttons"
import CategoryDropdownList from "@/components/form/CategoryDropdownList"
import CheckboxInput from "@/components/form/CheckboxInput"
import FormContainer from "@/components/form/FormContainer"
import FormInput from "@/components/form/FormInput"
import ImageInput from "@/components/form/ImageInput"
import PriceInput from "@/components/form/PriceInput"
import TextAreaInput from "@/components/form/TextAreaInput"
import { Button } from "@/components/ui/button"
import { createProductAction } from "@/utils/actions"
import { faker } from "@faker-js/faker"

function CreateProductPage() {
  const name = faker.commerce.productName()
  const description = faker.lorem.paragraph({ min: 10, max: 12 })

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>
        პროდუქტის დამატება
      </h1>
      <div className='border p-8 rounded-md'>
        <FormContainer action={createProductAction}>
          <div className='grid gap-4 md:grid-cols-2 my-4'>
            <FormInput
              name='name'
              type='text'
              label='დასახელება'
              defaultValue={name}
            />
            <PriceInput />
            <ImageInput />
            <CategoryDropdownList />
          </div>
          <TextAreaInput
            name='description'
            labelText='პროდუქტის აღწერა'
            defaultValue={description}
          />
          <div className='mt-6'>
            <CheckboxInput name='featured' label='რჩეული' />
          </div>
          <SubmitButton text='create product' className='mt-8' />
        </FormContainer>
      </div>
    </section>
  )
}
export default CreateProductPage
