import {useEffect,useState} from "react";
import "./App.css";


function App(){

const [server,setServer]=useState(null);


async function check(){

    const res = await fetch(
        "https://apiminecraftserver.onrender.com/status"
    );

    const data = await res.json();

    setServer(data);

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


{
!server ?

<h2>
🔄 Controllo...
</h2>


:

server.online ?


<>

<h2 className="online">
🟢 ONLINE
</h2>


<h3>
👥 {server.players.online}/{server.players.max}
</h3>


<p>
Versione:
{server.version}
</p>


<p>
{server.motd}
</p>

</>


:

<h2 className="offline">
🔴 OFFLINE
</h2>

}


</div>

</div>


)


}


export default App;