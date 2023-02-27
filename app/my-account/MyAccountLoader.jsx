import React from "react";

const MyAccountLoader = () => {
    return (
        <>
            <aside className="loader">
                <h3></h3>
                <ul>
                    <li>
                        <button></button>
                    </li>
                    <li>
                        <button></button>
                    </li>
                    <li>
                        <button></button>
                    </li>
                    <li>
                        <button></button>
                        <ul>
                            <li>
                                <button></button>
                            </li>
                            <li>
                                <button></button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </aside>
            <main className="loader">
                <div style={{textAlign:'center'}}>
                    <h1></h1>
                    <p style={{textAlign:'center'}}></p>
                    <p style={{textAlign:'center'}}></p>
                    <p style={{textAlign:'center'}}></p>
                </div>
            </main>
        </>
    );
};

export default MyAccountLoader;
