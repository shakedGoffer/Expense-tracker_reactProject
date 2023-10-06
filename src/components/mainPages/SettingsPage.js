import React, { useState } from 'react'
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CurrencyPickerPage from './CurrencyPickerPage';

function SettingsPage({ setPage, moneySymbol, setMoneySymbol }) {
    const [toastSwitch, setToastSwitch] = useState(() => { const savedSwitch = JSON.parse(localStorage.getItem('ToastMessagesSwitch')); return savedSwitch !== null ? savedSwitch : true; }); // ToastMessagesSwitch from local storage or "true" (show toast) as a default

    const handleToastSwitchChange = (e) => {
        const switchValue = e.target.checked;
        setToastSwitch(switchValue);
        localStorage.setItem('ToastMessagesSwitch', JSON.stringify(switchValue));
    };

    return (
        <div className='settingsPage container py-3'>

            <div>
                <div className="form-check form-switch d-flex bg-white rounded py-2 px-3 justify-content-between align-items-center">
                    <div className="switch-label col-10">
                        <label className='col-12 fs-4' htmlFor="ToastMessages_CheckSwitch">Toast Messages</label>
                        <small className='text-secondary'>Display Toast Messages: deleting, editing, and adding income & expenses.</small>
                    </div>
                    <input className="form-check-input p-0 m-2 fs-4 col-auto" type="checkbox" role="switch" id="ToastMessages_CheckSwitch" checked={toastSwitch} onChange={(e) => { handleToastSwitchChange(e) }} ></input>
                </div>

                <a href="https://www.privacypolicies.com/live/6cc6e7cb-c3ac-484c-9b61-83a9684fd61a">
                    <div className="bg-white rounded mt-2 py-2 px-3 align-items-center">
                        <div className='col-12 fs-4'>Privacy Policies</div>
                        <small className='text-secondary'>View CashVue privacy policies.</small>
                    </div>
                </a>

            </div>


            <div>
                <CurrencyPickerPage moneySymbol={moneySymbol} setMoneySymbol={setMoneySymbol} />
            </div>

        </div>
    )
}

export default SettingsPage