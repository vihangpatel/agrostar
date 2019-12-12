import React from 'react'

const Form1 = () => <div className="layer sub-form">
    <div className="form-header">
        <span className="title">FORM 1</span>
        <div className="action-btn-group">
            <button type="button">Save</button>
            <button type="submit" className="transparent">Clear</button>
        </div>
    </div>

        <div className="d-flex form-row">
            <div className="input-field">
                <label>Full Name</label>
                <input type="text" required/>
            </div>
            <div className="input-field">
                <label>Select Age</label>
                <input type="number" className="small-input" min="0" max="150" required/>
                <div className="error">Age should be 0 to 150</div>
            </div>
        </div>

</div>

export default Form1