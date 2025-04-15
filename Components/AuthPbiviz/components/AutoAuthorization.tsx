import React, { useEffect } from "react";

interface State {
    dataView?: any;
    settings: any;
}
export const AutoAuthorization: React.FC<State> = ({ dataView, settings }) => {
    const [token, setToken] = React.useState<string | null>(null);
    useEffect(() => {
        // window.addEventListener("message", function (event) {
        //     console.log("------");
        //     console.log(event);
        //     console.log(event.data);
        //     console.log("------");
        //     // console.log("Mensaje recibido en el iframe");
        //     // sessionStorage.setItem("ngStorage-token-frame", event.data);
        //     // setToken(event.data);
        //     // console.log("Token guardado en sessionStorage:", event.data);
        // });
        window.parent.postMessage("Hola desde el iframe", "*"); // "*" permite que cualquier origen reciba el mensaje
    }, []);

    return <div>hola</div>;
};
