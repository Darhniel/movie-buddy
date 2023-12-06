
export default function Download() {
  return (
    <section className="py-20 mt-20">
        <div className="sm:w-3/4 lg:w-5/12 mx-auto px-2">
            <h2 className="text-3xl text-center text-bookmark-blue">Download the extension</h2>
            <p className="text-center text-bookmark-grey mt-4">
                We've got more browsers in the pipeline. Please do let us know if you've got a favorite you'd like us to prioritize.
            </p>
        </div>

        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-screen-lg mt-16">
            <div className="flex flex-col rounded-md shadow-md lg:mb-16">
                <div className="p-6 flex flex-col items-center">
                    <img src="/next.svg" alt="" />
                    <h3 className="mt-5 mb-2 text-bookmark-blue text-lg">Add to Chrome</h3>
                    <p className="mb-2 text-bookmark-grey font-light">minimum version 62</p>
                </div>
                <hr className="border-b border-bookmark-white"/>
                <div className="flex p-6">
                    <button type="button" className="flex-1 btn btn-purple hover:bg-bookmark-white hover:text-black">Add & install extension</button>
                </div>
            </div>

            <div className="flex flex-col rounded-md shadow-md lg:my-8">
                <div className="p-6 flex flex-col items-center">
                    <img src="/next.svg" alt="" />
                    <h3 className="mt-5 mb-2 text-bookmark-blue text-lg">Add to Firefox</h3>
                    <p className="mb-2 text-bookmark-grey font-light">minimum version 62</p>
                </div>
                <hr className="border-b border-bookmark-white"/>
                <div className="flex p-6">
                    <button type="button" className="flex-1 btn btn-purple hover:bg-bookmark-white hover:text-black">Add & install extension</button>
                </div>
            </div>

            <div className="flex flex-col rounded-md shadow-md lg:mt-16">
                <div className="p-6 flex flex-col items-center">
                    <img src="/next.svg" alt="" />
                    <h3 className="mt-5 mb-2 text-bookmark-blue text-lg">Add to opera</h3>
                    <p className="mb-2 text-bookmark-grey font-light">minimum version 62</p>
                </div>
                <hr className="border-b border-bookmark-white"/>
                <div className="flex p-6">
                    <button type="button" className="flex-1 btn btn-purple hover:bg-bookmark-white hover:text-black">Add & install extension</button>
                </div>
            </div>
        </div>
    </section>    
  )
}
