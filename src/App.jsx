import {useEffect,useState} from "react";
import "./App.css";


function App(){

const [server,setServer]=useState(null);


async function check(){

    try {

        const res = await fetch(
            "https://apiminecraftserver.onrender.com/status"
        );

        const data = await res.json();

        setServer(data);

    } catch(error){

        setServer({
            online:false
        });

    }

}



useEffect(()=>{

    check();

    const timer=setInterval(
        check,
        10000
    );

    return()=>clearInterval(timer);


},[]);



return (

<div className="page">

    <div className="card">

        <h1>
            ⛏️ Minecraft Server
        </h1>


        {!server ? (

            <h2 className="loading">
                🔄 Controllo server...
            </h2>

        ) : server.online ? (

            <>

                <div className="status online">
                    🟢 ONLINE
                </div>


                <div className="info">

                    <div>
                        👥
                        <span>
                            Giocatori
                        </span>

                        <strong>
                            {server.players.online}/{server.players.max}
                        </strong>
                    </div>


                    <div>
                        🧱
                        <span>
                            Versione
                        </span>

                        <strong>
                            {server.version}
                        </strong>
                    </div>

                </div>


                <div className="motd">
                    {server.motd}
                </div>

            </>

        ) : (

            <div className="status offline">
                🔴 OFFLINE
            </div>

        )}


    </div>

</div>

)

}


export default App;