export default function SignIn() {
    return (
        <>
            <div className="bg-black h-screen text-white text-center flex justify-center items-center">
                <div className="w-[70%] block">
                    <h1 className="italic font-bold text-5xl">VUT</h1>
                    <p className="my-6 font-mono">Valorant Ultimate Team</p>

                    <div className="flex justify-center items-center">

                        <div className="p-2 m-2 w-[33%]">
                            <form action="" className="block text-left">
                                <i className="text-left">Seu Nome de Usuário</i>
                                <br />
                                <input className="uk-input w-80 my-2 mb-4 text-white" type="text" placeholder="Nome de Usuário" />
                                <br />
                                <i className="text-left">Nome do Time</i>
                                <br />
                                <input className="uk-input w-80 my-2 mb-4 text-white" type="text" placeholder="Ex: GOLOUD" />
                                <br />
                                <i className="text-left">Seu Melhor Email</i>
                                <br />
                                <input className="uk-input w-80 my-2 mb-4 text-white" type="email" placeholder="vutgame@gmail.com" />
                                <br />
                                <i className="text-left">Senha</i>
                                <br />
                                <input className="uk-input w-80 my-2 mb-4 text-white" type="password" placeholder="Escolha uma Senha" />
                                <br />
                            </form>
                        </div>

                        <div className="p-2 m-2 w-[33%]">

                            <h2 className="py-5 text-left">Região de primeiros jogadores</h2>
                            <p className="text-sm text-left">Voce receberá um pacote inicial com jogadores da regiao que escolher (as regioes incluem GC)</p>
                            <ul className="grid grid-cols-2 py-2">
                                <li className="border border-gray-400 cursor-pointer rounded-md m-2 flex justify-center items-center flex-col p-5">
                                    <img className="w-25 p-2" src="/logo-americas.png" alt="" />
                                    <p>AMERICAS</p>
                                </li>
                                <li className="border border-gray-400 cursor-pointer rounded-md m-2 flex justify-center items-center flex-col p-5">
                                    <img className="w-25 p-2" src="/logo-emea.png" alt="" />
                                    <p>EMEA</p>
                                </li>
                                <li className="border border-gray-400 cursor-pointer rounded-md m-2 flex justify-center items-center flex-col p-5">
                                    <img className="w-25 p-2" src="/logo-pacific.png" alt="" />
                                    <p>PACIFICO</p>
                                </li>
                                <li className="border border-gray-400 cursor-pointer rounded-md m-2 flex justify-center items-center flex-col p-5">
                                    <img className="w-25 p-2" src="/logo-china.png" alt="" />
                                    <p>CHINA</p>
                                </li>
                            </ul>
                        </div>

                        <div className="p-2 m-2 w-[33%]">

                            <h2 className="py-5 text-left">Selecionar Branding</h2>
                            <p className="text-sm text-left">Selecione dentre as opções disponíveis de branding dos times abaixo</p>
                            <ul className="grid grid-cols-2 py-2">
                                <li className="border border-gray-400 cursor-pointer rounded-md m-2 flex justify-center items-center flex-col p-5">
                                    <img className="w-25 p-2" src="/logo-americas.png" alt="" />
                                    <p>AMERICAS</p>
                                </li>
                                <li className="border border-gray-400 cursor-pointer rounded-md m-2 flex justify-center items-center flex-col p-5">
                                    <img className="w-25 p-2" src="/logo-emea.png" alt="" />
                                    <p>EMEA</p>
                                </li>
                                <li className="border border-gray-400 cursor-pointer rounded-md m-2 flex justify-center items-center flex-col p-5">
                                    <img className="w-25 p-2" src="/logo-pacific.png" alt="" />
                                    <p>PACIFICO</p>
                                </li>
                                <li className="border border-gray-400 cursor-pointer rounded-md m-2 flex justify-center items-center flex-col p-5">
                                    <img className="w-25 p-2" src="/logo-china.png" alt="" />
                                    <p>CHINA</p>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <br />
                    <button className="uk-button uk-button-default w-80">Registrar Novo Time</button>

                </div>

            </div>
        </>
    )
}