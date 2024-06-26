import { actionAlert } from "../../../zustand/alertZustand";
import { storeApp } from "../../../zustand/storeZustand";

function Alert() {

    const initAlert = storeApp(state => state.alert)
    if (!initAlert.message) return null;

    return (
        <div id='alert' className=" z-1">
            <div >
                <div className={`alert alert-dismissible ${initAlert.type}`}>
                    {initAlert.message}
                    <button type="button" className="btn-close" onClick={()=> actionAlert.clear()}    ></button>
                </div>
            </div>
        </div>
    );
}

export { Alert };