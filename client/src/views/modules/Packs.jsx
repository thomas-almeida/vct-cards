import Tilt from 'react-parallax-tilt'

export default function Packs({
    visible,
    userData,
    packData
}) {

    return (
        <>
            <div className={visible ? `flex justify-center items-center` : `hidden`}>
                <div className="p-8 w-[90%] flex justify-center items-center h-[85vh]">

                    <div className="grid grid-cols-4">
                        {
                            packData?.map((pack) => (
                                <div
                                    key={pack?.id}
                                    className="m-2 cursor-pointer"
                                >
                                    <Tilt>
                                        <div className='relative'>
                                            <img
                                                src={pack?.cover}
                                                className="transition hover:scale-[1.02]"
                                            />
                                        </div>
                                        <div className='absolute top-20 left-14'>
                                            <h2 className='font-semibold italic text-2xl w-[110px] uppercase'>
                                                {pack?.name}
                                            </h2>
                                            <div className='flex justify-start items-center mt-6'>
                                                <img src="/vc-icon.png" className='w-[25px] mr-1' alt="" />
                                                <p className='text-2xl font-bold italic'>{pack?.value}</p>
                                            </div>
                                            <p
                                                className='w-[150px] text-sm font-semibold mt-4'
                                            >
                                                {pack?.description}
                                            </p>
                                        </div>
                                    </Tilt>

                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}