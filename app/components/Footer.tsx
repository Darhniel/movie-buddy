
export default function Footer() {
    return (
        <>
            <section className="bg-bookmark-purple text-white py-20">
                <div className="container">
                    <div className="sm:w-3/4 lg:w-2/4 mx-auto">
                        <p className="font-light uppercase text-center mb-8">35000+ already joined</p>
                        <h2 className="text-3xl text-center">Stay up-to-date with what we're doing</h2>
                        <div className="flex flex-col sm:flex-row gap-6 mt-8">
                            <input type="text" placeholder="Enter your email address" className="focus:outline-none flex-1 px-2 py-3 rounded-md text-black" />
                            <button type='button' className='btn bg-bookmark-red text-white hover:bg-bookmark-white hover:text-black rounded-md px-7 py-3 uppercase'>Contact Us</button>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-bookmark-blue py-8">
                <div className="container flex flex-col md:flex-row items-center">
                    <div className="flex flex-1 flex-wrap items-center justify-center md:justify-start gap-12">
                        <img src="/vercel.svg" alt="" />
                        <ul className="flex text-white uppercase gap-12 text-xs">
                            <li className='cursor-pointer'>Features</li>
                            <li className='cursor-pointer'>Priicng</li>
                            <li className='cursor-pointer'>Contact</li>
                        </ul>
                    </div>
                    <div className="flex gap-10 mt-12 md:mt-0">
                        <ul>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}