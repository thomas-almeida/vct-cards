import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export default function SignIn() {

    const redirect = useNavigate()

    const [branding, setBranding] = useState([])
    const [regionSelected, setRegionToSelect] = useState(null)
    const [selectedBrand, setBrand] = useState(null)
    const [inStep1, setStep1] = useState(true)
    const [inStep2, setStep2] = useState(false)
    const [inStep3, setStep3] = useState(false)

    const [user, setUser] = useState('')

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
            name: 'AMERICAS',
            picture: '/logo-americas.png',
        },
        {
            name: 'EMEA',
            picture: '/logo-emea.png',
        },
        {
            name: 'PACIFICO',
            picture: '/logo-pacific.png',
        },
        {
            name: 'CHINA',
            picture: '/logo-china.png',
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

    async function nextStep() {
        
        if (inStep1) {

            if (userName === '' || !userEmail.includes('@') === true || userTeamName === '' || userPassword === '') {
                setAlertInfo('Preencha Todos os Campos Corretamente')
                return
            }

            try {
                const response = await axios.post("http://localhost:3002/users/sign-up", userDataPayload)

                if (response.status === '409') {
                    setAlertInfo(response)
                    return
                }

                setUser(response.data)
                console.log(user)

                setStep2(true)
                setStep1(false)

            } catch (error) {
                console.error(error)
            }

        }

        if (inStep2) {
            console.log(regionSelected)
            if (regionSelected === null) {
                setAlertInfo('Selecione Uma Região Inicial')
                return
            }

            try {
                const response = await axios.get(`http://localhost:3002/game/sort-players-by-region/${user?.id}/${regionSelected?.name.toLowerCase()}`)

                if (response.status === '409') {
                    setAlertInfo(response.data?.message)
                    return
                }

                setStep3(true)
                setStep2(false)

            } catch (error) {
                console.error(error)
            }
        }

        if (inStep3) {
            
            const teamPicurePayload = {
                userId: user?.id,
                pictureLink: selectedBrand?.picture
            }

            try {
                const response = await axios.post("http://localhost:3002/game/choose-team-picture", teamPicurePayload)

                if (response.status === '409') {
                    setAlertInfo(response.data?.message)
                    return
                }

                setAlertInfo('usuario criado com sucesso')
                redirect(`/home?id=${user?.id}`)

            } catch (error) {
                console.error(error)
            }

        }
    }

    const selectBranding = (brand) => {
        setBrand(brand)
        console.log(selectedBrand, brand)
    }

    async function chooseRegion(region) {
        setRegionToSelect(region)
        console.log(user.id, region.name.toLowerCase())
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
                                            className={`border bg-[#ffffff0d] border-gray-400 cursor-pointer rounded-sm m-2 flex justify-center items-center flex-col p-5 transition hover:scale-110 hover:uk-box-shadow-hover-xlarge ${regionSelected === region ? "border-green-500 border-4" : ""}`}
                                            onClick={() => chooseRegion(region)}
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

                    <p className={`font-mono mb-2 text-[9pt] text-yellow-400 ${inStep2 && selectedBrand !== null ? 'text-green-400' : ''}`}>{alertInfo}</p>

                    <button
                        className="uk-button uk-button-default w-80"
                        onClick={() => nextStep()}
                        disabled={regionSelected === null && inStep2}
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