import Tilt from 'react-parallax-tilt'

export default function Card({ cardData, borderColor }) {
    return (
        <>
            <div className='hover:z-[99999]'>
                <Tilt>
                    <div
                        key={cardData?.id}
                        style={{
                            borderColor: borderColor
                        }}
                        className={`border-4 mx-2 h-[400px] w-[260px] md:h-[360px] md:w-[250px] rounded-s-xl rounded-e-xl rounded-tr-none rounded-es-none cursor-pointer relative transition hover:scale-[1.04] hover:top-[-80px] hover:left-[-90px] md:hover:top-[-15px] md:hover:left-[-40px] flex justify-center items-center shadow-lg bg-[#101010] card card__glare my-4`}
                    >
                        <div
                            style={{
                                borderColor: borderColor
                            }}
                            className={`absolute top-6 left-6 border-2 p-2 px-3 md:p-1 md:px-2 rounded-sm rounded-s-xl rounded-e-xl rounded-tr-none rounded-es-none transition hover:scale-[1.1]`}>
                            <b className='text-xl md:text-md'>{cardData?.overall}</b>
                        </div>
                        <div className='absolute top-4 right-4 rounded-sm transition hover:scale-[1.1]'>
                            <img
                                src={cardData.teamPicture}
                                className='w-[40px] shadow-lg my-2'
                                alt="ranking do jogador"
                            />
                            <img
                                src={cardData.agents}
                                className='w-[40px] shadow-lg my-2'
                                alt="ranking do jogador"
                            />
                        </div>
                        <div>
                            <div className='flex justify-center items-center'>
                                <img
                                    src={cardData?.playerPicture}
                                    alt=""
                                    className='w-[160px] mb-4 mt-14 transition hover:scale-[1.2] rounded-xl md:w-[150px]'
                                />
                            </div>
                            <h2 className='text-center font-semibold flex justify-center items-center'>
                                <img src={cardData?.country?.flag} className='w-[22px] mr-1' alt="" />
                                <div className='flex justify-start'>
                                    <p className='mr-2'>{cardData?.name}</p>
                                    <div className='flex items-center'>
                                        <p className='text-[#f3e901]'>{cardData?.value}</p>
                                        <img src="/vc-icon.png" className='w-[10px] ml-1' alt="" />
                                    </div>
                                </div>
                            </h2>
                            <div className=''>
                                <ul className='list-none grid grid-cols-2 justify-center items-center text-center relative top-[15px]'>
                                    <li className='mx-2 my-1 px-4 w-[130px] flex items-center' id="rw-tooltip">
                                        <p className='mr-2'>RW</p>
                                        <b>{cardData?.adr}%</b>
                                    </li>
                                    <li className='mx-2 my-1 px-4 w-[130px] flex items-center'>
                                        <p className='mr-2'>KAST</p>
                                        <b>{cardData?.kast}</b>
                                    </li>
                                    <li className='mx-2 my-1 px-4 w-[130px] flex items-center'>
                                        <p className='mr-2'>ACS</p>
                                        <b>{cardData?.acs}</b>
                                    </li>
                                    <li className='mx-2 my-1 px-4 w-[130px] flex items-center'>
                                        <p className='mr-2'>DDΔ</p>
                                        <b>{cardData?.kd}</b>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Tilt>
            </div>
        </>
    )
}