import Tilt from 'react-parallax-tilt'
import MyPacks from '../../components/MyPacks'

export default function Packs({
    visible,
    userData,
    packData
}) {

    return (
        <>
            <div className={visible ? `flex justify-center items-center` : `hidden`}>
                <div className="p-8 w-[90%] mt-4 flex justify-center items-center h-[85vh] flex-col">

                    <div className='mb-6 px-8 p-4 border-2 border-[#dddddd3a] rounded-md'>
                        <h2 className='uppercase font-bold italic mb-2 text-xl'>Meus Pacotes</h2>
                        <ul className='grid grid-cols-5'>
                            {
                                userData?.packs?.map((pack, index) => (
                                    <MyPacks
                                        packData={pack}
                                    />
                                ))
                            }
                        </ul>
                    </div>
                    <div className='border-2 border-[#dddddd3a] p-4 rounded-md'>
                        <h2 className='uppercase font-bold italic mb-2 text-xl'>Comprar de pacotes</h2>
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
            </div>
        </>
    )
}