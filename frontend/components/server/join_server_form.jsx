import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NewServerFormContainer from "./new_server_form_container";
import { openModal, closeModal } from "../../actions/modal_actions";
import { joinServer } from "../../actions/member_actions";

export default function JoinServer(props) {
    const [id, setId] = useState("");
    const dispatch = useDispatch();

    function backToNewServerForm(e) {
        e.preventDefault();
        dispatch(openModal(() => <NewServerFormContainer />));
    }

    function handleInput(e) {
        setId(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(id);
        dispatch(joinServer(id))
            .then(response => console.log(response));
        // dispatch(closeModal());
    }

    // handleSubmit(e) {
    //     e.preventDefault();
    //     this.props.createServer(this.state)
    //         .then((response) => 
    //             this.props.createChannel({
    //                 title: "General",
    //                 server_id: response.server.id
    //             }))
    //         .then(response => this.props.history.push(`/servers/${response.channel.server_id}`))
    //         .then(() => this.props.closeModal())
    // }


    let joinServerLabel = "serverNameLabel";
    let joinServerErrorMessage = "";
    const errorsArray = useSelector(state => state.errors.servers.responseJSON);
    if (errorsArray) {
        joinServerLabel += " serverWithErrors";
        joinServerErrorMessage = " - " + errorsArray;
    }

    return (
        <div className="modalDefault">
        <form
            className="joinServerForm"
            onSubmit={handleSubmit}
            >
            <div>
                <h1 className="joinServerMessage">JOIN A SERVER</h1>
                <h3 className="joinServerSubMessage">Enter a Server ID below to join an existing server.</h3>
            </div>
        
            <label className={joinServerLabel}>
                {`SERVER ID${joinServerErrorMessage}`}
            </label>
            <input
                className="joinServerInputField"
                type="text"
                onChange={handleInput}
                placeholder="Enter an ID" />
            <div className="joinServerFormButtonsBar">
                <button
                    type="button"
                    className="goBackButton"
                    onClick={backToNewServerForm}
                    >
                    <img
                        className="goBackButtonImage"
                        src="https://discordapp.com/assets/eb57a76361c43375bf23207ad2acc631.svg"
                        alt="Go Back Button Image" />
                    <p className="goBackButtonText">BACK</p>
                </button>

                <button
                    className="joinServerSubmitButton button">
                    Join
                </button>
            </div>
        </form>
    </div>
    );
};