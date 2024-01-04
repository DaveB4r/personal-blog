
import QuillForm from '@/components/QuillForm';
const Page = () => {
  return (
    <div className="w-2/6 justify-self-center post-card">
      <h3 className="mb-4 text-3xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl text-white">Creating Post</h3>
      <QuillForm />
    </div>
  )
}

export default Page