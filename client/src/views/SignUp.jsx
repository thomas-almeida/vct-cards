import { useEffect, useState } from "react"
import axios from 'axios'

export default function SignIn() {

    const [branding, setBranding] = useState([])
    const [selectedRegion, setRegion] = useState(null)
    const [selectedBrand, setBrand] = useState(null)
    const [inStep1, setStep1] = useState(true)
    const [inStep2, setStep2] = useState(false)
    const [inStep3, setStep3] = useState(false)

    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userTeamName, setUserTeamName] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const [alertInfo, setAlertInfo] = useState('')

    const userDataPayload = {
        name: userName,
        email: userEmail,
        teamName: userTeamName,
        password: userPassword
    }

    const regions = [
        {
            picture: '/logo-americas.png',
            name: 'AMERICAS'
        },
        {
            picture: '/logo-emea.png',
            name: 'EMEA'
        },
        {
            picture: '/logo-pacific.png',
            name: 'PACIFICO'
        },
        {
            picture: '/logo-china.png',
            name: 'CHINA'
        },
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3002/game/get-team-pictures")
                setBranding(response.data.pictures.slice(0, 4))
            } catch (error) {
                console.error("Erro ao buscar jogadores:", error);
            }
        }

        fetchData();
    }, [])

    function nextStep() {
        if (inStep1) {

            if (userName === '' || !userEmail.includes('@') === true || userTeamName === '' || userPassword === '') {
                setAlertInfo('Preencha Todos os Campos Corretamente')
                return
            }

            setStep2(true)
            setStep1(false)
        }

        if (inStep2) {
            setStep3(true)
            setStep2(false)
        }
    }

    const selectRegion = (region) => {
        setRegion(region)
        console.log(selectedRegion, region)
    }

    const selectBranding = (brand) => {
        setBrand(brand)
        console.log(selectedBrand, brand)
    }

    return (
        <>
            <div className="bg-black h-screen text-white text-center flex justify-center items-center">
                <div className="w-[50%] block">
                    <h1 className="italic font-bold text-5xl">VUT</h1>
                    <p className="my-6 font-mono">Valorant Ultimate Team</p>

                    <h2 className={inStep1 ? 'block text-xl my-2 font-semibold' : 'hidden'}>Dados da Conta</h2>
                    <h2 className={inStep2 ? 'block text-xl my-2 font-semibold' : 'hidden'}>Região de Primeiros Jogadores</h2>
                    <h2 className={inStep3 ? 'block text-xl my-2 font-semibold' : 'hidden'}>Branding do Time</h2>

                    <div className="flex justify-center items-center">

                        <div className={`p-2 m-4 ${inStep1 ? 'block' : 'hidden'}`}>
                            <form action="" className="flex justify-center items-center text-left">
                                <div className="m-4">
                                    <p className="p-0 m-0 text-left">Seu Nome de Usuário</p>
                                    <input
                                        className="uk-input w-80 my-2 mb-4 text-white"
                                        type="text"
                                        placeholder="Nome de Usuário"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                    <br />
                                    <p className="p-0 m-0 text-left">Nome do Time</p>
                                    <input
                                        className="uk-input w-80 my-2 mb-4 text-white"
                                        type="text"
                                        placeholder="Ex: GOLOUD"
                                        value={userTeamName}
                                        onChange={(e) => setUserTeamName(e.target.value)}
                                    />
                                    <br />
                                </div>
                                <div className="m-4">
                                    <p className="p-0 m-0 text-left">Seu Melhor Email</p>
                                    <input
                                        className="uk-input w-80 my-2 mb-4 text-white"
                                        type="email"
                                        placeholder="vutgame@gmail.com"
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                    />
                                    <br />
                                    <p className="p-0 m-0 text-left">Senha</p>
                                    <input
                                        className="uk-input w-80 my-2 mb-4 text-white"
                                        type="password"
                                        placeholder="Escolha uma Senha"
                                        value={userPassword}
                                        onChange={(e) => setUserPassword(e.target.value)}
                                    />
                                    <br />
                                </div>
                            </form>
                        </div>

                        <div className={`p-2 m-4 ${inStep2 ? 'block' : 'hidden'}`}>
                            <p className="text-sm text-left">Voce receberá um pacote inicial com jogadores da regiao que escolher (as regioes incluem GC)</p>

                            <ul className="grid grid-cols-2 py-2">

                                {
                                    regions.map((region) => (

                                        <li
                                            key={`${region.picture}${region.name}`}
                                            className={`border bg-[#ffffff0d] border-gray-400 cursor-pointer rounded-sm m-2 flex justify-center items-center flex-col p-5 transition hover:scale-110 hover:uk-box-shadow-hover-xlarge ${selectedRegion === region ? "border-green-500 border-4" : ""}`}
                                            onClick={() => selectRegion(region)}
                                        >

                                            <img
                                                className="w-[70px] p-2"
                                                src={region.picture}
                                                alt=""
                                                draggable="false"
                                            />

                                            <b className="text-[9pt]">{region.name}</b>

                                        </li>

                                    ))
                                }

                            </ul>

                        </div>

                        <div className={`p-2 m-4 ${inStep3 ? 'block' : 'hidden'}`}>

                            <p className="text-sm text-left">Selecione dentre as opções disponíveis de branding dos times abaixo (voce poderá comprar outros Brandings mais tarde)</p>
                            <ul className="grid grid-cols-2 py-2">

                                {
                                    branding.map((branding) => (

                                        <li
                                            key={`${branding.picture}${branding.name}`}
                                            className={`border bg-[#ffffff29] border-gray-400 cursor-pointer rounded-sm m-2 flex justify-center items-center flex-col p-5 transition hover:scale-110 hover:uk-box-shadow-hover-xlarge ${selectedBrand === branding ? "border-green-500 border-4" : ""}`}
                                            onClick={() => selectBranding(branding)}
                                        >

                                            <img
                                                className="w-[80px] p-2"
                                                src={branding.picture}
                                                alt=""
                                                draggable="false"
                                            />

                                        </li>

                                    ))
                                }

                            </ul>
                        </div>

                    </div>

                    <br />

                    <p className="font-mono mb-2 text-yellow-400 italic text-[9pt]">{alertInfo}</p>

                    <button
                        className="uk-button uk-button-default w-80"
                        onClick={() => nextStep()}
                    >
                        {inStep1 || inStep2 ? 'Continuar' : 'Finalizar'}
                    </button>

                    <div className="flex justify-center items-center mt-6">
                        <span className={`border-2 w-[35px] h-[29px] rounded-sm m-4 flex justify-center items-center ${!inStep1 ? `bg-green-500` : ''}`}>
                            <b>1</b>
                        </span>
                        <span className={`border-2 w-[35px] h-[29px] rounded-sm m-4 flex justify-center items-center ${inStep3 ? 'bg-green-500' : ''}`}>
                            <b>2</b>
                        </span>
                        <span className={`border-2 w-[35px] h-[29px] rounded-sm m-4 flex justify-center items-center `}>
                            <b>3</b>
                        </span>
                    </div>


                </div>

            </div>
        </>
    )
}