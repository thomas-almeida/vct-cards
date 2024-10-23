import Tilt from 'react-parallax-tilt'

export default function MyPacks({
    packData
}) {
    return (
        <>
            <div className={`${ !packData?.isOpened ? 'flex' : 'hidden' }  justify-start items-center border-2 border-[#dddddd3a] bg-[#1a1a1a] shadow-lg w-[230px] rounded-md p-2 cursor-pointer transition hover:scale-[1.03] m-2`}>
                <Tilt>
                    <img
                        src={packData?.cover}
                        className="w-[40px] mr-2 transiton hover:scale-[1.2]"
                    />
                </Tilt>
                <div>
                    <p className="font-semibold text-lg italic uppercase ml-1">
                        {packData?.name}
                    </p>
                    <p className='border border-[#dddddd4d] bg-[#dddddd43] w-[150px] mx-1 mt-1 rounded-md text-center'>Abrir Pacote</p>
                </div>
            </div>
        </>
    )
}